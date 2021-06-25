import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataStorageService } from '../../service/data-storage.service';


@Injectable()
export class OrderDetailCanActivateGuard implements CanActivate {

    constructor(private dataStorageService: DataStorageService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const id = +route.paramMap.get('id');
        return this.dataStorageService.getOrders().pipe(map(data => {
            if (data.filter(c => c.id == id).length > 0) {
                return true;
            }
            else {
                this.router.navigate(['notfound']);
                return false;
            }
        }));
        
    }
}