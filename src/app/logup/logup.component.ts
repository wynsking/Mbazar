import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';
import {User} from '../models/user';
import {isString} from 'util';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {

  logupForm: FormGroup;
  errorMessage: string;


  constructor(private auth: AuthService,
              private formBuilder: FormBuilder) {
  }

  initForm() {
    this.logupForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const firstname = this.logupForm.get('firstname').value;
    const lastname = this.logupForm.get('lastname').value;
    const displayName = firstname + ' ' + lastname;
    const email = this.logupForm.get('email').value;
    const password = this.logupForm.get('password').value;
    const newUser = new User(email, password);
    newUser.displayName = displayName;

    this.auth.createNewUser(email, password, newUser);
  }

}
