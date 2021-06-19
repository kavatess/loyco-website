import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { SharedModule } from 'app/shared/shared.module';
import { CardComponent } from './component/card/card.component';
@NgModule({
  declarations: [ApplicationsComponent, CardComponent],
  imports: [CommonModule, SharedModule],
  exports: [ApplicationsComponent],
})
export class ApplicationsModule {}
