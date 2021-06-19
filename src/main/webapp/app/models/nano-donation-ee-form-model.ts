export class NanoDonationFoundation {
  private _NanoDonationFoundationId: string;
  private _FoundationName: string;
  private _Url: string;
  private _DescriptionI18n: string;

  constructor() {
    this._NanoDonationFoundationId = '';
    this._FoundationName = '';
    this._Url = '';
    this._DescriptionI18n = '';
  }

  public get NanoDonationFoundationId(): string {
    return this._NanoDonationFoundationId.toString();
  }

  public set NanoDonationFoundationId(NanoDonationFoundationId: string) {
    this._NanoDonationFoundationId = NanoDonationFoundationId;
  }

  public get FoundationName(): string {
    return this._FoundationName;
  }

  public set FoundationName(FoundationName: string) {
    this._FoundationName = FoundationName;
  }

  public get Url(): string {
    return this._Url;
  }

  public set Url(Url: string) {
    this._Url = Url;
  }

  public get DescriptionI18n(): string {
    return this._DescriptionI18n;
  }

  public set DescriptionI18n(DescriptionI18n: string) {
    this._DescriptionI18n = DescriptionI18n;
  }
}

export class NanoDonationSetupEE {
  private _NanoDonationTypeId: string;
  private _ShareEeInformation: string;
  private _NanoDonationFoundationId: string;
  private _EffectiveDate: string;

  constructor(nanoDonationTypeId?: string, shareEeInformation?: string, nanoDonationFoundationId?: string, effectiveDate?: string) {
    this._NanoDonationTypeId = nanoDonationTypeId || '';
    this._ShareEeInformation = shareEeInformation || '';
    this._NanoDonationFoundationId = nanoDonationFoundationId || '';
    this._EffectiveDate = effectiveDate || '';
  }

  public get NanoDonationTypeId(): string {
    return this._NanoDonationTypeId.toString();
  }

  public set NanoDonationTypeId(NanoDonationTypeId: string) {
    this._NanoDonationTypeId = NanoDonationTypeId;
  }

  public get ShareEeInformation(): string {
    return this._ShareEeInformation.toString();
  }

  public set ShareEeInformation(ShareEeInformation: string) {
    this._ShareEeInformation = ShareEeInformation;
  }

  public get NanoDonationFoundationId(): string {
    return this._NanoDonationFoundationId.toString();
  }

  public set NanoDonationFoundationId(NanoDonationFoundationId: string) {
    this._NanoDonationFoundationId = NanoDonationFoundationId;
  }

  public get EffectiveDate(): string {
    return this._EffectiveDate;
  }

  public set EffectiveDate(EffectiveDate: string) {
    this._EffectiveDate = EffectiveDate;
  }
}
