import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {User} from '../models/user';
import {auth} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  errorMessage: string;

  constructor(private userService: UserService,
              private afAuth: AngularFireAuth,
              private router: Router,
              private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  loginWithGoogle() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginWithEmailAndPassword(_email: string, _password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(_email, _password).then( () => {
      this.router.navigate(['/']);
    }
  );
  }

  logout() {
    this.afAuth.auth.signOut().then(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  get appUser$(): Observable<User> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      }));
  }

  createNewUser(email: string, password: string, newUser: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            firebase.auth().onAuthStateChanged(
              (user) => {
                if (user) {
                  newUser.uid = user.uid;
                  newUser.emailVerified = user.emailVerified;
                  user.sendEmailVerification().then(
                    () => {

                      this.router.navigate(['/goToConfirmYourRegistration']);
                      console.log(newUser.displayName);
                    }
                  );
                  this.userService.save(newUser);
                }
              },
            );
            resolve();
          }, (error) => {
            this.errorMessage = error;
            reject(error);
          }
        );
      }
    );
  }
}
