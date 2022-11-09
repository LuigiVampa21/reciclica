import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  recoverEmailPassword(email: string){
    return new Observable<void>(observer => {
      setTimeout(() => {
        if(email === 'error@email.com'){
          observer.error({message: 'Email not found'});
        }
        observer.next();
        observer.complete();
      }, 3000);
    });
  }

  onLogin(email: string, password: string): Observable<User>{
    return new Observable<User>(observer => {
      setTimeout(() => {
        if(email === 'error@email.com'){
          observer.error({message: 'User not found'});
          observer.next();
        }else{
          const user = new User();
          user.email = email;
          user.id = 'userID';
          observer.next(user);
        }
        observer.complete();
      }, 3000);
    });
  }
}
