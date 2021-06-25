import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderLine } from '../../model/line.model';
import { DataStorageService } from '../../service/data-storage.service';
import { Product } from '../../model/product.model';
import { Order } from '../../model/order.model';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: number;
  newOrderLine: OrderLine;
  customer: Customer;
  order: Order;
  orderLines: OrderLine[];
  products: Product[];
  orderLineForm: FormGroup;

  validationMessages = {
    product: {
      required: 'Product is required.'
    },
    price: {
      required: 'Price is required.',
      pattern: 'Invalid Price'
    },
    orderQty: {
      required: 'Quantity is required.',
      pattern: "Invalid Quantity"
    }
  };

  formErrors = {
    product: '',
    price: '',
    orderQty: ''
  };

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.orderId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.dataStorageService.getOrderLines().subscribe(data => this.orderLines = data.filter(ol => ol.orderId == this.orderId));
    this.dataStorageService.getProducts().subscribe(data => this.products = data);
    this.dataStorageService.getOrder(this.orderId).subscribe(order => {
      this.order = order;
      this.dataStorageService.getCustomer(order.customerId).subscribe(c => this.customer = c);
    }, error => alert(error));

    this.orderLineForm = this.fb.group({
      product: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern("^[0-9\.]+$")]],
      orderQty: [null, [Validators.required, Validators.pattern("^[0-9\.]+$")]]
    });

    this.orderLineForm.controls.product.valueChanges.subscribe(data => {
      if (data) {
        const unitPrice = this.products.find(p => p.id == data).productPrice;
        this.orderLineForm.controls.price.setValue(unitPrice);
      } else {
        this.orderLineForm.controls.price.setValue(0);
      }
    });
    this.orderLineForm.valueChanges.subscribe(data => this.logValidationErrors(this.orderLineForm));
  }

  logValidationErrors(group: FormGroup = this.orderLineForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.get(key);
      if (control instanceof FormGroup) {
        this.logValidationErrors(control);
      } else {
        this.formErrors[key] = '';
        if (control && control.touched && !control.valid) {
          const messages = this.validationMessages[key];
          for (const errorKey in control.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  get orderTotal() {
    return this.orderLines.reduce((prev, current) => {
      prev[0] = prev[0] + current.orderQty;
      prev[1] = prev[1] + current.orderQty * current.unitPrice;
      return prev;
    }, [0, 0])
  }

  get orderLinesWItemNo() {
    const result = this.orderLines.map(line => {
      const item = this.products.find(p => p.id == line.productId);
      const newproperty = { productName: item.productName };
      return Object.assign(line, newproperty);
    });
    return result;
  }

  markConfirmed(): void {
    if (this.orderLines.length > 0) {
      this.order.status = 'Confirmed';
      this.dataStorageService.updateOrder(this.order).subscribe(order => console.log("order status changed to confirmed!"));
    } else {
      alert("Please add at least one product line before confirming the order.");
    }
  }

  markVoided(): void {
    this.order.status = 'Voided';
    this.dataStorageService.updateOrder(this.order).subscribe(order => console.log("order status changed to voided!"));
  }

  markShipped(): void {
    this.order.status = 'Shipped';
    this.order.shipDate = new Date();
    this.dataStorageService.updateOrder(this.order).subscribe(order => console.log("order status changed to shipped!"));
  }

  deleteOrder(): void {
    if (confirm(`Are you sure you want to delete order # ${this.order.id}?`)) {
      this.orderLines.forEach(orderLine => this.dataStorageService.deleteOrderLine(orderLine.id).subscribe(data => {
        console.log("orderline # " + orderLine.id + " has been deleted!");
      }));
      this.dataStorageService.deleteOrder(this.orderId).subscribe(data => {
        console.log("order # " + this.orderId + " has been deleted!");
        this.router.navigate(['/orders'])
      });
    } else {
      console.log("you clicked cancel");
    }
  }

  deleteOrderLine(id: number): void {
    this.dataStorageService.deleteOrderLine(id).subscribe(data => {
      this.orderLines.splice(this.orderLines.findIndex(ol => ol.id == id), 1);
      alert("orderline # " + id + " has been deleted!");
    });
  }

  resetForm(): void {
    this.orderLineForm.reset();
  }

  onSubmit(): void {
    if (this.orderLineForm.valid) {
      //prepare data
      this.newOrderLine = new OrderLine();
      this.newOrderLine.orderId = this.orderId;
      this.newOrderLine.productId = +this.orderLineForm.controls.product.value;
      this.newOrderLine.orderQty = +this.orderLineForm.get('orderQty').value;
      this.newOrderLine.unitPrice = +this.orderLineForm.get('price').value;
      //post to rest data service
      this.dataStorageService.postOrderLine(this.newOrderLine).subscribe(orderline => this.orderLines.push(orderline));
      //reset form and clean new orderline object
      this.orderLineForm.reset();
      this.newOrderLine = new OrderLine();
    }
  }
}
