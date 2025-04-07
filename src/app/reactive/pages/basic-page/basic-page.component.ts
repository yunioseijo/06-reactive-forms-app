import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)],[]],
    price:[0,[Validators.required,Validators.min(10)]] ,
    inStorage: [0, [Validators.required,Validators.min(0)]],
  });

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFiledError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors ?? {};

    return null;
  }
 }
