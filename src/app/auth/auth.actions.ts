import { User } from './model/user.model';
import { createAction, props } from "@ngrx/store";

/*
'[<source of the action>] <event of the action>':
sepcify the component that is going to dispatch the action
to ensure no other component dispatch the same action
'props<type of the payload associated to the action>'
**/
export const login = createAction(
    '[Login Page] User Login',
    props<{user: User}>()
);

export const logout = createAction(
    '[Top Menu] User Logout'
);