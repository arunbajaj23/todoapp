import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './login/signin/signin.component';
import { SingupComponent } from './login/singup/singup.component';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddtaskComponent } from './home/addtask/addtask.component';
import { UpdatetaskComponent } from './home/updatetask/updatetask.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SingupComponent,
    LoginComponent,
    HomeComponent,
    AddtaskComponent,
    UpdatetaskComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
