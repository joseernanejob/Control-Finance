import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Input() description: string = '';

  dialog!: HTMLDialogElement;

  ngOnInit(): void {
    this.dialog = document.querySelector('#dialog') as HTMLDialogElement;
  }

  openModal() {
    this.dialog.showModal();
  }

  closeModal() {
    this.dialog.close();
  }
}
