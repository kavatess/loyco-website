import { Component, Input, OnInit } from '@angular/core';
import { TeamAbsencesInfoModel } from 'app/models/team-absences-info-model';

@Component({
  selector: 'ly-team-absences-info',
  templateUrl: './team-absences-info.component.html',
  styleUrls: ['./team-absences-info.component.scss'],
})
export class TeamAbsencesInfoComponent implements OnInit {
  @Input() data: TeamAbsencesInfoModel = new TeamAbsencesInfoModel();
  isFullTime = false;

  constructor() {}

  ngOnInit(): void {
    this.isFullTime = this.data.Fte === 1.0;
  }
}
