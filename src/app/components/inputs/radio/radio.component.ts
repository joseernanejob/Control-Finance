import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  @Output() onChange = new EventEmitter();
  @Input() name!: string;
  @Input() id!: string;
  @Input() value!: string;
  @Input() checked: boolean = false;
  @Input() label!: string;

  change(e: Event) {
    const input = e.target as HTMLInputElement;
    this.onChange.emit(input.value);
  }
}
