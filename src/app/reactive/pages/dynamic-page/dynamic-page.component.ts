import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      Validators.minLength(2)
    ),
  });

  newFavorite = new FormControl('', [Validators.required, Validators.minLength(2),]);
  // newFavorite = this.fb.control([])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value
    this.favoriteGames.push(this.fb.control(newGame, [Validators.required, Validators.minLength(2),]));
    this.newFavorite.reset();
    }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }
  onSubmit(){
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid) return;
  }
}
