import { insertedValues, valuesCategory } from './../services/data';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { newValue } from './types';
import { SectionFilterComponent } from './components/sections/section-filter/section-filter.component';
import { SectionListComponent } from './components/sections/section-list/section-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormInsertValueComponent } from './components/forms/form-insert-value/form-insert-value.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SectionFilterComponent,
    SectionListComponent,
    ModalComponent,
    FormInsertValueComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'controlFinance';
  list = insertedValues;
  total!: number;
  inputValue: string = 'all';

  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calcTotal();
    this.inputValue = 'all';
  }

  onChange(value: string) {
    this.inputValue = value;
    this.filterInput();
  }

  delete(id: number) {
    const valueIndex = insertedValues.findIndex((element) => element.id === id);
    insertedValues.splice(valueIndex, 1);
    this.filterInput();
  }

  filterInput() {
    if (this.inputValue === 'all') {
      this.list = insertedValues;
    } else {
      this.list = insertedValues.filter(
        (item) =>
          item.categoryID ===
          valuesCategory.findIndex((category) => category === this.inputValue)
      );
    }
    this.calcTotal();
  }

  calcTotal() {
    this.total = this.list.reduce((acc, element) => {
      if (element.categoryID === 0) {
        return acc + element.value;
      }
      return acc - element.value;
    }, 0);

    this.cdr.detectChanges();
  }

  onSubmit(data: newValue) {
    const newValue = {
      ...data,
      id: insertedValues[insertedValues.length - 1].id + 1,
    };
    insertedValues.push(newValue);
    this.filterInput();
    this.closeModal();
  }

  showModal() {
    this.modal.openModal();
  }

  closeModal() {
    this.modal.closeModal();
  }
}
