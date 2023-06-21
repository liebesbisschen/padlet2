import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import { PadletListItemComponent } from './padlet-list-item/padlet-list-item.component';
import { PadletDetailsComponent } from './padlet-details/padlet-details.component';
import {PadletStoreService} from "./shared/padlet-store.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { PadletFormComponent } from './padlet-form/padlet-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EntryFormComponent } from './entry-form/entry-form.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailsComponent,
    HomeComponent,
    PadletFormComponent,
    EntryFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule,
    ToastrModule.forRoot(), ReactiveFormsModule
  ],
  providers: [PadletStoreService, AuthenticationService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
