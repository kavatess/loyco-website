export class PayslipsModel {
  private _PaymentDate: string;
  private _Description: string;
  private _FileName: string;

  public get PaymentDate(): string {
    return this._PaymentDate;
  }

  public set PaymentDate(PaymentDate: string) {
    this._PaymentDate = PaymentDate;
  }

  public get Description(): string {
    return this._Description;
  }

  public set Description(Description: string) {
    this._Description = Description;
  }

  public get FileName(): string {
    return this._FileName;
  }

  public set FileName(FileName: string) {
    this._FileName = FileName;
  }
}
