import {URL} from "url";
import {Timestamp} from 'rxjs';

export class Category {
  key: string;
  title: string;
  url: URL;
  file: File;
  timestamp: string;
  constructor(file: File) {
    this.file = file;
  }
}
