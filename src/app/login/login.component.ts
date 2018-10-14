import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {email} from 'ng2-validation/dist/email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
  }

  initForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
  }

  onSubmit() {
    const email$ = this.loginForm.get('email').value;
    const password$ = this.loginForm.get('password').value;
    this.loginWithEmailAndPassword(email$, password$);
  }

  ngOnInit() {
    this.initForm();
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  loginWithEmailAndPassword( _email: string, _password: string) {
    this.auth.loginWithEmailAndPassword(_email, _password);
  }

}
