import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  mode: 'Cadastrar' | 'Editar' | 'Visualizar' = 'Visualizar';

  formGroup!: FormGroup;
  teachers$ = this.teacherService.getAll();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.setMode();
    this.buildForm();
    this.loadParams();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      cpf: [null, Validators.required],
      teacherId: [null, Validators.required],
    });
  }

  private setMode(): void {
    const { url } = this.router;

    try {
      const index = url.lastIndexOf('/');
      const lastParameter = url.slice(index + 1);

      if (lastParameter === 'edit') {
        this.mode = 'Editar';
        return;
      }

      if (lastParameter === 'new') {
        this.mode = 'Cadastrar';
        return;
      }

      this.mode = 'Visualizar';
    } catch {
      this.router.navigate(['students']);
    }
  }

  private loadParams(): void {
    if (this.mode === 'Editar') {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.studentService.findOne(id)))
        .subscribe((student) => {
          this.formGroup.patchValue(student);

          if (this.mode === 'Visualizar') {
            this.formGroup.disable();
          }
        });
    }
  }

  private saveEdition(): void {
    const formValue = this.formGroup.value;
    this.studentService.saveStudent(formValue).subscribe(
      () => {
        this.notification.success('Estudante alterado com sucesso!');
        this.router.navigate(['students']);
      },
      () => {
        this.notification.error('Ops houve um erro ao salvar o estudante.');
      }
    );
  }

  private create(): void {
    const formValue = this.formGroup.value;
    this.studentService.createStudent(formValue).subscribe(
      () => {
        this.notification.success('Estudante criado com sucesso!');
        this.router.navigate(['students']);
      },
      () => {
        this.notification.error('Ops. Houve um erro ao criar o estudante.');
      }
    );
  }

  saveStudent(): void {
    if (this.formGroup.invalid) {
      this.notification.error('Por favor. Preencha todos os campos.');
      return;
    }
    if (this.mode === 'Editar') {
      this.saveEdition();
    }

    if (this.mode === 'Cadastrar') {
      this.create();
    }
  }
}
