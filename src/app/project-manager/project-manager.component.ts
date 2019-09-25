import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from './project-manager.service';
import { User } from '../models/user';

@Component({
  selector: 'project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  public users: User[] = [];
  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit() {
    this.projectManagerService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

}
