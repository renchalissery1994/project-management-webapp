import { Component } from '@angular/core';
import { AppService } from './app.service';
import { User } from './models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isRegister: boolean;
  public userName: string;
  public showLogin: boolean = true;
  public user: User;
  public newUser: User = new User();
  public role = new FormControl();

  constructor(private appService: AppService) { }

  login() {
    this.appService.validateUser(this.userName).subscribe(user => {
      this.user = user;
      this.showLogin = false;
    });
  }

  registerUser() {
    this.newUser.role = this.role.value;
    this.newUser.id = parseInt(Date.now().toString().slice(7, 13));
    this.appService.registerUser(this.newUser).subscribe(user => {
      this.isRegister = false;
      this.showLogin = true;
      if (user == null) alert('Failed to register.');
    });
  }


  showRegister() {
    this.isRegister = true;
    this.showLogin = false;
  }

  saveData() {
    this.appService.saveData().subscribe(data => {
      console.log(data);
    });
  }
}
