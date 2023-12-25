import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get showModal$(): Observable<boolean> {
    return this.showModalSubject.asObservable();
  }

  toggleModal(show: boolean): void {
    this.showModalSubject.next(show);
  }
}
