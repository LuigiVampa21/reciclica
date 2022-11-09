import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRegister } from '../shared/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  recoverEmailPassword(email: string){
    return new Observable<void>( observer => {
     this.auth.sendPasswordResetEmail(email)
        .then(() => {
          observer.next();
          observer.complete();
        }).catch(err => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  onLogin(email: string, password: string): Observable<User>{
      return new Observable<User>(observer => {
        const auth = getAuth();
        setPersistence(auth, browserLocalPersistence).then( () => {
          this.auth.signInWithEmailAndPassword(email, password)
          .then(() => {
            observer.next({email, password});
            observer.complete();
          })
          .catch((err) => {
            observer.error(err);
            observer.complete();
          });
        });
      });
    }

  onRegister(user: UserRegister){
    return new Observable<User>(observer => {
        // .then(() => {

          // if(user.email === 'ntn@ntn.mail'){
          //   observer.error('email already registered');
          //   observer.complete();
          // }
          observer.next(user);
          observer.complete();
        });
        // .catch((err) => {
          // observer.error(err);
          // observer.complete();
    //     });
    //   });
    // });
  }
}
