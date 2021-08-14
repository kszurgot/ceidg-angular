import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CeidgFormComponent } from './components/ceidg-form/ceidg-form.component';
import { NipValidatorDirective } from './shared/nip.directive';
import { RegonValidatorDirective } from './shared/regon.directive';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { AddressPipe } from './shared/address.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CeidgFormComponent,
    NipValidatorDirective,
    RegonValidatorDirective,
    CompaniesListComponent,
    LoadingComponent,
    ErrorModalComponent,
    AddressPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
