import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators, FormBuilder } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home.component';
declare var $;
@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  constructor(private fb: FormBuilder,private route:Router,private rs:HttpService,public spinner: NgxSpinnerService,private loading:AppComponent,private home:HomeComponent) { }
  updateTaskForm;
  ngOnInit(): void {

    this.updateTaskForm = this.fb.group({
      
      content: new FormControl(window.localStorage.getItem('content'),Validators.compose([Validators.required]))
    });
  }

  
  get getControl(){
    return this.updateTaskForm.controls;
  }

  
  onSubmit(){
    console.table(this.updateTaskForm.value);
    var objFinal=this.updateTaskForm.value;
    objFinal['todoid']=window.localStorage.getItem('id');
    this.loading.spinner.show();
    this.rs.tokenpost("/task/update",objFinal).subscribe((res)=>{

      this.loading.spinner.hide();
                 console.log(res);
                 if(res['response']==1)
                 {

                  this.home.closeEdit();
        return Swal.fire('', res['sys_message'], 'success')
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