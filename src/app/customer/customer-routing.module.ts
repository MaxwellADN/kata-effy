import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnalInformationComponent } from './pages/personnal-information/personnal-information.component';

const routes: Routes = [
  { path: '', redirectTo: '/personal-information', pathMatch: 'full' },
  { path: 'personal-information', component: PersonnalInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
