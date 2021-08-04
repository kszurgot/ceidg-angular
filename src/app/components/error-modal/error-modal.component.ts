import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.sass']
})
export class ErrorModalComponent {

  @Input()
  error: boolean;

  @Output()
  closeModal = new EventEmitter<null>();

  constructor() { }

  close(): void {
    this.closeModal.emit(null);
  }

  displayErrorModal(): string {
    return this.error ? "block" : "none";
  }

}
