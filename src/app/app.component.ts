import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user$;
  constructor (private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe( user => {
      this.user$ = user;
      if (!user) return;

      userService.save(this.user$);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    });
  }
}
