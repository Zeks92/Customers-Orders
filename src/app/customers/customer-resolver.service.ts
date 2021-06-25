import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { Customer } from '../model/customer.model';

@Injectable()
export class CustomerResolverService implements Resolve<Customer[]> {
    constructor(private dataStorageService: DataStorageService) { 
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.dataStorageService.getCustomers();
    }
}