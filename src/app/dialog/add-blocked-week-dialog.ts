import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    week: number;
    type: number;
}

@Component({
    selector: 'add-blocked-week-dialog',
    templateUrl: 'add-blocked-week-dialog.html',
})
export class AddBlockedWeekComponent {

    public types: string[] = ['20', '40', '60', '80', '100'];
    constructor(
        public dialogRef: MatDialogRef<AddBlockedWeekComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancel(): void {
        this.dialogRef.close();
    }

}