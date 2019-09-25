import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ContractorService {

    constructor(private http: HttpClient) { }

}