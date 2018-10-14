import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UploadFileService} from '../../services/upload-file.service';
import {take} from 'rxjs/operators';
import {FileUpload} from '../../models/file-upload';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: Category;
  progress: { percentage: number } = {percentage: 0};
  categories: any [];
  cat;
  category: Category;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private uploadService: UploadFileService,
              private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {this.categoryService.getCategory(id).valueChanges().pipe(take(1)).subscribe(
      c => {
        this.cat = c;
        this.category = this.cat;
      }
    )}
  }

  save(category) {
    this.upload(category.title);
    this.router.navigate(['/admin/categories']);
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
      }
    );
  }

  upload(name: string) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new Category(file);
    this.categoryService.pushFileToStorage(this.currentFileUpload, this.progress, name);
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

}
