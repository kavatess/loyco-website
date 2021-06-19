import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  declarations: [LogInComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class LogInModule {}
