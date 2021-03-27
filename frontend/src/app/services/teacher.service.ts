import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Teacher } from '../models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Teacher[]> {
    const url = environment.API.TEACHERS;
    return this.http
      .get<Teacher[]>(url)
      .pipe(map((response: any[]) => response?.map((r) => new Teacher(r))));
  }

  findOne(teacherId: number): Observable<Teacher> {
    const url = environment.API.TEACHERS;
    return this.http
      .get<Teacher>(`${url}/${teacherId}`)
      .pipe(map((response: any) => new Teacher(response)));
  }

  createTeacher(teacher: Teacher): Observable<void> {
    const url = environment.API.TEACHERS;
    return this.http.post<void>(url, teacher);
  }

  saveTeacher(teacher: Teacher): Observable<void> {
    const url = environment.API.TEACHERS;
    return this.http.patch<void>(url, teacher);
  }

  deleteTeacher(teacherId: number): Observable<void> {
    const url = environment.API.TEACHERS;
    return this.http.delete<void>(`${url}/${teacherId}`);
  }
}
