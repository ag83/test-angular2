import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProvidersService {
  domain: string;

  constructor(private http: Http) { 
    this.domain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    if (this.domain === "http://localhost:4200") {
       this.domain = 'http://localhost:3000';
    }
  }

  getAllProviders() {
    return this.http.get(this.domain + '/api/providers')
      .map(res => res.json())
      .map((res) => res);
  }

  addProvider(name) {
    return this.http.post(this.domain + '/api/providers', {provider: name})
      .map(res => res.json())
      .map((res) => res.provider);
  }

}
