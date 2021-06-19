import { BaseModel } from './base.model';

export class AbsenceModel extends BaseModel {
  private _AbsenceReasonId!: number;
  private _Description?: string | undefined;
  private _StartDate!: string;
  private _DayTimesIdStart!: string;
  private _EndDate!: string;
  private _DayTimesIdEnd!: string;

  public constructor(init?: Partial<AbsenceModel>) {
    super(init);
  }

  public get DayTimesIdEnd(): string {
    return this._DayTimesIdEnd;
  }
  public set DayTimesIdEnd(value: string) {
    this._DayTimesIdEnd = value;
  }
  public get EndDate(): string {
    return this._EndDate;
  }
  public set EndDate(value: string) {
    this._EndDate = value;
  }
  public get DayTimesIdStart(): string {
    return this._DayTimesIdStart;
  }
  public set DayTimesIdStart(value: string) {
    this._DayTimesIdStart = value;
  }
  public get StartDate(): string {
    return this._StartDate;
  }
  public set StartDate(value: string) {
    this._StartDate = value;
  }
  public get Description(): string | undefined {
    return this._Description;
  }
  public set Description(value: string | undefined) {
    this._Description = value;
  }
  public get AbsenceReasonId(): number {
    return this._AbsenceReasonId;
  }
  public set AbsenceReasonId(value: number) {
    this._AbsenceReasonId = value;
  }
}

export class AbsenceReason extends BaseModel {
  private _AbsenceReasonId!: number;
  private _AbscReasonDescription!: string;
  private _Remark?: string | undefined;
  private _AllowNullDescription!: number;

  public constructor(init?: Partial<AbsenceReason>) {
    super(init);
  }

  public get AbsenceReasonId(): number {
    return this._AbsenceReasonId;
  }
  public set AbsenceReasonId(AbsenceReasonId: number) {
    this._AbsenceReasonId = AbsenceReasonId;
  }
  public get AbscReasonDescription(): string {
    return this._AbscReasonDescription;
  }
  public set AbscReasonDescription(value: string) {
    this._AbscReasonDescription = value;
  }
  public get Remark(): string | undefined {
    return this._Remark;
  }
  public set Remark(value: string | undefined) {
    this._Remark = value;
  }
  public get AllowNullDescription(): number {
    return this._AllowNullDescription;
  }
  public set AllowNullDescription(value: number) {
    this._AllowNullDescription = value;
  }
}
