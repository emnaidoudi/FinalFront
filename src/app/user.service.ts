import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from './components/User';

import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserService {
  public API = 'http://localhost:8080/pets/';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }
  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(user: User): Observable<any> {
    let result: Observable<Object>;
    if (user['href']) {
      result = this.http.put(user._id, user);
    } else {
      result = this.http.post(this.API, user);
    }
    return result;
  }

  public deleteUser(user:User) {
    return this.http.delete(this.API + "/"+ user._id);
  }


  public createUser(user:User) {
    const intentHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(user);
    console.warn(body);
    console.warn('ena l\'user ha33333333333333333333',user);
    return this.http.post(this.API, body,{ headers: intentHeaders });
    
  }

  updateUser(user: User) {
    return this.http.put(this.API + '/' + user._id, user);
  }

}
