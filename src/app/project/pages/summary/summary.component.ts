import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  /**
   * Project interface
   */
  public project!: ProjectInterface;

  /**
   * The constructor function takes a ProjectService parameter and assigns it to the projectService
   * property.
   * @param projectService 
   */
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProject();
  }

  /**
   * The function `getProject` retrieves a project using the `projectService` and assigns it to the
   * `project` variable.
   */
  public getProject(): void {
    this.projectService.get().subscribe((project) => {
      this.project = project!;
      this.getEffyAidAmount();
    });
  }

  /**
   * The function calculates the cost of a project based on its area and assigns it to the project's
   * cost property.
   */
  private getCostOfProject(): void {
    if (this.project) {
      this.project.cost = this.project.area * 80;
    } 
  }

  /**
   * The function calculates the amount of aid (effyAidAmount) for a project based on its cost,
   * household income, and number of people in the household.
   */
  private getEffyAidAmount(): void {
    this.getCostOfProject();
    if (this.project?.cost) {
      let aidAmount = (this.project.cost * 0.75) - (this.project.householdIncome / this.project.numberOfPeopleHousehold) * 0.15;
      aidAmount = aidAmount > 0 ? Math.ceil(aidAmount * 100) / 100 : 0;
      this.project.effyAidAmount = aidAmount;
    }
  }
  
  public get effyAidAmountIsPositive(): boolean {
    return this.project?.effyAidAmount > 0;
  }
}
