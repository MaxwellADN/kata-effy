import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnal-information',
  templateUrl: './personnal-information.component.html',
  styleUrls: ['./personnal-information.component.scss']
})
export class PersonnalInformationComponent implements OnInit {
  /**
   * Customer FormGroup
   */
  public customerForm!: FormGroup;

  /**
   * The constructor function takes in a formBuilder object as a parameter 
   * @param router 
   * @param formBuilder 
   * @param customerService 
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
    ) { }

  /**
   * The ngOnInit function initializes a customer form with predefined fields and validators.
   */
  ngOnInit(): void {
    this.initCustomerForm();
  }

  /**
   * The function initializes a customer form with predefined fields and validators.
   */
  public initCustomerForm(): void {
    this.customerForm = this.formBuilder.group({
      civility: ['Monsieur', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
  }

  /**
   * The submit function checks if the customerForm is valid and if so, it calls the post method of the
   * customerService with the value of the customerForm.
   */
  public submit(): void {
    if (this.customerForm.valid) {
      this.customerService.post(this.customerForm.value);
      this.router.navigate(['/project-information']);
    }
  }

  /**
   * The function returns the FormControl object for the 'civility' field in the customerForm.
   * @returns The `civilityFormControl` method is returning a `FormControl` object.
   */
  public get civilityFormControl(): FormControl {
    return <FormControl>this.customerForm.get('civility');
  }

  /**
   * The function returns the FormControl object for the 'lastName' field in the customerForm.
   * @returns The `lastNameFormControl` method is returning a `FormControl` object.
   */
  public get lastNameFormControl(): FormControl {
    return <FormControl>this.customerForm.get('lastName');
  }

  /**
   * The function returns the FormControl object for the 'firstName' field in the customerForm.
   * @returns The `firstNameFormControl` method is returning a `FormControl` object.
   */
  public get firstNameFormControl(): FormControl {
    return <FormControl>this.customerForm.get('firstName');
  }

  /**
   * The function returns the email form control from the customer form.
   * @returns The emailFormControl is being returned.
   */
  public get emailFormControl(): FormControl {
    return <FormControl>this.customerForm.get('email');
  }

  /**
   * The function returns the phoneNumber control from the customerForm.
   * @returns The method is returning a FormControl object.
   */
  public get phoneNumberControl(): FormControl {
    return <FormControl>this.customerForm.get('phoneNumber');
  }
}
