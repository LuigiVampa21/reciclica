/* eslint-disable id-blacklist */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/shared/store/AppState';
import { PasswordsMatchValidator } from 'src/app/shared/Validators/passwords-match.validator';
import { select, Store } from '@ngrx/store';
import { register } from 'src/app/shared/store/register/register.actions';
import { RegisterState } from 'src/app/shared/store/register/RegisterState';
import { hide, show } from 'src/app/shared/store/loading/loading.actions';
import { IonInput, ToastController } from '@ionic/angular';
import { login } from 'src/app/shared/store/login/login.actions';

// eslint-disable-next-line no-var
declare var google;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  @ViewChild('autocomplete') autocomplete: IonInput;

  form: FormGroup;
  registerStateSub: any;

  constructor(
              private formBuilder: FormBuilder,
              private store: Store<AppState>,
              private toastController: ToastController
            ) { }

  ngOnInit() {
    this.initForm();
    this.registerStateSub = this.store.select('register')
    .subscribe(registerState => {
        this.onIsRegistered(registerState);
        this.toggleLoading(registerState);
        this.onError(registerState);
    });
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

 async ionViewDidEnter(){
    try{
      const ref = await this.autocomplete.getInputElement();
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        console.log(autocomplete.getPlace());
        this.form.setAddress(autocomplete.getPlace());
      });
    }catch(err){
      console.log(err);
    }
    // this.autocomplete.getInputElement().then((ref: any) => {
    //   const autocomplete = new google.maps.places.Autocomplete(ref);
    //   autocomplete.addListener('place_changed', () => {
    //     console.log(autocomplete.getPlace());
    //   });
    // });
  }


  toggleLoading(registerState: RegisterState){
    if(registerState.isRegistering){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

  async onIsRegistered(registerState: RegisterState){
    if(registerState.isRegistered){
      const toaster = await this.toastController.create({
        position: 'bottom',
        duration: 3000,
        message: 'you have been registered',
        color: 'primary'
      });
      toaster.present();
      this.store.dispatch(login({
        email: this.form.get('email').value,
        password: this.form.get('password').value,
      }));
    }
  };

  async onError(registerState: RegisterState){
    if(registerState.error){
      const toaster = await this.toastController.create({
        position: 'bottom',
        duration: 3000,
        message: registerState.error.message,
        color: 'danger'
      });
      toaster.present();
      }
  }

  register(){
      this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(register({user: this.form.value}));
    }
  }

  ngOnDestroy(): void {
    this.registerStateSub.unsubscribe();
  }

}
