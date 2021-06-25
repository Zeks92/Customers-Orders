import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/customer.model';


@Component({
  selector: 'app-customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.css']
})
export class CustomerDisplayComponent implements OnInit {
  @Input()
  customer: Customer;
  id: number = 0;

  constructor(private route: ActivatedRoute) {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = +this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit() {}
}
