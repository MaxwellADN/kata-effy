import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerInterface } from 'src/app/shared/interfaces/customer.interface';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss']
})
export class ProjectInformationComponent implements OnInit {
  /**
   * Project FormGroup
   */
  public projectForm!: FormGroup;
  /**
   * Customer 
   */
  private customer!: CustomerInterface;

  /**
   * The constructor function initializes the customerService and formBuilder dependencies.
   * @param customerService 
   * @param formBuilder 
   */
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService
    ) {}

  /**
   * The ngOnInit function is used to initialize the component by calling the getCustomer function and
   * initializing the project form group.
   */
  ngOnInit(): void {
    this.getCustomer();
    this.initProjectFormGroup();
  }

  /**
   * The function initializes a form group with validation rules for a project form.
   */
  public initProjectFormGroup(): void  {
    this.projectForm = this.formBuilder.group({
      isHouseOwner: [true, Validators.required],
      numberOfPeopleHousehold: ['', [Validators.required, Validators.min(1)]],
      householdIncome: ['', [Validators.required, Validators.min(10000), Validators.max(100000)]],
      area: ['', [Validators.required, Validators.min(1)]]
    });
  }

  /**
   * The function retrieves a customer using the customer service and assigns it to the "customer"
   * property.
   */
  public getCustomer(): void {
    this.customerService.get().subscribe((customer) => {
      this.customer = customer!;
    });
  }

  /**
   * The submit function checks if the project form is valid and if so, creates a new project object
   * with the form values and customer information, and then sends a POST request to the project
   * service.
   */
  public submit(): void {
    if (this.projectForm.valid) {
      const project: ProjectInterface = { ...this.projectForm.value, customer: this.customer } 
      this.projectService.post(project);
      this.router.navigate(['/project-information/summary']);
    }
  }

  /**
   * The function returns the 'isHouseOwner' form control from the 'projectForm' FormGroup as a
   * FormControl.
   * @returns The method is returning a FormControl object.
   */
  public get isHouseOwnerFormControl(): FormControl {
    return <FormControl>this.projectForm.get('isHouseOwner');
  }

  /**
   * The function returns the form control for the "numberOfPeopleHousehold" field in a project form.
   * @returns a FormControl object.
   */
  public get numberOfPeopleHouseholdFormControl(): FormControl {
    return <FormControl>this.projectForm.get('numberOfPeopleHousehold');
  }

  /**
   * The function returns the householdIncome form control from the projectForm.
   * @returns The householdIncomeFormControl, which is a FormControl object.
   */
  public get householdIncomeFormControl(): FormControl {
    return <FormControl>this.projectForm.get('householdIncome');
  }

  /**
   * The function returns the FormControl object for the 'area' field in the projectForm.
   * @returns The areaFormControl is being returned.
   */
  public get areaFormControl(): FormControl {
    return <FormControl>this.projectForm.get('area');
  }
}
