import { loadAllCourses } from './course.actions';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { finalize, first, tap } from 'rxjs/operators';


@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false; // to prevent action being dispatched multiple times.

    constructor(private store: Store<AppState>) {}

    resolve(
        route: ActivatedRouteSnapshot, // snapshot of current activated route ie. url
        state: RouterStateSnapshot, // snapshot of the query params
    ): Observable<any> {
        return this.store.pipe(
            tap(() => {
                if (!this.loading) {
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            first(), // to ensure the observable emits a value
            finalize(() => this.loading = false) // reset the flag's value
        )
    }
}