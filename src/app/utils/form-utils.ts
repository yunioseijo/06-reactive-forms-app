import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep(){
  return new Promise((resolve) => setTimeout( () => resolve(true), 3000
  ));
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'email':
          return 'El formato del correo no es válido';

        case 'emailTaken':
          return 'El correo ya está en uso';

        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return 'El nombre no es válido. Debe contener al menos un nombre y un apellido.';
          }
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El correo no es válido. Debe contener un formato de correo electrónico.';
          }
          if(errors['pattern'].requiredPattern === FormUtils.passwordPattern) {
            return 'La contraseña no es válida. Debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
          }
          return `El campo no es válido. Debe contener un formato específico.`;


        default:
          return `Error no controlado ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray( formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }
  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { passwordNotEqual: true };
    }
  }
  static async checkingServerResponse(control: AbstractControl):Promise<ValidationErrors | null> {
    await sleep(); // Simulando una llamada al servidor
    const formValue = control.value;
    if (formValue === `hola@mundo.com`){
      return { emailTaken: true }; // Simulando un error de email existente
    }
    return null; // Retornar null después de la simulación
  }
}

