import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {AppUser} from '../models/app-user';
import {User} from '../models/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  errorMessage: string;
  constructor(private db: AngularFireDatabase) {
  }

  save(user: User) {
    this.db.object('/users/' + user.uid).set(
      {
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.displayName
      }
    );
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
