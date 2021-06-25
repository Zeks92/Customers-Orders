import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerCreateCanDeactivateGuard } from './customers/customer-create/customer-create-candeactivateguard';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomerResolverService } from './customers/customer-resolver.service';
import { CustomerDetailCanActivateGuard } from './customers/customer-detail/customer-detail-canactivateguard';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderCreateComponent } from './orders/order-create/order-create.component';
import { OrdersResolverService } from './orders/orders-resolver.service';
import { OrderDetailCanActivateGuard } from './orders/order-detail/order-detail-canactivateguard';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: 'customers', component: CustomerListComponent, resolve: { customers: CustomerResolverService}},
  {path: 'customers/detail/:id', component: CustomerDetailComponent, canActivate: [CustomerDetailCanActivateGuard]},
  {path: 'customers/create', component: CustomerCreateComponent, canDeactivate: [CustomerCreateCanDeactivateGuard]},
  {path: 'orders', component: OrderListComponent, resolve: { orders: OrdersResolverService, customers: CustomerResolverService}},
  {path: 'orders/create', component: OrderCreateComponent},
  {path: 'orders/detail/:id', component: OrderDetailComponent, canActivate: [OrderDetailCanActivateGuard]},
  {path: 'notfound', component: NotfoundComponent},
  {path: '', redirectTo: '/customers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CustomerCreateCanDeactivateGuard,
              OrdersResolverService,
              CustomerDetailCanActivateGuard,
              OrderDetailCanActivateGuard,
              CustomerResolverService]
})
export class AppRoutingModule { }
