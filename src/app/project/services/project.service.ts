import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  /**
   * New instance of BeheviorSubject class
   */
  private behaviorSubject = new BehaviorSubject<ProjectInterface | null>(null);
  
  /**
   * The post function updates the behavior subject with the given project.
   * @param  project 
   */
  public post(project: ProjectInterface): void {
    this.behaviorSubject.next(project);
  }

  /**
   * The function returns an Observable that emits a ProjectInterface object or null.
   * @returns 
   */
  public get(): Observable<ProjectInterface | null> {
    return this.behaviorSubject.asObservable();
  }
}
