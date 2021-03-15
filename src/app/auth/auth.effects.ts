import { Router } from '@angular/router';
import { User } from './model/user.model';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

    // side note: stop the angular cli if developing effect

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.login), // similar to filter the type
            tap(action => localStorage
                    .setItem('user', JSON.stringify(action.user))
            )
        )
    , {dispatch: false} // to indicate that this effect does not result in a dispatch of action
    );

    logout$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.logout), // similar to filter the type
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            })
        )
    , {dispatch: false} // to indicate that this effect does not result in a dispatch of action
    );

    constructor(private actions$: Actions,
        private router: Router) {
    }

}