import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../model/customer.model';
import { DataStorageService } from '../../service/data-storage.service';


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {
  @ViewChild('customerForm')
  public customerCreateForm: NgForm;
  customer: Customer = new Customer();
  constructor(private router: Router, private dataStorageService: DataStorageService) {}

  public save(customer: Customer) {
    this.dataStorageService.postCustomer(customer).subscribe((customer: Customer) => {
      alert(`${customer.firstName} ${customer.lastName} has been added as a new customer.`);
      this.customerCreateForm.reset();
      this.router.navigate(['customers']);
    });


  }
}
