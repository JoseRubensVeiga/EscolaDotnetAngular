import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentFormComponent } from './student-form';

import { StudentsComponent } from './students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: ':id', component: StudentFormComponent },
  { path: ':id/edit', component: StudentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
