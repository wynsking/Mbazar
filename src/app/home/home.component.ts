import {Component, OnInit, ViewChild} from '@angular/core';
import {AdvertService} from '../services/advert.service';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../models/category';
import {Advert} from '../models/advert';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adverts: Advert[] = [];
  adv;
  category: string = '';
  isColored: boolean = false;
  displayedColumns: string[] = ['photo', 'title', 'description', 'price','actions'];
  dataSource: MatTableDataSource<Advert>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private advertService: AdvertService) {

  }

  ngOnInit() {
    this.advertService.getAll().pipe(switchMap(adverts => {
      const array = adverts.map(item => {
        return {
          key: item.key,
          ...item.payload.val()
        };
      });
      this.adv = array;
      this.adverts = this.adv;

      return this.route.queryParamMap;
    }))
      .subscribe(params => {
        this.category = params.get('category');
        this.dataSource = this.category ? new MatTableDataSource(
          this.adverts.filter(cate => cate.categoryTitle === this.category)
        ) : new MatTableDataSource(
          this.adverts
        );
        this.dataSource.paginator = this.paginator;
      });
  }
  applyFilter(filterValue: string) {
    if(filterValue && filterValue !== '') {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
