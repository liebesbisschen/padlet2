//liegt über allen anderen components
import {Component} from '@angular/core';
import {Padlet} from "./shared/padlet";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  padlet: Padlet | undefined;

  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }
  isLoggedOut() : boolean {
    return this.authService.isLoggedOut();
  }

  getLoginLabel() :string {
    return this.isLoggedIn() ? "Logout" : "Login";
  }




}
