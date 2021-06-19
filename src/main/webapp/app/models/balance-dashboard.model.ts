export class BalanceDashboardModel {
  EntitlementTotal: number;
  CarryOver: number;
  DurationTypeId?: number;
  RemainingString?: string;
  RemainingYearToDate: number;
  DurationTypeI18n: string;
  BalanceTitle: string;
  EntitlementWithoutAdj: number;
  RemainingWithoutAdjString?: string;
  EntitlementWithoutAdjString?: string;
  RemainingYearToDateString?: string;
  Remaining: number;
  BalanceTypeId?: number;
  CarryOverString?: string;
  constructor() {
    this.EntitlementTotal = 0;
    this.CarryOver = 0;
    this.RemainingYearToDate = 0;
    this.Remaining = 0;
    this.DurationTypeI18n = '';
    this.BalanceTitle = '';
    this.EntitlementWithoutAdj = 0;
  }
}
export class CircleItem {
  percent = 0;
  countDay: string;
  typeBalance = '';
  constructor(percent: number, typeBalance: string, countDay: string) {
    this.percent = percent;
    this.countDay = countDay;
    this.typeBalance = typeBalance;
  }
}
export class CirclePercentModel {
  listItem: CircleItem[] = [];
  durationType = '';
  addNewItem(percent: number, typeBalance: string, amount: string): void {
    this.listItem.push(new CircleItem(percent, typeBalance, amount));
  }
  calculateCirclePercent(value: number, total: number): number {
    if (total < 0) {
      return value <= 0 ? 0 : 1;
    }
    return value / total;
  }
  parseData(data: BalanceDashboardModel): void {
    this.addNewItem(
      this.calculateCirclePercent(data.CarryOver, data.EntitlementTotal),
      'widget.balance.gauge.title.carryOver',
      data.CarryOverString ? data.CarryOverString : data.CarryOver.toString()
    );
    this.addNewItem(
      this.calculateCirclePercent(data.EntitlementWithoutAdj, data.EntitlementTotal),
      'widget.balance.gauge.title.contractualRight',
      data.EntitlementWithoutAdjString ? data.EntitlementWithoutAdjString : data.EntitlementWithoutAdj.toString()
    );
    this.addNewItem(
      this.calculateCirclePercent(data.RemainingYearToDate, data.EntitlementTotal),
      'widget.balance.gauge.title.todaysBalance',
      data.RemainingYearToDateString ? data.RemainingYearToDateString : data.RemainingYearToDate.toString()
    );
    this.addNewItem(
      this.calculateCirclePercent(data.Remaining, data.EntitlementTotal),
      'widget.balance.gauge.title.finalBalance',
      data.RemainingString ? data.RemainingString : data.Remaining.toString()
    );
    this.durationType = data.DurationTypeI18n;
  }
  getListItem(): CircleItem[] {
    return this.listItem;
  }
}

export const enum SCREEN_SIZE {
  small = 2,
  medium = 1,
  large = 0,
}
