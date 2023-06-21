import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Entry, Padlet, User} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {AuthenticationService} from "../shared/authentication.service";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
  }
}


@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})


export class PadletListComponent implements OnInit{
  padlets: Padlet[] = [];
  constructor(private ps: PadletStoreService,
              public authService: AuthenticationService) {
  }
  ngOnInit(): void {
    //PadletArray wird asynchron befüllt
    this.ps.getAll().subscribe(res => this.padlets = res);
  }


  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


}
