import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/Teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  dataSource = new MatTableDataSource<Teacher>();
  teachers: Teacher[] = [];

  displayedColumns = ['id', 'name', 'cpf', 'subject', 'actions'];

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  private loadTeachers(): void {
    this.teacherService.getAll().subscribe((teachers) => {
      this.dataSource.data = teachers;
      this.teachers = teachers;
    });
  }

  showTeacher(teacher: Teacher): void {
    this.router.navigate(['teachers', teacher.id]);
  }

  editTeacher(teacher: Teacher): void {
    this.router.navigate(['teachers', teacher.id, 'edit']);
  }

  deleteTeacher(teacher: Teacher): void {
    if (!confirm('Você tem certeza?')) {
      return;
    }
    this.teacherService.deleteTeacher(teacher.id).subscribe(() => {
      alert('Professor excluído com sucesso!');
      this.loadTeachers();
    });
  }

  createTeacher(): void {
    this.router.navigate(['teachers', 'new']);
  }
}
