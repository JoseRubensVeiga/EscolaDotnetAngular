import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>();
  students: Student[] = [];

  displayedColumns = ['id', 'name', 'cpf', 'actions'];

  constructor(private router: Router, private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.studentService.getAll().subscribe((students) => {
      this.dataSource.data = students;
      this.students = students;
    });
  }

  showStudent(student: Student): void {
    this.router.navigate(['students', student.id]);
  }

  editStudent(student: Student): void {
    this.router.navigate(['students', student.id, 'edit']);
  }

  deleteStudent(student: Student): void {
    if (!confirm('Você tem certeza?')) {
      return;
    }
    this.studentService.deleteStudent(student.id).subscribe(() => {
      alert('Estudante excluído com sucesso!');
      this.loadStudents();
    });
  }

  createStudent(): void {
    this.router.navigate(['students', 'new']);
  }
}
