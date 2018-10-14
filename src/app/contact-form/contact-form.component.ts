import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {ContactService} from '../services/contact.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogContactComponent} from './dialog-contact/dialog-contact.component';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact = {};
  fileNameDialogRef: MatDialogRef<DialogContactComponent>;

  constructor(
    public dialog: MatDialog,
    private contactService: ContactService,
    private router: Router) {

  }
  save(contact) {
    this.contactService.createContact(contact);
    this.router.navigate(['/']);
  }

  openDialog() {
    this.fileNameDialogRef = this.dialog.open(DialogContactComponent);
  }

  ngOnInit() {
  }
}
