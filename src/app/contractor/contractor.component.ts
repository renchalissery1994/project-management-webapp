import { Component, OnInit, Input } from '@angular/core';
import { ContractorService } from './contractor.service';
import { User } from '../models/user';
import { AppService } from '../app.service';
import { UserSkill } from '../models/user-skill';
import { AddSkillComponent } from '../dialog/add-skill.component';
import { Skill } from '../models/skill';
import { MatDialog } from '@angular/material';
import { AddRateComponent } from '../dialog/add-rate-dialog';

@Component({
  selector: 'contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  @Input()
  public user: User;

  public skills: Skill[];

  constructor(private appService: AppService, public dialog: MatDialog, private contractorService: ContractorService) { }

  ngOnInit() {
    this.appService.getAllSkills().subscribe(skills => { this.skills = skills });
  }

  openSkillDialog(): void {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '250px',
      data: { skills: this.skills, skillLevel: null, newSkill: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.skillLevel != undefined && result.newSkill != undefined) {
        let userSkill: UserSkill = new UserSkill();
        userSkill.skillLevel = result.skillLevel;
        userSkill.skill = result.newSkill;
        this.addUserSkill(userSkill);
      }
    });
  }

  openRateDialog(): void {
    const dialogRef = this.dialog.open(AddRateComponent, {
      width: '250px',
      data: { weeks: 0, rate: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.weeks != undefined && result.rate != undefined) {
        this.contractorService.addRate(this.user.id, result.weeks, result.rate).subscribe(user => {
          this.user = user;
        });;
      }
    });
  }

  addUserSkill(userSkill: UserSkill) {
    this.appService.addUserSkill(this.user.id, userSkill).subscribe(user => {
      this.user = user;
    });
  }

}
