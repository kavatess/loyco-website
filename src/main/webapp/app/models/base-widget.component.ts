import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from './common-api-url.model';

@Component({
  selector: 'ly-base-widget',
  template: '',
})
export abstract class BaseWidget implements OnInit {
  dataLoaded = false;
  data: any;
  hasData = false;
  self = this;
  abstract getDataObservable(): Observable<Result>;
  abstract getViewMoreLink(): string;
  abstract getNoDataMessage(): string;
  getSizeOfWidget(): string {
    return 'large';
  }
  fetchData(): void {
    if (!this.getDataObservable()) {
      this.onDataLoaded();
    } else {
      this.getDataObservable().subscribe(rawData => {
        this.data = this.parse(rawData);
        this.onDataLoaded();
      });
    }
  }
  checkData() {
    if (this.getDataObservable()) {
      if (Number.isFinite(this.data)) {
        this.hasData = true;
        return;
      }
      if (!this.data || (Object.keys(this.data).length === 0 && this.data.constructor === Object)) {
        this.hasData = false;
        return;
      }
      if (this.data instanceof Array) {
        this.hasData = this.data.length > 0;
        return;
      }
    }
    this.hasData = true;
  }
  parse(rawData: any) {
    try {
      return JSON.parse(rawData.result);
    } catch (e) {
      console.error("Can't parse data:", e);
      return null;
    }
  }
  getViewMoreMessage(): string {
    return 'widget.more';
  }
  onDataLoaded(): void {
    this.dataLoaded = true;
    this.checkData();
  }
  onClickViewMore() {
    window.location.href = this.getViewMoreLink();
  }
  ngOnInit() {
    this.fetchData();
  }
}
