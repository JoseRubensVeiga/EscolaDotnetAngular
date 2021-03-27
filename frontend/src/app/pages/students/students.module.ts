import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentFormComponent } from './student-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [StudentsComponent, StudentFormComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class StudentsModule {}
