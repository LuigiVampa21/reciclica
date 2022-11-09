import { LoginState } from './../../shared/store/login/LoginState';
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail } from './../../shared/store/login/login.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/AppState';
import { hide, show } from 'src/app/shared/store/loading/loading.actions';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loginStateSub: Subscription;

  constructor(
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<AppState>,
              private toastController: ToastController,
              private authService: AuthService,
             ) { }

  ngOnInit() {
    this.initForm();
    this.loginStateSub = this.store.select('login')
        .subscribe(loginState => {
          if(loginState.isRecoveringPassword){
            this.onIsRecoveringPassword();
          }
          if(loginState.isRecoveredPassword){
            this.onIsRecoveredPassword();
          }
          if(loginState.error){
            this.onIsRecoverPasswordFail(loginState);
          }
        });
  }

  initForm(){
   this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onIsRecoveringPassword(){
    this.store.dispatch(show());
    this.authService.recoverEmailPassword(this.form.get('email').value)
        .subscribe(() => {
          this.store.dispatch(recoverPasswordSuccess());
        }, error => this.store.dispatch(recoverPasswordFail({error})));
  };
  async onIsRecoveredPassword(){
    this.store.dispatch(hide());
    const toaster = await this.toastController.create({
      position: 'bottom',
      message: 'Recovery email sent',
      color: 'primary'
    });
    toaster.present();
  };

  async onIsRecoverPasswordFail(loginState: LoginState){
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger'
      });
      toaster.present();
  }

  login(){
    this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register']);
  }

  forgotPassword(){
    this.store.dispatch(recoverPassword());
    this.store.dispatch(show());
    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000);
  }

  ngOnDestroy(): void {
    if(this.loginStateSub){
      this.loginStateSub.unsubscribe();
    }
  }

}
