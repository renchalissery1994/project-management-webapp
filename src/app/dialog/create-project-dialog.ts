import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData { 
    projectId: number, 
    projectName: string, 
    projectActivities: [] 
}

@Component({
    selector: 'create-project-dialog',
    templateUrl: 'create-project-dialog.html',
})
export class CreateProjectComponent {

    constructor(
        public dialogRef: MatDialogRef<CreateProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onCancel(): void {
        this.dialogRef.close();
    }

}