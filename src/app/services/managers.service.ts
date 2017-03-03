import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ManagersService {
  domain: string;

  constructor(private http: Http) {
    this.domain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    if (this.domain === "http://localhost:4200") {
      this.domain = 'http://localhost:3000';
    } 
  }

  getAllManagers() {
    return this.http.get(this.domain + '/api/managers')
      .map(res => res.json())
      .map((res) => res);
  }

  addManager(name) {
    return this.http.post(this.domain + '/api/managers', {manager: name})
      .map(res => res.json())
      .map((res) => res.manager);
  }

}
