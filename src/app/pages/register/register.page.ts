/* eslint-disable id-blacklist */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordsMatchValidator } from 'src/app/shared/Validators/passwords-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]],
      passwordConfirm:['', [Validators.required]],
      phone:['', [Validators.required]],
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        neighborhood: ['', [Validators.required]],
        complement: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
      })
    },{
      validators: [PasswordsMatchValidator('password','confirmPassword')],
      updateOn: 'blur'
  });
  }

  register(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
    }else{
      this.router.navigate(['home']);
    }
  }

}
