import { filter, tap, first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { CourseEntityService } from './course-entity.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";


@Injectable()
export class CoursesResolver implements Resolve<boolean> {

    constructor(private coursesService: CourseEntityService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.coursesService.loaded$.pipe(
            tap(loaded => { // perform side effect
                if (!loaded) { // to ensure the api is being called ONCE
                    this.coursesService.getAll();
                }
            }),
            filter(loaded => !!loaded), // ensure we wait for the data to be loaded in store
            first() // to complete the observable and ensure the transition goes through
        );
    }
}