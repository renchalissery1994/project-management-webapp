import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { environment } from './../environments/environment';
import { UserSkill } from './models/user-skill';
import { Skill } from './models/skill';

@Injectable({
    providedIn: 'root',
})
export class AppService {

    constructor(private http: HttpClient) { }

    validateUser(userName: string): Observable<User> {
        return this.http.get<User>(environment.apiUrl + '/user/login?userName=' + userName);
    }

    getAllSkills(): Observable<Skill[]> {
        return this.http.get<Skill[]>(environment.apiUrl + '/skill/list');
    }
    
    addUserSkill(userId: number, userSkill: UserSkill): Observable<User> {
        return this.http.post<User>(environment.apiUrl + '/skill/add?userId=' + userId, userSkill);
    }

}