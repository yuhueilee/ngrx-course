import { login } from './../auth.actions';
import { AppState } from './../../reducers/index';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;
    this.auth.login(val.email, val.password)
      .pipe(
        // tap: to create side effect to store the user profile and navigate to the course page.
        tap(user => {
          console.log(user);
          // save user profile inside the store
          const newLoginAction = login({user: user});
          console.log('New Login Action:', newLoginAction);
          // dispatch: to modify the state in the store
          this.store.dispatch(
            // action always has a type and a payload (optional)
            newLoginAction
          );
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        err => {
          alert('Login Failed');
        }
      );

  }

}

