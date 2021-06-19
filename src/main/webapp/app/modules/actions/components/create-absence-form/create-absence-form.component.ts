import { Component } from '@angular/core';
import { BaseFormWidget } from 'app/models/base-form-widget.component';
import { FormErrorService } from 'app/shared/util/form-errors.service';
import { AbsencesServices } from 'app/core/services/absences.services';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Result, loyappsEmployeeAbsence } from 'app/models/common-api-url.model';
import { MatSelectChange } from '@angular/material/select';
import { AbsenceModel, AbsenceReason } from 'app/models/absence.model';
import { DateValidators } from 'app/shared/validators/date-validators';
import { SCREENS, DAY_TIMES, ABSENCE_REASONS, EMPTY_STRING } from 'app/app.constants';

@Component({
  selector: 'ly-create-absence-form',
  templateUrl: './create-absence-form.component.html',
  styleUrls: ['./create-absence-form.component.scss'],
})
export class CreateAbsenceFormComponent extends BaseFormWidget {
  absenceReasons: AbsenceReason[] = [];
  requiredDescription = false;
  readonly DAY_TIMES_ID_LOV = [
    { value: 1, translationKey: 'widget.createAbsence.fields.dayTimesIdLOV.morning' },
    { value: 2, translationKey: 'widget.createAbsence.fields.dayTimesIdLOV.midday' },
    { value: 3, translationKey: 'widget.createAbsence.fields.dayTimesIdLOV.evening' },
  ];

  constructor(formBuilder: FormBuilder, private absencesServices: AbsencesServices, errors: FormErrorService) {
    super(formBuilder, errors);
  }

  ngOnInit() {
    // Temporarily fixed the bug of Nano donation form widget, initialize the form twice
    this.fetchData();
  }

  onDataLoaded(): void {
    this.initFormControl();
    this.absencesServices.getAbsenceReason().subscribe(absenceReasons => {
      if (absenceReasons && absenceReasons.result && absenceReasons.result.length) {
        this.absenceReasons = JSON.parse(absenceReasons.result).map((absenceReason: any) => {
          return new AbsenceReason(absenceReason);
        });
        this.setDefaultAbsenceReason();
      }
      this.dataLoaded = true;
      this.checkData();
    });
  }

  getValidators() {
    return [DateValidators.dateLessThan('startDate', 'dayTimesIdStart', 'endDate', 'dayTimesIdEnd', { startDateGreaterThanEndDate: true })];
  }

  setDefaultAbsenceReason() {
    this.absenceReasons.some(absenceReason => {
      if (absenceReason.AbsenceReasonId === ABSENCE_REASONS.HOLIDAY) {
        this.form.patchValue({
          absenceReasonId: absenceReason.AbsenceReasonId,
          remark: absenceReason.Remark,
        });
        this.setRequiredDescription(absenceReason.AbsenceReasonId);
        return true;
      }
      return false;
    });
  }

  isRequiredDescription(absenceReasonId: number) {
    return !this.absenceReasons.find(data => data.AbsenceReasonId === absenceReasonId)?.AllowNullDescription;
  }

  absenceReasonChangeHandler(event: MatSelectChange) {
    this.absenceReasons.some(absenceReason => {
      if (absenceReason.AbsenceReasonId === event.value) {
        this.form.patchValue({
          remark: absenceReason.Remark,
        });
        this.setRequiredDescription(absenceReason.AbsenceReasonId);
        return true;
      }
      return false;
    });
  }

  setRequiredDescription(absenceReasonId: number) {
    this.requiredDescription = this.isRequiredDescription(absenceReasonId);
    this.form.controls['description'].setValidators(this.requiredDescription ? [Validators.required] : []);
    this.form.controls['description'].updateValueAndValidity();
  }

  startDateChangeHandler(event: any) {
    if (event.value && !this.form.controls['endDate']?.value) {
      this.form.controls['endDate']?.markAsTouched();
      this.form.patchValue({
        endDate: event.value,
      });
    }
  }

  getFormControl() {
    return {
      absenceReasonId: [null, Validators.required],
      remark: [EMPTY_STRING],
      startDate: [EMPTY_STRING, Validators.required],
      dayTimesIdStart: [DAY_TIMES.MORNING, Validators.required],
      endDate: [EMPTY_STRING, Validators.required],
      dayTimesIdEnd: [DAY_TIMES.EVENING, Validators.required],
      description: [EMPTY_STRING],
    };
  }

  getDefaultFormData() {
    return {
      absenceReasonId: null,
      dayTimesIdStart: DAY_TIMES.MORNING,
      dayTimesIdEnd: DAY_TIMES.EVENING,
      startDate: EMPTY_STRING,
      endDate: EMPTY_STRING,
      description: EMPTY_STRING,
      remark: EMPTY_STRING,
    };
  }

  resetForm() {
    super.resetForm();
    this.setDefaultAbsenceReason();
  }

  buildSubmitData() {
    const absenceModel = AbsenceModel.toApiInstance({
      AbsenceReasonId: this.form.controls['absenceReasonId'].value,
      StartDate: this.form.controls['startDate'].value,
      DayTimesIdStart: this.form.controls['dayTimesIdStart'].value,
      EndDate: this.form.controls['endDate'].value,
      DayTimesIdEnd: this.form.controls['dayTimesIdEnd'].value,
      Description: this.form.controls['description'].value,
    });
    return absenceModel;
  }

  getDataObservable() {
    return (null as unknown) as Observable<Result>;
  }

  getSubmitObservable() {
    return this.absencesServices.createAbsence(this.buildSubmitData() as AbsenceModel);
  }

  getSuccessMessage() {
    return EMPTY_STRING;
  }

  getSizeOfWidget() {
    return SCREENS.MEDIUM;
  }

  getViewMoreMessage() {
    return 'widget.createAbsence.more';
  }

  getViewMoreLink() {
    return loyappsEmployeeAbsence;
  }
}
