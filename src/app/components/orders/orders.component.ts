import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ManagersService } from '../../services/managers.service';
import { OrdersService } from '../../services/orders.service';
import { ProvidersService } from '../../services/providers.service';
import { FilterByPipe } from '../../pipes/filterBy.pipe';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  ordersFiltered: Array<any> = [];
  ordersLoad: boolean = true;
  currentPage: number = 1;
  showLimit: number = 5;
  filterByClient: string = '';
  filterByManager: string = '';
  filterByProvider: string = '';
  sortingProp: string = '';
  sortingType: boolean = false;
  currentOrder: any;
  providers: Array<any>;
  managers: Array<any>;

  constructor(private modalService: NgbModal, private managersService: ManagersService, private ordersService: OrdersService, private providersService: ProvidersService) {}

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
      this.ordersFiltered = orders;
      this.ordersLoad = false;
    });
    this.managersService.getAllManagers().subscribe((managers) => {
      this.managers = managers;
    }, (err) => {
      console.error(err);
    });

    this.providersService.getAllProviders().subscribe((providers) => {
      this.providers = providers;
    }, (err) => {
      console.error(err);
    });
  }

  public filterOrders() {
    let filterByPipe = new FilterByPipe();
    let ordersFiltered = this.orders;
    ordersFiltered = filterByPipe.transform(ordersFiltered, 'clientName', this.filterByClient);
    ordersFiltered = filterByPipe.transform(ordersFiltered, 'managerName', this.filterByManager);
    ordersFiltered = filterByPipe.transform(ordersFiltered, 'provider', this.filterByProvider);
    this.ordersFiltered = ordersFiltered;
  }

  public changeSorting(field) {
    if (this.sortingProp == field) {
      this.sortingType = !this.sortingType;
    } else {
      this.sortingProp = field;
    }
  };

  public openRedactOrderModal(content, data) {
    this.currentOrder = Object.assign({}, data);
    const expires = new Date(this.currentOrder.expiresAt);
    this.currentOrder.managerName = this.currentOrder.managerId;
    this.currentOrder.provider = this.currentOrder.providerId;
    this.currentOrder.expires = {year: expires.getFullYear(), month: expires.getMonth()+1, day: expires.getDate()};
    this.modalService.open(content, {keyboard: true, size: "sm"}).result.then((result) => {
      //console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  public changeOrder() {
    
    this.currentOrder.expiresAt = new Date(this.currentOrder.expires.year, this.currentOrder.expires.month-1, this.currentOrder.expires.day);
    this.currentOrder.createdAt = new Date(this.currentOrder.createdAt);
    this.ordersService.putOrder(this.currentOrder).subscribe(() => {
      this.ordersService.getAllOrders().subscribe((orders) => {
        this.orders = orders;
        this.ordersFiltered = orders;
        this.ordersLoad = false;
        this.currentOrder = null;
      });
    }, (err) => {
      console.error(err);
    });
  }
}
