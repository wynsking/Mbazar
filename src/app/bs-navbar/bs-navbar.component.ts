import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AppUser} from '../models/app-user';
import {CategoryService} from '../services/category.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {User} from '../models/user';
import * as firebase from 'firebase';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  user: User;
  categories;
  cat;
  use;
  isAuth: boolean;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService,
              private categoryService: CategoryService,
              private shoppingCartService: ShoppingCartService,
              public afAuth: AngularFireAuth) {
    auth.user$.subscribe(user => {
      this.use = user;
      this.user = this.use;
    });
    this.categoryService.getCategories().subscribe(categories => {
      const array = categories.map(itemCat => {
        return {
          key: itemCat.key,
          ...itemCat.payload.val()
        };
      });
      this.cat = array;
      this.categories = this.cat;
    });
  }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          if (user.emailVerified) {
            this.isAuth = true;
          } else {
            this.isAuth = false;
          }
        }
      }
    );
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let advertId in cart) {
        this.shoppingCartItemCount++;
      }
    });
  }

  onLogout() {
    this.auth.logout();
    this.isAuth = false;
  }
}
