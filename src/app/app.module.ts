import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { OtpInputComponent } from './components/otp-input/otp-input.component';
import { FormComponent } from './components/form/form.component';
import { MultistepFormComponent } from './components/multistep-form/multistep-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OtpInputComponent,
    FormComponent,
    MultistepFormComponent
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
