import { Component, ViewChild } from '@angular/core';
import { BaseWidget } from './base-widget.component';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { Result } from './common-api-url.model';
import { FormErrorService } from 'app/shared/util/form-errors.service';
import { EMPTY_STRING } from 'app/app.constants';

@Component({
  selector: 'ly-base-form-widget',
  template: '',
})
export abstract class BaseFormWidget extends BaseWidget {
  form: any;
  resultMessage: any;
  isSavingProcess = false;
  isDoneProcess = false;
  @ViewChild('myFGD') directiveForm: any;
  abstract getFormControl(): any;
  abstract getDefaultFormData(): any;
  abstract buildSubmitData(): any;
  abstract getSubmitObservable(): Observable<Result>;
  abstract getSuccessMessage(): string;

  constructor(private formBuilder: FormBuilder, private errors: FormErrorService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.initFormControl();
  }

  getNoDataMessage() {
    return EMPTY_STRING;
  }

  initFormControl() {
    this.form = this.formBuilder.group(this.getFormControl());
    if (this.getValidators() && this.getValidators().length) {
      this.form.setValidators(this.getValidators());
    }
  }

  getValidators(): ValidatorFn[] {
    // Do nothing
    return [] as ValidatorFn[];
  }

  initFormData() {
    this.form.reset(this.getDefaultFormData());
  }

  resetForm() {
    this.directiveForm.resetForm(this.getDefaultFormData());
  }

  onDataLoaded(): void {
    this.dataLoaded = true;
    this.checkData();
    this.initFormData();
  }

  onCancel() {
    this.resetForm();
    this.isSavingProcess = false;
    this.isDoneProcess = false;
    this.resultMessage = EMPTY_STRING;
  }

  onSubmit() {
    this.isDoneProcess = false;
    this.resultMessage = EMPTY_STRING;
    if (this.isFormValid()) {
      this.isSavingProcess = true;
      this.getSubmitObservable()
        .subscribe(
          () => {
            this.handleSuccessStatus();
          },
          error => {
            console.error(error);
            this.resultMessage = error;
          }
        )
        .add(() => {
          this.isSavingProcess = false;
        });
    }
  }

  handleSuccessStatus() {
    this.isDoneProcess = true;
    this.resetForm();
    this.resultMessage = this.getSuccessMessage();
  }

  isFormValid() {
    return this.form.valid;
  }

  get f() {
    return this.form?.controls;
  }

  getErrorMessage(key: any) {
    const controlErrors = this.f[key]?.errors || null;
    if (controlErrors) {
      const keys = Object.keys(controlErrors);
      const firstKey = keys[keys.length > 1 ? 1 : 0];
      const getError = this.errors.errorMap()[firstKey];
      return getError(controlErrors[firstKey]);
    }
    return EMPTY_STRING;
  }
}
