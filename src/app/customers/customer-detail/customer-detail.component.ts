import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../model/customer.model';
import { Order } from '../../model/order.model';
import { DataStorageService } from '../../service/data-storage.service';
import { OrderLine } from '../../model/line.model';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  id: number;
  customer: Customer;
  initialCustomer: Customer;
  mode = 'view';
  orders: Order[];
  orderLines: OrderLine[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.dataStorageService.getCustomer(this.id).subscribe(
      c => {
        this.customer = { ...c };
        this.initialCustomer = { ...c };
      });
    this.dataStorageService.getOrders().subscribe(orders => this.orders = orders.filter(o => o.customerId === this.id));
    this.dataStorageService.getOrderLines().subscribe(orderLines => this.orderLines = orderLines);
  }

  get ordersWSum() {
    const result = this.orders.map(order => {
      const orderLines = this.orderLines.filter(ol => ol.orderId === order.id);
      const itemCount = orderLines.reduce((prev, line) => prev + line.orderQty, 0);
      const orderTotal = orderLines.reduce((prev, line) => prev + line.orderQty * line.unitPrice, 0);
      const newproperties = { itemCount: itemCount, orderTotal: orderTotal };
      return Object.assign(order, newproperties);
    });
    return result;
  }

  saveCustomer(form: NgForm): void {
    if (form.valid) {
      this.dataStorageService.updateCustomer(this.customer).subscribe(customer => this.mode = 'view');
    }
  }

  deleteCustomer(): void {
    if (confirm(`Are you sure you want to delete ${this.customer.firstName} ${this.customer.lastName}?`)) {
      this.dataStorageService.deleteCustomer(this.id).subscribe(data => {
        alert(`${this.customer.firstName} ${this.customer.lastName} has been deleted.`);
        this.router.navigate(['customers']);
      });
    }
  }

  cancelEdit(): void {
    this.mode = 'view';
    this.customer = { ...this.initialCustomer };
  }
}
