import { Observable } from 'rxjs'
import { Employee } from './employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiServerUrl = 'http://localhost:8080';
    constructor(private http: HttpClient) { }

    public getEmployees(): Observable<any> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    }

    public getEmployeeById(id: number): Observable<any> {
        return this.http.get<Employee>(`${this.apiServerUrl}/employee/find/${id}`);
    }

    public addEmployee(employee: Employee): Observable<any> {
        return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
    }

    public updateEmployee(employee: Employee): Observable<any> {
        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
    }

    public deleteEmployee(employeeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }


}
