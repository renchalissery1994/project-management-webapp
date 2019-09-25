import { Component, OnInit, Input } from '@angular/core';
import { ProjectManagerService } from './project-manager.service';
import { User } from '../models/user';

@Component({
  selector: 'project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  @Input()
  public user: User;

  public users: User[] = [];

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit() {
    this.projectManagerService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
