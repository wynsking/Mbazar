import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdvertService} from '../../services/advert.service';
import {Subscription} from 'rxjs';
import {Advert} from '../../models/advert';
import {MatPaginator, MatSort, MatTableDataSource, MatIconRegistry} from '@angular/material';
import { ViewChild } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Category} from '../../models/category';



@Component({
  selector: 'app-admin-adverts',
  templateUrl: './admin-adverts.component.html',
  styleUrls: ['./admin-adverts.component.css']
})
export class AdminAdvertsComponent implements OnInit, OnDestroy {
  adverts: Advert[];
  adv;
  displayedColumns: string[] = ['Titre', 'Description', 'Prix', 'actions'];
  dataSource: MatTableDataSource<Advert>;

  advert = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private advertService: AdvertService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) {
    iconRegistry.addSvgIcon(
      'baseline-edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/baseline-edit-24px.svg'));
  }

  ngOnInit() {
    this.advertService.getAll().subscribe( adverts => {
        const array = adverts.map( item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });
        this.adv = array;
        this.adverts = this.adv;
        this.dataSource = new MatTableDataSource(this.adverts);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(advert: Advert) {
    if (confirm('Êtes-vous sur de vouloir supprimer cette annonce?')) {
      this.advertService.delete(advert);
      this.router.navigate(['/admin/adverts']);
    }
  }



 /* sortAdverts(sort: Sort) {
    const data = this.adverts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAdverts = data;
      return;
    }

    this.sortedAdverts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Title': return compare(a.title, b.title, isAsc);
        case 'Description': return compare(a.description, b.description, isAsc);
        case 'Price': return compare(a.price, b.price, isAsc);
        default: return 0;
      }
    });
  }*/



  ngOnDestroy() {

  }

}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
