import { Component, EventEmitter, Output } from '@angular/core';
import { valuesCategory } from '../../../../services/data';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RadioComponent } from '../../inputs/radio/radio.component';
import { CURRENCY_MASK_CONFIG, CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomCurrencyMaskConfig } from './currency-mask-config';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-insert-value',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RadioComponent,
    CurrencyMaskModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './form-insert-value.component.html',
  styleUrl: './form-insert-value.component.scss',
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
})
export class FormInsertValueComponent {
  @Output() onSubmit = new EventEmitter();
  @Output() onCloseModal = new EventEmitter();

  submitted = false;
  formGroup = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    type: new FormControl('Entrada', [Validators.required]),
  });

  submit(): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      const { value, type } = this.formGroup.value;
      const newData = {
        value: value,
        categoryID: valuesCategory.findIndex((element) => element === type),
      };
      this.onSubmit.emit(newData);
      this.formGroup.reset();
      this.formGroup.setValue({
        value: '',
        type: 'Entrada',
      });
      this.submitted = false;
    }
  }

  closeModal() {
    this.onCloseModal.emit();
  }
}
