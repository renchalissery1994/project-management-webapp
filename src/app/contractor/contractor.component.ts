import { Component, OnInit, Input } from '@angular/core';
import { ContractorService } from './contractor.service';
import { User } from '../models/user';

@Component({
  selector: 'contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  @Input()
  public user: User;

  constructor(private contractorService: ContractorService) { }

  ngOnInit() {
    console.log(this.user);
  }

}
