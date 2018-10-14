import {Injectable} from '@angular/core';
import {AngularFireAction, AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Advert} from '../models/advert';
import {take} from 'rxjs/operators';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {ShoppingCart} from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart():Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreatedCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, advertId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + advertId);
  }

  private removeItem(cartId: string, advertId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + advertId).remove();
  }

  private async getOrCreatedCartId():Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(advert: Advert) {
    let cartId = await this.getOrCreatedCartId();
    let item$ = this.getItem(cartId, advert.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.update({advert: advert, quantity: (0) + 1});
    });
  }
  async removeFromCart(advert: Advert) {
    let cartId = await this.getOrCreatedCartId();
    this.removeItem(cartId, advert.key);
  }
}
