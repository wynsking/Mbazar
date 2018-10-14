import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {UploadFileService} from '../services/upload-file.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrls: ['./category-choice.component.css']
})
export class CategoryChoiceComponent implements OnInit {
  cat;
  categories;
  fileUploads: any[];

  constructor(private categoryService: CategoryService, private uploadService: UploadFileService) {
    this.categoryService.getCategories().subscribe(categories => {
      const array = categories.map(itemCat => {
        return {
          key: itemCat.key,
          ...itemCat.payload.val()
        };
      });
      this.cat = array;
      this.categories = this.cat;
    });
  }

  ngOnInit() {
    this.uploadService.getFileUploads(8).snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }
}
