import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss'],
})
export class TeacherFormComponent implements OnInit {
  mode: 'Cadastrar' | 'Editar' | 'Visualizar' = 'Visualizar';

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService
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
      subject: [null, Validators.required],
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
      this.router.navigate(['teachers']);
    }
  }

  private loadParams(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.teacherService.findOne(id)))
      .subscribe((student) => {
        this.formGroup.patchValue(student);

        if (this.mode === 'Visualizar') {
          this.formGroup.disable();
        }
      });
  }

  private saveEdition(): void {
    const formValue = this.formGroup.value;
    this.teacherService.saveTeacher(formValue).subscribe(() => {
      alert('Professor salvo com sucesso!');
      this.router.navigate(['teachers']);
    });
  }

  private create(): void {
    const formValue = this.formGroup.value;
    this.teacherService.createTeacher(formValue).subscribe(() => {
      alert('Professor salvo com sucesso!');
      this.router.navigate(['teachers']);
    });
  }

  saveTeacher(): void {
    if (this.mode === 'Editar') {
      this.saveEdition();
    }

    if (this.mode === 'Cadastrar') {
      this.create();
    }
  }
}
