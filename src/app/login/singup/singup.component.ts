import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators, FormBuilder } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor(private fb: FormBuilder,private route:Router,private rs:HttpService,public spinner: NgxSpinnerService,private loading:AppComponent) { }
  emailSingupForm;

  loggedIn: boolean;
  ngOnInit(): void {
  
    this.emailSingupForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      username: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(30),])),
      photo: new FormControl('',[Validators.required])
    });
   

  }

  imageSrc:string="https://via.placeholder.com/50";
  file:File;
  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result as string;

        reader.readAsDataURL(this.file);
    }
  }


  get getControl(){
    return this.emailSingupForm.controls;
  }

  passwordType:boolean=false;
  toggleFieldTextTypePassword() {
    this.passwordType = !this.passwordType;
  }

  confirmpasswordType:boolean=false;
  toggleFieldTextTypeConfirmPassword() {
    this.confirmpasswordType = !this.confirmpasswordType;
  }


  onSubmit(){
    console.table(this.emailSingupForm.value);
    var objFinal=this.emailSingupForm.value;
    console.log(objFinal);
    const formData = new FormData();
    formData.append('email', objFinal['email']);
    formData.append('password', objFinal['password']);
    formData.append('username', objFinal['username']);

    
    formData.append('photo', this.file);

    console.log(formData);
    
    this.loading.spinner.show();


    this.rs.post_withimg("/users/create",formData).subscribe((res)=>{

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
                  this.emailSingupForm.reset();

                  this.imageSrc="https://via.placeholder.com/50";
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
