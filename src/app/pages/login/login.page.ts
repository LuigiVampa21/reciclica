import { LoginState } from './../../shared/store/login/LoginState';
// eslint-disable-next-line max-len
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail, loginSuccess, login, loginFail } from './../../shared/store/login/login.actions';
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
            this.onIsRecoveringPassword(loginState);
            this.onIsRecoveredPassword(loginState);
            this.onIsLoggingIn(loginState);
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

  onIsRecoveringPassword(loginState: LoginState){
    if(loginState.isRecoveringPassword){
    // this.toggleLoading(loginState);
    this.authService.recoverEmailPassword(this.form.get('email').value)
        .subscribe(() => {
          this.store.dispatch(recoverPasswordSuccess());
        }, error => this.store.dispatch(recoverPasswordFail({error})));
    }
  };
  async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
    // this.toggleLoading(loginState);
    const toaster = await this.toastController.create({
      position: 'bottom',
      message: 'Recovery email sent',
      color: 'primary'
    });
    toaster.present();
    }
  };

  async onError(loginState: LoginState){
    if(loginState.error){
      // this.toggleLoading(loginState);
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger'
      });
      toaster.present();
      }
  }

  onIsLoggingIn(loginState: LoginState){
    if(loginState.isLoggingIn){
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.authService.onLogin(email, password)
            .subscribe(user => {
              this.store.dispatch(loginSuccess({user}));
            },
            error => {
              this.store.dispatch(loginFail({error}));
            }
            );
    }
  }

  onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  login(){
    this.store.dispatch(login());
  }

  register(){
    this.router.navigate(['register']);
  }

  forgotPassword(){
    this.store.dispatch(recoverPassword());
  }

  ngOnDestroy(): void {
    if(this.loginStateSub){
      this.loginStateSub.unsubscribe();
    }
  }

}
