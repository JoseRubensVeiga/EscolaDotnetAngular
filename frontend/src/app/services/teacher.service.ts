import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from '../models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Teacher[]> {
    const url = environment.API.TEACHERS;
    return this.http.get<Teacher[]>(url);
  }
}
