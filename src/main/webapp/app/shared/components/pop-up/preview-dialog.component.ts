import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss'],
})
export class PreviewDialogComponent {
  content: any;
  isLoadDone = false;

  constructor(public dialogRef: MatDialogRef<PreviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data.fileResource.subscribe(
      (res: any) => {
        if (res) {
          this.content = new Blob([res], {
            type: 'application/pdf',
          });
        }
      },
      (err: any) => console.error('Error during view file ! [fileName=' + data.filename + ']', err),
      () => {
        this.isLoadDone = true;
      }
    );

    dialogRef.beforeClosed().subscribe(() => {
      this.content = null;
      this.isLoadDone = false;
    });
  }
}
