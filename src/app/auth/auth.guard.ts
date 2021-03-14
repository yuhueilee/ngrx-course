import { AuthState } from './reducers/index';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { isLoggedIn } from './auth.selectors';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private store: Store<AuthState>,
        private router: Router) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> {
        return this.store
            .pipe(
                select(isLoggedIn),
                // side effect
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/login');
                    }
                })
            )
    }
}