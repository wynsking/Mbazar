import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {AdvertService} from '../../services/advert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {UploadFileService} from '../../services/upload-file.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Advert} from '../../models/advert';
import {MatTableDataSource} from '@angular/material';
import {Category} from '../../models/category';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-advert-form',
  templateUrl: './advert-form.component.html',
  styleUrls: ['./advert-form.component.css']
})
export class AdvertFormComponent implements OnInit {
  advertForm: FormGroup;
  categories: Category [];
  cat;
  advert: Advert;
  id;
  adv;
  user$;
  user: User;
  selectedFiles: FileList;
  currentFileUpload: Advert;
  progress: { percentage: number } = {percentage: 0};

  constructor(
    private categoryService: CategoryService,
    private advertService: AdvertService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private uploadService: UploadFileService,
    private formBuilder: FormBuilder) {
    this.auth.user$.subscribe(
      user => {
        this.user$ = user;
        this.user = this.user$;
      }
    )
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

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.advertService.get(this.id).valueChanges().pipe(take(1))
        .subscribe(a => {
            this.adv = a;
            this.advert = this.adv;
          }
        );
    }
  }

  initForm() {
    this.advertForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.email]],
        price: ['', [Validators.required, Validators.min(0)]],
        category: ['', Validators.required],
        imageURL: ['', Validators.required]
      }
    );

  }

  upload(title: string, description: string, price: string, categoryTitle: string) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new Advert(file);
    this.advertService.pushFileToStorage(this.currentFileUpload, this.progress, title, description, price, categoryTitle, this.user.email);
  }

  save() {
    if (this.id) {
      this.advertService.update(this.id, this.advert);
    } else {
      const title$ = this.advertForm.get('title').value;
      const description$ = this.advertForm.get('description').value;
      const price$ = this.advertForm.get('price').value;
      const categoryTitle = this.advertForm.get('category').value;
      this.upload(title$, description$, price$, categoryTitle);
    }
    this.router.navigate(['/admin/adverts']);
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('format invalide!');
    }
  }

  ngOnInit() {
    this.initForm();
  }
}
