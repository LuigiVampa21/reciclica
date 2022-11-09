import { AppStoreModule } from './shared/store/AppStoreModule';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ...AppStoreModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
