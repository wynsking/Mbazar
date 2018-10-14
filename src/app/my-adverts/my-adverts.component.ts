import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {MatTableDataSource} from '@angular/material';
import {AdvertService} from '../services/advert.service';
import {Advert} from '../models/advert';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-adverts',
  templateUrl: './my-adverts.component.html',
  styleUrls: ['./my-adverts.component.css']
})
export class MyAdvertsComponent implements OnInit {
  user$: any = '';
  user: User;
  adv;
  adverts: Advert [];
  filteredAdverts: Advert [] = [];
  constructor(private auth: AuthService, private advertService: AdvertService) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      user => {
        this.user$ = user;
        this.user = this.user$;
        this.advertService.getAll().subscribe( adverts => {
            const array = adverts.map( item => {
              return {
                key: item.key,
                ...item.payload.val()
              };
            });
            this.adv = array;
            this.adverts = this.adv;
            this.filteredAdverts = this.adverts.filter(user => user.userEmail === this.user.email);
          }
        );
      }
    )
  }
}
