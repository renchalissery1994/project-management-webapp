import { Component, OnInit, Input } from '@angular/core';
import { FullTimeDeveloperService } from './full-time-developer.service';
import { User } from '../models/user';

@Component({
  selector: 'full-time-developer',
  templateUrl: './full-time-developer.component.html',
  styleUrls: ['./full-time-developer.component.css']
})
export class FullTimeDeveloperComponent implements OnInit {

  @Input()
  public user: User;

  constructor(private fullTimeDeveloperService: FullTimeDeveloperService) { }

  ngOnInit() {
    console.log(this.user);
  }

}
