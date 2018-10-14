import {Component, OnInit, ViewChild} from '@angular/core';
import {Advert} from '../../models/advert';
import {MatIconRegistry, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Advert[];
  cat;
  displayedColumns: string[] = ['name','photo', 'actions'];
  dataSource: MatTableDataSource<Advert>;

  category = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private iconRegistry: MatIconRegistry) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe( categories => {
        const array = categories.map( item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });
        this.cat = array;
        this.categories = this.cat;
        this.dataSource = new MatTableDataSource(this.categories);

        this.dataSource.paginator = this.paginator;
      }
    );
    this.iconRegistry.addSvgIcon(
      'add-square-button',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/add-square-button.svg'));
    this.iconRegistry.addSvgIcon(
      'pencil',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/pencil.svg')
    );
    this.iconRegistry.addSvgIcon(
      'recycle-bin',
      this.sanitizer.bypassSecurityTrustResourceUrl('asset/img/recycle-bin.svg')
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(category: Category) {
    if (confirm('Êtes-vous sur de vouloir supprimer cette catégorie?')) {
      this.categoryService.deleteCategory(category);
      this.router.navigate(['/admin/categories']);
    }
  }
}
