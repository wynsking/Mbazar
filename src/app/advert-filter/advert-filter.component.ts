import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../models/category';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'advert-filter',
  templateUrl: './advert-filter.component.html',
  styleUrls: ['./advert-filter.component.css']
})
export class AdvertFilterComponent implements OnInit {
  categories: Category [];
  cat;
  @Input('category') category;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
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
  }

}
