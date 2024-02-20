import { Component, EventEmitter, Input, Output } from '@angular/core';
import { valuesCategory } from '../../../services/data';

interface IList {
  id: number;
  value: number;
  categoryID: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() list!: IList[];
  listCategory = valuesCategory;

  @Output() showModal = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  delete(id: number) {
    this.deleteItem.emit(id);
  }

  openModal() {
    this.showModal.emit();
  }
}
