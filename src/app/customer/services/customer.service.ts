import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerInterface } from 'src/app/shared/interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  /**
   * New instance of BeheviorSubject class
   */
  private behaviorSubject = new BehaviorSubject<CustomerInterface | null>(null);

  /**
   * The post function updates the behavior subject with the provided customer data.
   * @param customer - The customer parameter.
   */
  public post(customer: CustomerInterface): void {
    this.behaviorSubject.next(customer);
  }

  /**
   * The function returns an observable that emits values from a BehaviorSubject.
   * @returns The method is returning an Observable.
   */
  public get(): Observable<CustomerInterface | null> {
    return this.behaviorSubject.asObservable();
  }
}
