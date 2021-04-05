import { createSelector } from '@ngrx/store';
import { CoursesState } from './reducers/course.reducers';
import { createFeatureSelector } from '@ngrx/store';

import * as fromCourses from './reducers/course.reducers';

export const selectCoursesState = 
    createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
    selectCoursesState,
    // state => state.entities
    fromCourses.selectAll // return all entities order by the natural order of ids
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);