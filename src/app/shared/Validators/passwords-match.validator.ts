/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractControl } from '@angular/forms';

export const PasswordsMatchValidator = (passwordControlName: string,
    confirmPasswordControlName: string) => {
      const validator = (form: AbstractControl) => {
        const passwordControl =  form.get(passwordControlName);
        const confirmPasswordControl =  form.get(confirmPasswordControlName);

        if(!passwordControl || !confirmPasswordControl) return;

        if(passwordControl.value !== confirmPasswordControl.value){
          confirmPasswordControl.setErrors({notMatch: true});
        }else{
          const errors = confirmPasswordControl.errors;
          if(!errors) return;

          // eslint-disable-next-line @typescript-eslint/dot-notation
          delete errors['notMatch'];
          confirmPasswordControl.setErrors(errors);
        }
      };
      return validator;
    };
