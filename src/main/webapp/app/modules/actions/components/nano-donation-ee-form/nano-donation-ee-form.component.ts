import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { FormErrorService } from 'app/shared/util/form-errors.service';
import { NanoDonationService } from 'app/core/services/nano-donation.services';
import { BaseFormWidget } from 'app/models/base-form-widget.component';
import { NanoDonationSetupEE, NanoDonationFoundation } from 'app/models/nano-donation-ee-form-model';
import { ROUND_DOWN_MY_SALARY, ROUNDING_TYPE, SHARE_EE_INFORMATION, EMPTY_STRING } from 'app/app.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ly-nano-donation-ee-form',
  templateUrl: './nano-donation-ee-form.component.html',
  styleUrls: ['./nano-donation-ee-form.component.scss'],
})
export class NanoDonationEeFormComponent extends BaseFormWidget {
  nanoDonationSetupEE: NanoDonationSetupEE = new NanoDonationSetupEE();
  nanoDonationFoundationLOV: NanoDonationFoundation[] = [];
  title = EMPTY_STRING;
  isFirstLoad = true;

  constructor(
    formBuilder: FormBuilder,
    private nanoDonationServices: NanoDonationService,
    private translate: TranslateService,
    errors: FormErrorService
  ) {
    super(formBuilder, errors);
  }

  getFormControl() {
    return {
      roundDownMySalary: [ROUND_DOWN_MY_SALARY.YES, Validators.required],
      roundingType: [ROUNDING_TYPE.ROUND_LOWER_FRANC, Validators.required],
      donationFoundationId: [EMPTY_STRING, Validators.required],
      url: [],
      description: [],
      shareEeInformation: [SHARE_EE_INFORMATION.NO, Validators.required],
    };
  }

  getDefaultFormData() {
    return {
      roundDownMySalary: ROUND_DOWN_MY_SALARY.YES,
      roundingType: ROUNDING_TYPE.ROUND_LOWER_FRANC,
      shareEeInformation: SHARE_EE_INFORMATION.NO,
      donationFoundationId: EMPTY_STRING,
      url: EMPTY_STRING,
      description: EMPTY_STRING,
    };
  }

  handleChangeRoundDownSalary(event: MatRadioChange) {
    this.directiveForm.resetForm(this.changeFormData(event.value));
    this.isFirstLoad = false;
    this.isDoneProcess = false;
    this.resultMessage = EMPTY_STRING;
  }

  handleChangeNanoDonationFoundationLOV(event: MatSelectChange) {
    const nanoDonationFoundation =
      this.nanoDonationFoundationLOV.find(donation => donation.NanoDonationFoundationId === event.value) || new NanoDonationFoundation();
    this.form.patchValue({
      url: nanoDonationFoundation.Url,
      description: nanoDonationFoundation.DescriptionI18n,
    });
    this.isFirstLoad = false;
    this.isDoneProcess = false;
    this.resultMessage = EMPTY_STRING;
  }

  getDataObservable() {
    return this.nanoDonationServices.getNanoDonationSetupEE();
  }

  initFormData() {
    this.form.reset(this.buildNanoDonationData());
  }

  resetForm() {
    this.directiveForm.resetForm(this.buildNanoDonationData());
  }

  buildNanoDonationData() {
    if (this.hasData) {
      this.nanoDonationSetupEE = Object.assign(new NanoDonationSetupEE(), this.data);
      const nanoDonationFoundation =
        this.nanoDonationFoundationLOV.find(
          donation => donation.NanoDonationFoundationId === this.nanoDonationSetupEE.NanoDonationFoundationId
        ) || new NanoDonationFoundation();
      return {
        roundDownMySalary:
          this.nanoDonationSetupEE.NanoDonationTypeId === ROUNDING_TYPE.NOT_ROUND ? ROUND_DOWN_MY_SALARY.NO : ROUND_DOWN_MY_SALARY.YES,
        roundingType: this.nanoDonationSetupEE.NanoDonationTypeId,
        shareEeInformation: this.nanoDonationSetupEE.ShareEeInformation,
        donationFoundationId: nanoDonationFoundation.NanoDonationFoundationId,
        url: nanoDonationFoundation.Url,
        description: nanoDonationFoundation.DescriptionI18n,
      };
    }

    return this.getDefaultFormData();
  }

  onDataLoaded(): void {
    this.checkData();
    this.nanoDonationServices.getNanoDonationFoundations().subscribe(data => {
      this.buildNanoDonationFoundationLOV(data);
      this.initFormData();
      this.dataLoaded = true;
    });
  }

  changeFormData(value: string) {
    return {
      ...this.getDefaultFormData(),
      roundDownMySalary: value,
      roundingType: value === ROUND_DOWN_MY_SALARY.YES ? ROUNDING_TYPE.ROUND_LOWER_FRANC : ROUNDING_TYPE.NOT_ROUND,
      shareEeInformation: value === ROUND_DOWN_MY_SALARY.YES ? SHARE_EE_INFORMATION.NO : EMPTY_STRING,
    };
  }

  buildNanoDonationFoundationLOV(data: any) {
    if (data) {
      try {
        this.nanoDonationFoundationLOV = JSON.parse(data.result).map((foundation: any) => {
          return Object.assign(new NanoDonationFoundation(), foundation);
        });
      } catch (e) {
        console.error("Can't parse data:", e);
      }
    }
  }

  getSizeOfWidget() {
    return 'medium';
  }

  getViewMoreLink() {
    return EMPTY_STRING;
  }

  buildSubmitData() {
    const request = { name: 'updateDonation', parameters: [] as any };
    request.parameters.push({ nanoDonationTypeId: this.form.controls['roundingType'].value });
    request.parameters.push({ nanoDonationFoundationId: this.form.controls['donationFoundationId'].value });
    request.parameters.push({ shareEeInformation: this.form.controls['shareEeInformation'].value });

    return request;
  }

  onCancel() {
    super.onCancel();
    this.isFirstLoad = true;
  }

  isFormValid() {
    return this.f['roundDownMySalary'].value === ROUND_DOWN_MY_SALARY.NO || this.form.valid;
  }

  getSubmitObservable() {
    return this.nanoDonationServices.updateNanoDonationSetupEE(this.buildSubmitData());
  }

  getSuccessMessage() {
    const nanoDonationFoundation = this.nanoDonationFoundationLOV.find(
      donation => donation.NanoDonationFoundationId === this.f.donationFoundationId.value
    );
    return nanoDonationFoundation
      ? this.translate.instant('widget.nanoDonation.successMessage', { value: nanoDonationFoundation.FoundationName })
      : EMPTY_STRING;
  }

  handleSuccessStatus() {
    this.isSavingProcess = false;
    this.isFirstLoad = true;
    this.isDoneProcess = true;
    this.fetchData();
    this.resultMessage = this.getSuccessMessage();
  }
}
