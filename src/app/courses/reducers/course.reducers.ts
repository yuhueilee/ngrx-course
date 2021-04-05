import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {

}

// export interface CoursesState {
//     entities: {
//         [key: number]: Course
//     },
//     ids: number[] // defines the natural entities order
// } 

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, 
        (state, action) => adapter.addAll(action.courses, state))
);

export const {
    selectAll
} = adapter.getSelectors();