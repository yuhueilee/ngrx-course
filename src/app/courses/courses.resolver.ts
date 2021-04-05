import { areCoursesLoaded } from './courses.selectors';
import { select } from '@ngrx/store';
import { loadAllCourses } from './courses.actions';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { filter, finalize, first, tap } from 'rxjs/operators';


@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false; // to prevent action being dispatched multiple times.

    constructor(private store: Store<AppState>) {}

    resolve(
        route: ActivatedRouteSnapshot, // snapshot of current activated route ie. url
        state: RouterStateSnapshot, // snapshot of the query params
    ): Observable<any> {
        return this.store.pipe(
            select(areCoursesLoaded),
            tap(coursesLoaded => {
                if (!this.loading && !coursesLoaded) {
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            filter(coursesLoaded => coursesLoaded),
            first(), // to ensure the observable emits a value
            finalize(() => this.loading = false) // reset the flag's value
        )
    }
}