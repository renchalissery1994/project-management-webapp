import { Component, OnInit, Input } from '@angular/core';
import { FullTimeDeveloperService } from './full-time-developer.service';
import { User } from '../models/user';
import { UserSkill } from '../models/user-skill';
import { MatDialog } from '@angular/material';
import { Skill } from '../models/skill';
import { AddSkillComponent } from '../dialog/add-skill.component';
import { AppService } from '../app.service';
import { AddBlockedWeekComponent } from '../dialog/add-blocked-week-dialog';

@Component({
  selector: 'full-time-developer',
  templateUrl: './full-time-developer.component.html',
  styleUrls: ['./full-time-developer.component.css']
})
export class FullTimeDeveloperComponent implements OnInit {

  @Input()
  public user: User;

  public skills: Skill[];

  constructor(private fullTimeDeveloperService: FullTimeDeveloperService, private appService: AppService, public dialog: MatDialog) { }

  ngOnInit() {
    this.appService.getAllSkills().subscribe(skills => { this.skills = skills });
  }

  openDialog(): void {
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

  openAvailabilityDialog(): void {
    const dialogRef = this.dialog.open(AddBlockedWeekComponent, {
      width: '250px',
      data: { week: null, type: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined && result.week != undefined && result.type != undefined) {
        this.fullTimeDeveloperService.addAvailability(this.user.id, result.week, result.type).subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  addUserSkill(userSkill: UserSkill) {
    this.appService.addUserSkill(this.user.id, userSkill).subscribe(user => {
      this.user = user;
    });
  }

}
