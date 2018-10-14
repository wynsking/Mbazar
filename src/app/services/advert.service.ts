import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Category} from '../models/category';
import * as firebase from 'firebase';
import {Advert} from '../models/advert';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private basePath = '/adverts';
  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/adverts', ref => ref.orderByChild('categoryTitle')).snapshotChanges();
  }
  get(advertId) {
    return this.db.object('/adverts/' + advertId);
  }

  update(advertId, advert) {
    this.db.object('/adverts/' + advertId).update(advert);
  }

  pushFileToStorage(advert: Advert, progress: { percentage: number }, advertTitle: string,
                    advertDescription: string, advertPrice: string, advertCategoryTitle: string, userEmail: string) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${advert.file.name}`).put(advert.file);

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
          advert.url = downloadURL;
          advert.title = advertTitle;
          advert.description = advertDescription;
          advert.price = advertPrice;
          advert.categoryTitle = advertCategoryTitle;
          advert.userEmail = userEmail;
          this.saveFileData(advert);
        });
      }
    );
  }

  private saveFileData(advert: Advert) {
    this.db.list(`${this.basePath}/`).push(advert);
  }

  delete(advert: Advert) {
    this.deleteFileDatabase(advert.key)
      .then(() => {
        this.deleteFileStorage(advert.file.name);
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
