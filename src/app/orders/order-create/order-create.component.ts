import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../model/order.model';
import { DataStorageService } from '../../service/data-storage.service';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  order: Order = new Order();
  customers: Customer[];

  addOrder = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {

    if (this.route.snapshot.queryParamMap.has('customerId')) {
      this.order.customerId = +this.route.snapshot.queryParamMap.get('customerId');
      this.addOrder = true;
    } else {
      this.order.customerId = -1;
    }
  }

  ngOnInit(): void {
    this.dataStorageService.getCustomers().subscribe(customers => this.customers = customers);
  }

  save(order: Order): void {
    this.order.status = 'Draft';
    this.dataStorageService.postOrder(this.order).subscribe((order: Order) => this.router.navigate(['/orders/detail', order.id]));
  }
}
