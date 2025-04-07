import { FormGroup } from "@angular/forms";

export class FormUtils {
  static isValidField(formGroup: FormGroup, fieldName: string): boolean | null {
    return formGroup.controls[fieldName].errors && formGroup.controls[fieldName].touched;
  }

  static getFiledError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `${fieldName} is required`;
        case 'minlength':
          return `${fieldName} min length is ${errors[key].requiredLength}`;
        case 'min':
          return `${fieldName} min value is ${errors[key].min}`;
        default:
          return null;
      }
    }
    return null;
  }

}
