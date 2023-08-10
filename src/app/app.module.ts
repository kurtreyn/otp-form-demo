import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { OtpInputComponent } from './components/otp-input/otp-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OtpFormComponent,
    OtpInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
