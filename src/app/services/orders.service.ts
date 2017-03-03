import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrdersService {
  domain: string;

  constructor(private http: Http) {
    this.domain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    if (this.domain === "http://localhost:4200") {
      this.domain = 'http://localhost:3000';
    } 
  }

  getAllOrders() {
    return this.http.get(this.domain + '/api/orders')
      .map(res => res.json())
      .map((res) => {
        let currentDate = new Date();
        res.forEach((item) => {
          let expires = new Date(item.expiresAt);
          item.outdated = expires < currentDate;
          let daysLeft: number = (+expires - (+currentDate))/(3*24*60*60*1000);
          item.redactable = daysLeft > 3;
          item.managerId = item.managerName._id;
          item.providerId = item.provider._id;
          item.managerName = item.managerName.manager;
          item.provider = item.provider.provider;
        });
        return res;
      });
  }

  addOrder(order) {
    return this.http.post(this.domain + '/api/orders', order)
      .map(res => res.json())
      .map((res) => {res.order});
  }

  putOrder(order) {
    const id = order._id;
    return this.http.put(this.domain + '/api/orders/' + id, order)
      .map(res => res.json());
  }
  
}
