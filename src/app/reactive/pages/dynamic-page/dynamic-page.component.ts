import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', [Validators.required,]],
        ['Death Stranding', [Validators.required,]],
      ],
      Validators.minLength(3)
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
}
