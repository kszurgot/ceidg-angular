import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.sass']
})
export class ErrorModalComponent implements OnInit {

  error: boolean;
  formSubmitted: boolean;

  @Output()
  closeModal = new EventEmitter<null>();

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.getErrorState().subscribe((errorState) => {
      this.error = errorState;
    });

    this.stateService.isFormSubmitted().subscribe((formState) => {
      this.formSubmitted = formState;
    });
  }

  close(): void {
    this.stateService.setErrorState(false);
    if (!this.formSubmitted) {
      this.closeModal.emit(null);
    }
  }

  displayErrorModal(): string {
    return this.error ? "block" : "none";
  }

}
