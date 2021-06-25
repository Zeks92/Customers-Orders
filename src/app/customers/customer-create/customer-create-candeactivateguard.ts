import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CustomerCreateComponent } from './customer-create.component';


@Injectable()
export class CustomerCreateCanDeactivateGuard implements CanDeactivate<CustomerCreateComponent> {
    canDeactivate(component: CustomerCreateComponent): boolean {
        if (component.customerCreateForm.dirty) {
            return confirm("Are you sure you want discard the changes?");
        }
        return true;        
    } 
}

