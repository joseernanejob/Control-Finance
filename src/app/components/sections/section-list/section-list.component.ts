import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListComponent } from '../../list/list.component';
import { IInsertedValues } from '../../../types';

@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.scss',
})
export class SectionListComponent {
  @Input() list!: IInsertedValues[];
  @Input() total!: number;

  @Output() showModal = new EventEmitter();
  @Output() onClick = new EventEmitter();

  delete(id: number) {
    this.onClick.emit(id);
  }
  openModal() {
    this.showModal.emit();
  }
}
