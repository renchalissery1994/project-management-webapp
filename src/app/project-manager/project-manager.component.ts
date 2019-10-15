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
import { AllocateActivityComponent } from '../dialog/allocate-activity-dialog';
import { ActivityAllocation } from '../models/activity-allocation';
import { CreateProjectComponent } from '../dialog/create-project-dialog';

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
      width: '450px',
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
    let activity: { activityId: string, activityName: string }[] = [];
    let user: any = this.user;
    if (user && user.projectsManaged) {
      user.projectsManaged.forEach(project => {
        if (project && project.projectActivities) {
          project.projectActivities.forEach(a => {
            activity.push({ activityId: a.activityId, activityName: a.activityName })
          });
        }
      });
    }
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '450px',
      data: {
        activityName: null,
        dependencyActivityId: null,
        startWeek: 0,
        endWeek: 0,
        daysRequired: 0,
        requiredSkills: new FormControl(),
        skillLevel: 0,
        skills: this.skills,
        dependencyActivity: activity
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let activity = new Activity();
        activity.activityId = parseInt(Date.now().toString().slice(7, 13));
        activity.activityName = result.activityName;
        activity.dependencyActivityId = result.dependencyActivityId;
        activity.startWeek = result.startWeek;
        activity.endWeek = result.endWeek;
        activity.daysRequired = result.daysRequired;
        activity.requiredSkills = [];
        if (result.requiredSkills.value) {
          result.requiredSkills.value.forEach(skill => {
            activity.requiredSkills.push({ skillLevel: result.skillLevel, skill: skill })
          });
        }
        if (activity != undefined) {
          this.projectManagerService.addActivity(this.user.id, project.projectId, activity).subscribe(user => {
            this.user = user;
          });
        } else {
          alert('Invalid Data');
        }
      }
    });
  }

  openAllocationDialog(user: User) {
    let activities: { projectId: number, activityId: string, activityName: string }[] = [];
    let userPM: any = this.user;
    if (userPM && userPM.projectsManaged) {
      userPM.projectsManaged.forEach(project => {
        if (project && project.projectActivities) {
          project.projectActivities.forEach(a => {
            activities.push({ projectId: project.projectId, activityId: a.activityId, activityName: a.activityName })
          });
        }
      });
    }
    const dialogRef = this.dialog.open(AllocateActivityComponent, {
      width: '450px',
      data: {
        activity: null,
        involvementRate: null,
        endWeek: 0,
        startWeek: 0,
        activities: activities
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let allocation = new ActivityAllocation();
        allocation.activityId = result.activity.activityId;
        allocation.involvementRate = result.involvementRate;
        allocation.startWeek = result.startWeek;
        allocation.endWeek = result.endWeek;
        this.projectManagerService.allocateActivity(user.id, result.activity.projectId, result.activity.activityId, allocation).subscribe(usr => {
          this.projectManagerService.getUsers().subscribe(users => { this.users = users });
        });
      }
    });
  }

  addProject() {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '450px',
      data: { projectId: parseInt(Date.now().toString().slice(7, 13)), projectName: null, projectActivities: [] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.projectId != undefined && result.projectName != undefined) {
        this.projectManagerService.createProject(this.user.id, result).subscribe(user => {
          this.user = user;
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
