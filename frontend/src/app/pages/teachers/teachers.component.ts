import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/Teacher';
import { NotificationService } from 'src/app/services/notification.service';
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

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private notification: NotificationService
  ) {}

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
    this.notification
      .confirm({
        title: 'Você tem certeza?',
        text: 'Essa ação não poderá ser desfeita',
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.teacherService.deleteTeacher(teacher.id).subscribe(
            () => {
              this.notification.success('Professor excluído com sucesso!');
              this.loadTeachers();
            },
            () => {
              this.notification.error(
                'Existe um ou mais alunos vinculados à ele.'
              );
              this.notification.error('Não foi possível excluir o professor.');
            }
          );
        }
      });
  }

  createTeacher(): void {
    this.router.navigate(['teachers', 'new']);
  }
}
