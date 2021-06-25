import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Order } from '../model/order.model';
import { DataStorageService } from '../service/data-storage.service';

@Injectable()
export class OrdersResolverService implements Resolve<Order[]> {
    constructor(private dataStorageService: DataStorageService) { 
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.dataStorageService.getOrders();      
    }
}