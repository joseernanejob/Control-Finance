import { valuesCategory } from './../services/data';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  effect,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { IInsertedValues, newValue } from './types';
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
  total!: number;
  inputValue: string = 'all';
  public listOrigin = signal<IInsertedValues[]>([]);
  public list = this.listOrigin();

  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private cdr: ChangeDetectorRef) {
    const localList = localStorage.getItem('@listValues');
    this.listOrigin.set(localList ? JSON.parse(localList) : []);
    this.list = this.listOrigin();

    effect(() => {
      console.log(this.listOrigin());
      localStorage.setItem('@listValues', JSON.stringify(this.listOrigin()));
    });
  }

  ngOnInit(): void {
    this.calcTotal();
    this.inputValue = 'all';
  }

  onChange(value: string) {
    this.inputValue = value;
    this.filterInput();
  }

  delete(id: number) {
    this.listOrigin.update((value) =>
      value.filter((element) => element.id != id)
    );
    this.filterInput();
  }

  filterInput() {
    if (this.inputValue === 'all') {
      this.list = this.listOrigin();
    } else {
      this.list = this.listOrigin().filter(
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
    const lastId =
      this.listOrigin().length > 0
        ? this.listOrigin()[this.listOrigin().length - 1].id + 1
        : 1;
    const newValue = {
      ...data,
      id: lastId,
    };
    this.listOrigin.set([...this.listOrigin(), newValue]);
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
