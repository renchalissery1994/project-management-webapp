import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from './../../environments/environment';
import { Activity } from '../models/activity';

@Injectable({
    providedIn: 'root',
})
export class ProjectManagerService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + '/user/list');
    }

    addActivity(userId: number, projectId: number, activity: Activity): Observable<User> {
        return this.http.post<User>(environment.apiUrl + '/projectmanager/addactivity?userId=' + userId + '&projectId=' + projectId, activity);
    }

}