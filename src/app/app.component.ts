import { Component } from '@angular/core';
import { AppService } from './app.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public project: string = 'Project Management';
  public userName: string = 'Ren';
  public showLogin: boolean = true;
  public user: User;
  constructor(private appService: AppService) { }

  login() {
    this.appService.validateUser(this.userName).subscribe(user => {
      this.user = user;
      this.showLogin=false;
    });
  }

}
