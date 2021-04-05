import { areCoursesLoaded } from './../courses.selectors';
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { compareCourses, Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean // to check that the courses have been loaded into the store
}

// export interface CoursesState {
//     entities: {
//         [key: number]: Course
//     },
//     ids: number[] // defines the natural entities order
// } 

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // selectId: course => course.courseId // specify the custom unique identifier for each entity
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, 
        (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true}))
);

export const {
    selectAll
} = adapter.getSelectors();