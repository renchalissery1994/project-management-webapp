import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FullTimeDeveloperService {

    constructor(private http: HttpClient) { }

    addAvailability(userId: number, week: number, type: number,): Observable<User> {
        return this.http.get<User>(environment.apiUrl + '/fulltimedeveloper/addavailability?userId=' + userId+'&week='+week+'&type='+type);
    }
}