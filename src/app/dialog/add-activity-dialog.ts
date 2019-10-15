import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../models/skill';
import { FormControl } from '@angular/forms';

export interface DialogData {
    activityName: string;
    dependencyActivityId: number;
    endWeek: number;
    startWeek: number;
    daysRequired: number;
    requiredSkills: FormControl;
    skillLevel: number;
    skills: Skill[];
    dependencyActivity: { activityId: string, activityName: string }[]
}

@Component({
    selector: 'add-activity-dialog',
    templateUrl: 'add-activity-dialog.html',
})
export class AddActivityComponent {
    
    constructor(
        public dialogRef: MatDialogRef<AddActivityComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancel(): void {
        this.dialogRef.close();
    }

}