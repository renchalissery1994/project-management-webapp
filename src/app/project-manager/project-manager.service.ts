import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProjectManagerService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + '/user/list');
    }

}