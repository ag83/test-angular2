import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManagersService } from '../../services/managers.service';
import { OrdersService } from '../../services/orders.service';
import { ProvidersService } from '../../services/providers.service';
import { DatesOrder } from '../../validators/datesOrder';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {

  providers: Array<any>;
  managers: Array<any>;
  orders: Array<any>;
  managerToAdd: string = '';
  providerToAdd: string = '';
  createdAt: Date = new Date;
  expiredAt: Date;
  orderForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private managersService: ManagersService, private ordersService: OrdersService, private providersService: ProvidersService) { 
    this.orderForm = this.formBuilder.group({
      'createdDate': ['', Validators.compose([Validators.required])],
      'expiredDate': ['', Validators.compose([Validators.required])],
      'managerName': ['', Validators.compose([Validators.required])],
      'providerName': ['', Validators.compose([Validators.required])],
      'orderType': ['', Validators.compose([Validators.required])],
      'client': ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9 ]*"), Validators.minLength(2), Validators.maxLength(300)])]
    }, {validator: DatesOrder.isValid});

  }

  ngOnInit() {

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

    this.ordersService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    }, (err) => {
      console.error(err);
    });
  }

  public addManager() {
    this.managersService.addManager(this.managerToAdd).subscribe((manager) => {
      this.managers.push(manager);
      this.managerToAdd = '';
    }, (err) => {
      console.error(err);
    });
  }

  public addProvider() {
    this.providersService.addProvider(this.providerToAdd).subscribe((provider) => {
      this.providers.push(provider);
      this.providerToAdd = '';
    }, (err) => {
      console.error(err);
    });
  }
  public addOrder() {
    if(this.orderForm.valid) {
      this.formSubmitted = true;
      //id
      let created = this.orderForm.controls['createdDate'].value;
      let orderNum = this.orders.filter((item) => {
        let date = new Date();
        return date.getMonth() === created.getMonth();
      }).length;
      const id = this.orderForm.controls['orderType'].value.charAt(0) + created.getFullYear().toString().slice(2) + (created.getMonth()+1) + (orderNum+1);

      let order = {
        managerName: this.orderForm.controls['managerName'].value,
        orderType: this.orderForm.controls['orderType'].value,
        clientName: this.orderForm.controls['client'].value,
        provider: this.orderForm.controls['providerName'].value,
        createdAt: this.orderForm.controls['createdDate'].value,
        expiresAt:this.orderForm.controls['expiredDate'].value,
        orderId: id
      };
      this.ordersService.addOrder(order).subscribe((order) => {
        this.orders.push(order);
        this.orderForm.reset();
        this.createdAt = new Date();
        this.formSubmitted = false;
      }, (err) => {
        console.error(err);
      });
    }
  }

}
