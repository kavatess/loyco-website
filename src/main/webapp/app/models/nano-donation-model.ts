export class NanoDonation {
  private _FoundationName: string;
  private _DebitDt: string;
  private _GpPmtAmt: string;

  constructor() {
    this._FoundationName = '';
    this._DebitDt = '';
    this._GpPmtAmt = '';
  }

  public get FoundationName(): string {
    return this._FoundationName;
  }

  public set FoundationName(FoundationName: string) {
    this._FoundationName = FoundationName;
  }

  public get DebitDt(): string {
    return this._DebitDt;
  }

  public set DebitDt(DebitDt: string) {
    this._DebitDt = DebitDt;
  }

  public get GpPmtAmt(): string {
    return this._GpPmtAmt;
  }

  public set GpPmtAmt(GpPmtAmt: string) {
    this._GpPmtAmt = GpPmtAmt;
  }
}
export class NanoDonationSetupInfo {
  _ShareEeInformationOption: number;
  _DisplayEeWidget: number;

  constructor() {
    this._ShareEeInformationOption = 0;
    this._DisplayEeWidget = 0;
  }

  public get ShareEeInformationOption(): number {
    return this._ShareEeInformationOption;
  }

  public set ShareEeInformationOption(ShareEeInformationOption: number) {
    this._ShareEeInformationOption = ShareEeInformationOption;
  }

  public get DisplayEeWidget(): number {
    return this._DisplayEeWidget;
  }

  public set DisplayEeWidget(DisplayEeWidget: number) {
    this._DisplayEeWidget = DisplayEeWidget;
  }
}
