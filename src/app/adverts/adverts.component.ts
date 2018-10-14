import {Component, Input, OnInit} from '@angular/core';
import {AdvertService} from '../services/advert.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../services/category.service';
import {map} from 'rxjs/operators';
import {Advert} from '../models/advert';
import {Category} from '../models/category';
import * as _ from 'lodash';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.css']
})
export class AdvertsComponent implements OnInit {
  adverts: Advert[];
  filteredAdverts: Advert[];
  adv;
  cat
  categories: Category [];
  category: string;
  /// Active filter rules
  filters = {}

  constructor(
    private route: ActivatedRoute,
    private advertService: AdvertService,
    private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.advertService.getAll().subscribe(adverts => {
      const array = adverts.map(item => {
        return {
          key: item.key,
          ...item.payload.val()
        };
      });
      this.adv = array;
      this.adverts = this.adv;
      this.applyFilters();
    });
    this.categoryService.getCategories().subscribe( categories => {
      const array = categories.map( itemCat => {
        return {
          key: itemCat.key,
          ...itemCat.payload.val()
        };
      });
      this.cat = array;
      this.categories = this.cat;
    });
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
    });
  }

  private applyFilters() {
    this.filteredAdverts = _.filter(this.adverts, _.conforms(this.filters));
  }
  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val === rule;
    this.applyFilters();
  }
}
