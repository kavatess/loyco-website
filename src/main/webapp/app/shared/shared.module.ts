import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { Translate } from './pipes/translate.pipe';
import { PageLayoutComponent } from './layout/page-layout/page-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentLayoutComponent } from './layout/component-layout/component-layout.component';
import { ValueRequireComponent } from './components/value-require/value-require.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PasswordPopupComponent } from './components/password-popup/password-popup.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PreviewDialogComponent } from './components/pop-up/preview-dialog.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ApplicationListCarouselComponent } from './components/application-list-carousel/application-list-carousel.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    ComponentLayoutComponent,
    ValueRequireComponent,
    HeaderComponent,
    PageLayoutComponent,
    DropDownComponent,
    Translate,
    PreviewDialogComponent,
    PasswordPopupComponent,
    ApplicationListCarouselComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule,
    PdfJsViewerModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    ComponentLayoutComponent,
    ValueRequireComponent,
    HeaderComponent,
    PageLayoutComponent,
    DropDownComponent,
    TranslateModule,
    Translate,
    PreviewDialogComponent,
    MatButtonModule,
    PdfJsViewerModule,
    MatProgressSpinnerModule,
    PasswordPopupComponent,
    ToastrModule,
    CommonModule,
  ],
})
export class SharedModule { }
