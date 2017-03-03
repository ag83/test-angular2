import { MainComponent } from './components/main/main.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddorderComponent } from './components/addorder/addorder.component';

export const appRoutes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'add',
    component: AddorderComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  }
];