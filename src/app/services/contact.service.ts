import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private db: AngularFireDatabase) { }

  createContact(advert) {
    return this.db.list('/contact').push(advert);
  }
}
