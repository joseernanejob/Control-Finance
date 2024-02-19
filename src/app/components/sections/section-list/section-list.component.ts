import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListComponent } from '../../list/list.component';
import { insertedValues } from '../../../types';

@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.scss',
})
export class SectionListComponent {
  @Input() list!: insertedValues[];
  @Input() total!: number;

  @Output() onClick = new EventEmitter();

  delete(id: number) {
    this.onClick.emit(id);
  }
}
