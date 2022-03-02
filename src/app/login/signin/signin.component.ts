import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators, FormBuilder } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [
    NgxSpinnerService
    ]
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder,private route:Router,private rs:HttpService,public spinner: NgxSpinnerService,private loading:AppComponent) { }
  emailLoginForm;
  loggedIn: boolean;

  ngOnInit(): void {
    this.emailLoginForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(30),
      ])),
    });
    window.localStorage.removeItem("unverified_user_token");
    window.localStorage.removeItem("unverified_user_name");
    window.localStorage.removeItem("unverified_user_email");


  }

  get getControl(){
    return this.emailLoginForm.controls;
  }

  passwordType:boolean=false;
  toggleFieldTextTypePassword() {
    this.passwordType = !this.passwordType;
  }

  onSubmit(){
    console.table(this.emailLoginForm.value);

    this.loading.spinner.show();
    this.rs.post_withouttoken("/users/login",this.emailLoginForm.value).subscribe((res)=>{

                 this.loading.spinner.hide();
                 console.log(res);
                 if(res['response']==1)
                 {
                      window.localStorage.setItem("token",res['data']['token']);
                      window.localStorage.setItem("name",res['data']['username']);
                      window.localStorage.setItem("email",res['data']['email']);
                      window.localStorage.setItem("photo",res['data']['photo']);
                      
                      this.route.navigate(['simpledashboard']);
                 }
                 
                 else{
  
        return Swal.fire('', res['sys_message'], 'error')
                 }
      },(err)=>{
            var message="something went wrong";
            if(err['error']){
                if(err['error']['sys_message']){
                  message=err['error']['sys_message'];
                }
            }
            this.loading.spinner.hide();
            return Swal.fire('', message, 'error');
        
      });

  }


 
}
