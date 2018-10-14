import {Component, Input, OnInit} from '@angular/core';
import {Advert} from '../models/advert';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'advert-card',
  templateUrl: './advert-card.component.html',
  styleUrls: ['./advert-card.component.css']
})
export class AdvertCardComponent implements OnInit {
@Input('advert') advert: Advert;
@Input('shopping-cart') shoppingCart;
  shoppingCartItemCount: number;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let advertId in cart) {
        this.shoppingCartItemCount ++;
      }
    });
  }

  addToCart(advert: Advert) {
    this.shoppingCartService.addToCart(advert);
  }
  removeFromCart$(advert: Advert) {
    this.shoppingCartService.removeFromCart(advert);
    this.shoppingCartItemCount--;
  }

}
