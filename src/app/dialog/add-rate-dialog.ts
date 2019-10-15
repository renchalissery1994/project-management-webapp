import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    weeks: number;
    rate: number;
}

@Component({
    selector: 'add-rate-dialog',
    templateUrl: 'add-rate-dialog.html',
})
export class AddRateComponent {

    constructor(
        public dialogRef: MatDialogRef<AddRateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancel(): void {
        this.dialogRef.close();
    }

}