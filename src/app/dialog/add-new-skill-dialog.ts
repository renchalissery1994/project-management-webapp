import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    skillName: string;
}

@Component({
    selector: 'add-new-skill-dialog',
    templateUrl: 'add-new-skill-dialog.html',
})
export class CreateSkillComponent {

    constructor(
        public dialogRef: MatDialogRef<CreateSkillComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancel(): void {
        this.dialogRef.close();
    }

}