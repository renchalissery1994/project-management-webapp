import { Component, OnInit, Input } from '@angular/core';
import { ProjectManagerService } from './project-manager.service';
import { User } from '../models/user';
import { Skill } from '../models/skill';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material';
import { AddSkillComponent } from '../dialog/add-skill.component';
import { UserSkill } from '../models/user-skill';

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

  addUserSkill(userSkill: UserSkill) {
    this.appService.addUserSkill(this.user.id, userSkill).subscribe(user => {
      this.user = user;
    });
  }

}
