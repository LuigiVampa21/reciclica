/* eslint-disable id-blacklist */
import { Auth } from 'firebase/auth';
import { Address } from './address.model';

export class User{
  email?: string;
  password?: string;
  id?: string;
  auth?: Auth;
}

export class UserRegister{
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: Address;
}
