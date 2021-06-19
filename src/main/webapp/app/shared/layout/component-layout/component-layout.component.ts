import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ly-component-layout',
  templateUrl: './component-layout.component.html',
  styleUrls: ['./component-layout.component.scss'],
})
export class ComponentLayoutComponent implements OnInit {
  @Input() component: any;
  visible = true;
  favorited = false;
  sizeArray = {
    large: { width: 'calc(100% - 20px)' },
    medium: { width: 'calc((100% - 63px)/2)' },
    small: { width: 'calc((100% - 91px)/3)' },
  };

  constructor() {}
  ngOnInit(): void {}

  onClickFavoriteStar(): void {
    this.favorited = !this.favorited;
  }
  chooseSize(): any {
    return this.sizeArray[this.component.getSizeOfWidget()];
  }
}
