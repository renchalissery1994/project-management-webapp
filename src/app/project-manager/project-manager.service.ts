import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from './../../environments/environment';
import { Activity } from '../models/activity';
import { ActivityAllocation } from '../models/activity-allocation';
import { Skill } from '../models/skill';

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

    allocateActivity(userId: number, projectId: number, activityId: number, activityAllocation: ActivityAllocation): Observable<User> {
        return this.http.post<User>(environment.apiUrl + '/projectmanager/allocateactivity?userId=' + userId + '&projectId=' + projectId + '&activityId=' + activityId, activityAllocation);
    }

    createProject(userId: number, project: any): Observable<User> {
        return this.http.post<User>(environment.apiUrl + '/projectmanager/createproject?userId=' + userId, project);
    }

    createSkill(skill: any): Observable<Skill[]> {
        return this.http.post<Skill[]>(environment.apiUrl + '/skill/create', skill);
    }
}