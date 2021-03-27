import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./pages/teachers/teachers.module').then((m) => m.TeachersModule),
  },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
