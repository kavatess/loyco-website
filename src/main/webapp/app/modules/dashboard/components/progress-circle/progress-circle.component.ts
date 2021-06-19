import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ly-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
})
export class ProgressCircleComponent implements OnInit {
  @Input() data = 1;
  ngOnInit(): void {
    this.data = Math.round(this.data * 100);
  }
}
