import {Component, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit{
  padlets: Padlet[] = [];
  constructor(private ps: PadletStoreService) {
  }
  ngOnInit(): void {
    //PadletArray wird asynchron befüllt
    this.ps.getAll().subscribe(res => this.padlets = res);
  }

}
