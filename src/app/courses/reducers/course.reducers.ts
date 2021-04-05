import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { compareCourses, Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {

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

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, 
        (state, action) => adapter.addAll(action.courses, state))
);

export const {
    selectAll
} = adapter.getSelectors();