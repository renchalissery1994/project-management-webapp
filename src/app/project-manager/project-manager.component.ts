import { Component, OnInit, Input } from '@angular/core';
import { ProjectManagerService } from './project-manager.service';
import { User } from '../models/user';
import { Skill } from '../models/skill';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material';
import { AddSkillComponent } from '../dialog/add-skill.component';
import { UserSkill } from '../models/user-skill';
import { AddActivityComponent } from '../dialog/add-activity-dialog';
import { Activity } from '../models/activity';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  @Input()
  public user: User;

  public users: User[] = [];

  public skills: Skill[];
  constructor(private projectManagerService: ProjectManagerService, private appService: AppService, public dialog: MatDialog) { }

  ngOnInit() {
    this.projectManagerService.getUsers().subscribe(users => { this.users = users });
    this.appService.getAllSkills().subscribe(skills => { this.skills = skills });
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '250px',
      data: { skills: this.skills, skillLevel: null, newSkill: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.skillLevel != undefined && result.newSkill != undefined) {
        let userSkill: UserSkill = new UserSkill();
        userSkill.skillLevel = result.skillLevel;
        userSkill.skill = result.newSkill;
        this.addUserSkill(user, userSkill);
      }
    });
  }


  openActivityDialog(project): void {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '450px',
      data: {
        activityName: null,
        dependencyActivityId: null,
        startWeek: 0,
        endWeek: 0,
        requiredSkills: new FormControl(),
        skills: this.skills,
        dependencyActivity: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let activity = new Activity();
      activity.activityId = parseInt(Date.now().toString().slice(7, 13));
      activity.activityName = result.activityName;
      activity.dependencyActivityId = result.dependencyActivityId;
      activity.startWeek = result.startWeek;
      activity.endWeek = result.endWeek;
      activity.requiredSkills = result.requiredSkills.value;
      console.log(activity);
      if (activity != undefined) {
        this.projectManagerService.addActivity(this.user.id, project.projectId, activity).subscribe(usr => {
          this.users.forEach(user => {
            if (user.id == usr.id) user.userSkills = usr.userSkills;
          });
        });
      }
    });
  }

  addUserSkill(user: User, userSkill: UserSkill) {
    this.appService.addUserSkill(user.id, userSkill).subscribe(usr => {
      this.users.forEach(user => {
        if (user.id == usr.id) user.userSkills = usr.userSkills;
      });
    });
  }

}
