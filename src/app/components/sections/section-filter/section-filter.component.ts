import { Component, EventEmitter, Output } from '@angular/core';
import { RadioComponent } from '../../inputs/radio/radio.component';

@Component({
  selector: 'app-section-filter',
  standalone: true,
  imports: [RadioComponent],
  templateUrl: './section-filter.component.html',
  styleUrl: './section-filter.component.scss',
})
export class SectionFilterComponent {
  @Output() onChange = new EventEmitter();

  change(value: string) {
    this.onChange.emit(value);
  }
}
