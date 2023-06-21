import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Entry, Padlet, Rating, User} from '../shared/padlet';
import {ActivatedRoute, Router} from "@angular/router";
import {PadletStoreService} from '../shared/padlet-store.service';
import {PadletFactory} from "../shared/padlet-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {Observable} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {UserFactory} from "../shared/user-factory";


@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: []
})
export class PadletDetailsComponent {
  padlet: Padlet = PadletFactory.empty();
  entries: Entry [] = [];

  user: User = UserFactory.empty();


  constructor(private ps: PadletStoreService, private route: ActivatedRoute,
              private router: Router, private toastr: ToastrService,
              public authService: AuthenticationService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSingle(params['id']).subscribe((p: Padlet) => {
      this.padlet = p;
      //this.entries = this.padlet.entries;
      //this.user_id = this.padlet.user_id;
      this.getRatingsByEntry();
      //this.getComments();
      }
    );

  }

  getRating(num: number) {
    return new Array(num);
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }


  removePadlet() {
    if (confirm('Padlet wirklich löschen?')) {
      this.ps.remove(this.padlet.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo: this.route
        }));
      this.toastr.success(`Padlet gelöscht`);
    }

  }

  removeEntry(id: number) {
    if (confirm('Entry wirklich löschen?')) {
      this.ps.removeEntry(id).subscribe((res: any) => this.router.navigate(['/padlets/' + this.padlet.id], {
        relativeTo: this.route
      }));
    }
    this.toastr.success(`Entry gelöscht`);
  }



  getRatingsByEntry(): void {
    for (let entry of this.entries) {
      this.ps.getRatingsByEntry(entry.id).subscribe((res: Rating[]) => {
        entry.ratings = res;
      })
    }
  }


 /* getComments(): void {
    for (let entry of this.entries) {
      this.ps.getCommentsByEntry(entry.id).subscribe((res: Comment[]) => {
        entry.comments = res;
      });
    }
  }*/
}
