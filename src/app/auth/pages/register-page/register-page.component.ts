import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {


  fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm:FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: ['',[Validators.required, Validators.pattern(this.formUtils.emailPattern)],
  [this.formUtils.checkingServerResponse]],
    userName: ['',[Validators.required, Validators.pattern(this.formUtils.notOnlySpacesPattern),this.formUtils.notStrider]],
    password: ['',[Validators.required, Validators.pattern(this.formUtils.passwordPattern)]],
    password2: ['',[Validators.required, Validators.minLength(6)]],
  },{
    validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }


}
