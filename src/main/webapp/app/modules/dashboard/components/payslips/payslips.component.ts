import { Component } from '@angular/core';
import { PayslipsService } from 'app/core/services/payslips.service';
import { SERVER_API_URL } from 'app/app.constants';
import { payslipDownload } from 'app/models/common-api-url.model';
import { getApplicationURL } from 'app/shared/util/app-util';
import { BaseWidget } from 'app/models/base-widget.component';
import { MatDialog } from '@angular/material/dialog';
import { PreviewDialogComponent } from 'app/shared/components/pop-up/preview-dialog.component';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'ly-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.scss'],
})
export class PayslipsComponent extends BaseWidget {
  readonly viewPayslipsTitle = 'widget.previewPopup.viewPayslip.title';
  constructor(private payslipsService: PayslipsService, public dialog: MatDialog, private session: SessionStorageService) {
    super();
  }

  getDataObservable() {
    return this.payslipsService.getPayslipsData();
  }

  getViewMoreLink() {
    return getApplicationURL('payslips', this.session.retrieve('language')?.language);
  }

  getNoDataMessage() {
    return 'widget.myLastPayslips.message.noData';
  }

  getSizeOfWidget(): string {
    return 'small';
  }

  getDownloadUrl(filename: string): void {
    window.location.href = `${SERVER_API_URL}${payslipDownload}${filename}`;
  }

  openDialog(filename: string): void {
    this.dialog.open(PreviewDialogComponent, {
      data: { fileResource: this.payslipsService.getFileByName(filename), filename, title: this.viewPayslipsTitle },
    });
  }
}
