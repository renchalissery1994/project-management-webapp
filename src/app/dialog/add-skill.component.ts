import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../models/skill';

export interface DialogData {
    skills: Skill[];
    skillLevel: number;
    newSkill: Skill;
}

@Component({
    selector: 'add-skill-dialog',
    templateUrl: 'add-skill-dialog.html',
})
export class AddSkillComponent {

    constructor(
        public dialogRef: MatDialogRef<AddSkillComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancel(): void {
        this.dialogRef.close();
    }

}