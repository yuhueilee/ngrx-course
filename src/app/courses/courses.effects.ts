import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-types";


@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => // concatMap: to ensure only one request is being sent to the backend
                this.coursesHttpService.findAllCourses()),
            map(courses => CourseActions.allCoursesLoaded({courses}))
        )
    );

    saveCourse$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.courseUpdated),
            concatMap(action => this.coursesHttpService.saveCourse(
                action.update.id,
                action.update.changes
            )),
        ),
        {dispatch: false} // if it's not resolving in a new action
    );

    constructor(private actions$: Actions,
        private coursesHttpService: CoursesHttpService) {}
}