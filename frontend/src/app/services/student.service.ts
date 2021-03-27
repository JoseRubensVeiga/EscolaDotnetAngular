import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    const url = environment.API.STUDENTS;
    return this.http
      .get<Student[]>(url)
      .pipe(map((response: any[]) => response?.map((r) => new Student(r))));
  }

  findOne(studentId: number): Observable<Student> {
    const url = environment.API.STUDENTS;
    return this.http
      .get<Student>(`${url}/${studentId}`)
      .pipe(map((response: any) => new Student(response)));
  }

  saveStudent(student: Student): Observable<void> {
    const url = environment.API.STUDENTS;
    return this.http.patch<void>(url, student);
  }
}
