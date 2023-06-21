import {Component, OnInit} from '@angular/core';
import {EntryFormErrorMessages} from "./entry-form-error-messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntryFactory} from "../shared/entry-factory";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../shared/entry";
import {UserFactory} from "../shared/user-factory";


@Component({
  selector: 'a.bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: []
})
export class EntryFormComponent implements OnInit {

  entryForm: FormGroup;
  entry = EntryFactory.empty();
  user = UserFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingEntry = false;

  constructor(
    private fb: FormBuilder,
    private ps: PadletStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({});
  }

  ngOnInit() {
    //PadletID und EntryID abspeichern
    this.entry.padlet_id = this.route.snapshot.params['padlet_id'];
    this.entry.id = this.route.snapshot.params['entry_id']
    this.entry.created_at = new Date();

    if (this.entry.padlet_id && this.entry.id) {
      this.isUpdatingEntry = true;
      this.ps.findEntryByPadletId(this.entry.padlet_id, this.entry.id).subscribe(entry => {
        this.entry = entry;
        this.initEntry();
      });
    }

    this.initEntry();
  }

  initEntry() {
    this.entryForm = this.fb.group({
      id: this.entry.id,
      padlet_id: this.entry.padlet_id,
      title: [this.entry.title, Validators.required],
      content: [this.entry.title, Validators.required],
      created_at: this.entry.created_at,
      user: this.entry.user

    });
    this.entryForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  submitForm() {
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);
    console.log(this.entryForm.value)
    entry.user_id = this.entry.user_id;
    entry.padlet_id = this.entry.padlet_id;

    if (this.isUpdatingEntry) {
      this.ps.updateEntry(entry.padlet_id, entry.id, entry).subscribe(res => {
        this.router.navigate(["../padlets/", entry.padlet_id], {
          relativeTo: this.route
        });
      });
    } else {
      entry.user_id = this.getCurrentUserId();
      entry.padlet_id = this.entry.padlet_id;
      entry.id = this.entry.id,

        this.ps.createEntry(entry.padlet_id, entry).subscribe(res => {
          this.entry = EntryFactory.empty();

          this.entryForm.reset(EntryFactory.empty());
          this.router.navigate(["../../../../padlets/", entry.padlet_id], {
            relativeTo: this.route
          });
        });
    }
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  updateErrorMessages() {
    console.log("Is form invalid? " + this.entryForm.invalid);
    this.errors = {};

    for (const message of EntryFormErrorMessages) {
      const control = this.entryForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }

  }
}
