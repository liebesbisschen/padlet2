import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PadletFactory} from "../shared/padlet-factory";
import {Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})
export class PadletFormComponent implements OnInit{

  padletForm: FormGroup;
  padlet : Padlet = PadletFactory.empty();
  errors: {[key: string]:string} = {};
  isUpdatingPadlet = false;
  entries: FormArray;


  constructor (
      private fb: FormBuilder,
      private ps: PadletStoreService,
      private route: ActivatedRoute,
      private router: Router
  ) {
      this.padletForm = this.fb.group({});
      this.entries = this.fb.array([]);
  }

  ngOnInit() : void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingPadlet = true;
      this.ps.getSingle(id).subscribe(
        padlet => {
          this.padlet = padlet;
          this.initPadlet();
        }
      );

    }
    this.initPadlet();
  }

  initPadlet() {
    this.buildEntriesArray();
    this.padletForm = this.fb.group ({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      entries: this.entries,
      is_public: [Boolean(this.padlet.is_public)],
      //published: this.padlet.published
    });

    this.padletForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  buildEntriesArray() {
    if (this.padlet.entries) {
      this.entries = this.fb.array([]);
      for (let entry of this.padlet.entries) {
        let fg = this.fb.group({
          entryid: new FormControl(entry.id),
          entrytitle: new FormControl(entry.title),
          entrycontent: new FormControl(entry.content)
        });
        this.entries.push(fg);
      }
    }
  }

  addEntryControl() {
    this.entries.push(this.fb.group({ id: 0, title: null, content:null}))
  }


  updateErrorMessages() {
    console.log("Is form invalid? " + this.padletForm.invalid);
    this.errors = {};

    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
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

  submitForm() {
    this.padletForm.value.entries = this.padletForm.value.entries.filter(
      (entry: { title: string}) => entry.title
    );

    const padlet: Padlet = PadletFactory.fromObject (this.padletForm.value);
    padlet.entries = this.padlet.entries;

    if (this.isUpdatingPadlet) {
      this.ps.update(padlet).subscribe(res => {
        this.router.navigate(["../../padlets", padlet.id], {
          relativeTo: this.route
        });
      });

    } else {
      padlet.user_id = parseInt(sessionStorage.getItem("userId") ?? '0', 10);
      console.log (padlet);
      this.ps.create(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../padlets"], {
          relativeTo: this.route
        });
      });
    }
}}
