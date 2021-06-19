import { Component, Input, OnInit } from '@angular/core';
import { BalanceDashboardService } from 'app/core/services/balance-dashboard.service';
import { CirclePercentModel } from 'app/models/balance-dashboard.model';
@Component({
  selector: 'ly-balance-item',
  templateUrl: './balance-item.component.html',
  styleUrls: ['./balance-item.component.scss'],
})
export class BalanceItemComponent implements OnInit {
  @Input() data: CirclePercentModel = new CirclePercentModel();
  constructor(public balanceService: BalanceDashboardService) {}
  ngOnInit(): void {}
}
