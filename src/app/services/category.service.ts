import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {UploadFileService} from './upload-file.service';
import {FileUpload} from '../models/file-upload';
import {number} from 'ng2-validation/dist/number';
import * as firebase from 'firebase';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  progress: { percentage: number } = {percentage: 0};
  private basePath = '/categories';
  constructor(private db: AngularFireDatabase, private uploadFileService: UploadFileService ) { }

  getCategories() {
    return this.db.list('/categories', ref  => ref.orderByChild('timestamp')).snapshotChanges();
  }
  getFileUploads(numberItems): AngularFireList<Category> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
  getCategory(advertId) {
    return this.db.object('/categories/' + advertId);
  }
  update(categoryId, category) {
    this.db.object('/categories/' + categoryId).update(category);
  }

  pushFileToStorage(category: Category, progress: { percentage: number }, categoryName: string) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${category.file.name}`).put(category.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          //console.log('File available at', downloadURL);
          category.url = downloadURL;
          category.title = categoryName;
          this.saveFileData(category);
        });
      }
    );
  }

  private saveFileData(category: Category) {
    const timestamp = firebase.database.ServerValue.TIMESTAMP.toString();
    category.timestamp = timestamp;
    this.db.list(`${this.basePath}/`).push(category);
  }

  deleteCategory(category: Category) {
    this.deleteFileDatabase(category.key)
      .then(() => {
        this.deleteFileStorage(category.file.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
