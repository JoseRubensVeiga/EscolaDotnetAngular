import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { NotificationService } from 'src/app/services/notification.service';
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

  constructor(
    private router: Router,
    private studentService: StudentService,
    private notification: NotificationService
  ) {}

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
    this.notification
      .confirm({
        title: 'Você tem certeza?',
        text: 'Essa ação não poderá ser desfeita',
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.studentService.deleteStudent(student.id).subscribe(() => {
            this.notification.success('Estudante excluído com sucesso!');
            this.loadStudents();
          });
        }
      });
  }

  createStudent(): void {
    this.router.navigate(['students', 'new']);
  }
}
