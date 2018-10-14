import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {BsNavbarComponent} from './bs-navbar/bs-navbar.component';
import {HomeComponent} from './home/home.component';
import {AdvertsComponent} from './adverts/adverts.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {MyAdvertsComponent} from './my-adverts/my-adverts.component';
import {AdminAdvertsComponent} from './admin/admin-adverts/admin-adverts.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {LoginComponent} from './login/login.component';
import {AdvertFormComponent} from './admin/advert-form/advert-form.component';

import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {AdminAuthGuard} from './services/admin-auth-guard.service';
import {CategoryService} from './services/category.service';
import {AdvertService} from './services/advert.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {ContactFormComponent} from './contact-form/contact-form.component';
import {ContactService} from './services/contact.service';
import {DialogContactComponent} from './contact-form/dialog-contact/dialog-contact.component';
import {LogupComponent} from './logup/logup.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {HttpClientModule} from '@angular/common/http';
import {ShowEmailVerificationComponent} from './show-email-verification/show-email-verification.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import { CategoryChoiceComponent } from './category-choice/category-choice.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { AdvertFilterComponent } from './advert-filter/advert-filter.component';
import { AdvertCardComponent } from './advert-card/advert-card.component';
import {ShoppingCartService} from './services/shopping-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AdvertsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyAdvertsComponent,
    AdminAdvertsComponent,
    AdminOrdersComponent,
    LoginComponent,
    AdvertFormComponent,
    ContactFormComponent,
    DialogContactComponent,
    LogupComponent,
    ResetPasswordComponent,
    ShowEmailVerificationComponent,
    AdminUsersComponent,
    CategoryChoiceComponent,
    AdminCategoriesComponent,
    AboutUsComponent,
    CategoryFormComponent,
    AdvertFilterComponent,
    AdvertCardComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxPaginationModule,
    OrderModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    CustomFormsModule,
    RouterModule.forRoot([

      {path: '', component: HomeComponent},
      {path: 'contact', component: ContactFormComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'logup', component: LogupComponent},
      {path: 'goToConfirmYourRegistration', component: ShowEmailVerificationComponent},
      {path: 'resetPassword', component: ResetPasswordComponent},

      {path: 'aboutUs', component: AboutUsComponent},

      {path: 'check-out', component: CheckOutComponent, canActivate: []},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: []},
      {path: 'my/adverts', component: MyAdvertsComponent, canActivate: []},

      {
        path: 'user/category-choice',
        component: CategoryChoiceComponent,
        canActivate: []
      },

      {
        path: 'admin/adverts',
        component: AdminAdvertsComponent,
        canActivate: []
      },
      {
        path: 'admin/adverts/new',
        component: AdvertFormComponent,
        canActivate: []
      },
      {
        path: 'admin/adverts/:id',
        component: AdvertFormComponent,
        canActivate: []
      },
      {
        path: 'admin/categories',
        component: AdminCategoriesComponent,
        canActivate: []
      },
      {
        path: 'admin/categories/new',
        component: CategoryFormComponent,
        canActivate: []
      },
      {
        path: 'admin/categories/:id',
        component: CategoryFormComponent,
        canActivate: []
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: []
      },
      {
        path: 'admin/users',
        component: AdminUsersComponent,
        canActivate: []
      },
    ]),
    BrowserAnimationsModule
  ],
  entryComponents: [DialogContactComponent],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    AdvertService,
    ContactService,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
