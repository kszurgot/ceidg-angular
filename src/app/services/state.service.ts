import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private loadingStateSubject = new BehaviorSubject<boolean>(false);
  private errorStateSubject = new BehaviorSubject<boolean>(false);
  private formStateSubject = new BehaviorSubject<boolean>(false);

  getLoadingState(): Observable<boolean> {
    return this.loadingStateSubject.asObservable();
  }

  setLoadingState(state: boolean): void {
    this.loadingStateSubject.next(state);
  }

  getErrorState(): Observable<boolean> {
    return this.errorStateSubject.asObservable();
  }

  setErrorState(state: boolean): void {
    this.errorStateSubject.next(state);
  }

  isFormSubmitted(): Observable<boolean> {
    return this.formStateSubject.asObservable();
  }

  setFormSubmitState(state: boolean): void {
    this.formStateSubject.next(state);
  }

  resetStates(): void {
    this.loadingStateSubject.next(false);
    this.errorStateSubject.next(false);
  }
}
