import { Component, OnInit, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ly-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
  @Input() data: any;
  @Input() userOption = false;
  @Output() selected = new EventEmitter();
  isClicked = false;

  constructor(private eRef: ElementRef) {}
  selectItem(itemKey: string): void {
    this.selected.emit(itemKey);
  }
  @HostListener('document:click', ['$event'])
  clickout(event: any): void {
    this.isClicked = this.eRef.nativeElement.contains(event.target) && !this.isClicked;
  }
  ngOnInit(): void {}
}
