import {URL} from "url";
import {Category} from './category';

export class Advert {
  key: string;
  title: string;
  description: string;
  price: string;
  categoryTitle: string;
  url: URL;
  file: File;
  isColored: boolean;
  userEmail: string;
  constructor(file: File) {
    this.file = file;
  }
}
