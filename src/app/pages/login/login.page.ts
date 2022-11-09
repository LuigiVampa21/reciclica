import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginState } from './../../shared/store/login/LoginState';
import { recoverPassword, login } from './../../shared/store/login/login.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/AppState';
import { hide, show } from 'src/app/shared/store/loading/loading.actions';
import { NavController, ToastController } from '@ionic/angular';
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
              private navController: NavController,
             ) { }

  ngOnInit() {
    this.initForm();
    this.loginStateSub = this.store.select('login')
        .subscribe(loginState => {
            this.onIsRecoveredPassword(loginState);
            this.onIsLoggedIn(loginState);
            this.toggleLoading(loginState);
            this.onError(loginState);
        });
  }

  initForm(){
   this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleLoading(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

  async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
    const toaster = await this.toastController.create({
      position: 'bottom',
      duration: 3000,
      message: 'Recovery email sent',
      color: 'primary'
    });
    toaster.present();
    }
  };

  async onError(loginState: LoginState){
    if(loginState.error){
      const toaster = await this.toastController.create({
        position: 'bottom',
        duration: 3000,
        message: loginState.error.message,
        color: 'danger'
      });
      toaster.present();
      }
  }

  onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn){
      this.navController.navigateRoot('home');
    }
  }

  login(){
    this.store.dispatch(login(this.form.value));
  }

  register(){
    this.router.navigate(['register']);
  }

  forgotPassword(){
    this.store.dispatch(recoverPassword({email: this.form.get('email').value}));
  }

  ngOnDestroy(): void {
    if(this.loginStateSub){
      this.loginStateSub.unsubscribe();
    }
  }

}
