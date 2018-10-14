import {URL} from 'url';

export class FileUpload {
  key: string;
  name: string;
  url: URL;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}
