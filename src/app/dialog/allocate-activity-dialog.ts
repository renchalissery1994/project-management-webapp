import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    activity: { projectId: number, activityId: string, activityName: string };
    involvementRate: number;
    endWeek: number;
    startWeek: number;
    activities: { projectId: number, activityId: string, activityName: string }[]
}

@Component({
    selector: 'allocate-activity-dialog',
    templateUrl: 'allocate-activity-dialog.html',
})
export class AllocateActivityComponent {
    
    constructor(
        public dialogRef: MatDialogRef<AllocateActivityComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancel(): void {
        this.dialogRef.close();
    }

}