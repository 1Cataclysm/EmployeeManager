import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Page } from '../models/page'
/**
 * 
 * Lorsque j'ajoute un employé ça marche mais ca fait un truc bizarre (test pour voir)
 * Variable pageSize = 50 faire en sorte que ce soit le nombre d'employé dans la base employees.length
 * 
 * 
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  employees: Employee[] = [];
  editEmployee: Employee | undefined;

  currentPage = 1;
  pageSize = 8;

  title =""
  deleteEmployee: Employee | undefined;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public addEmployeeModal(addForm: NgForm) {
    console.log("ajout")
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public editEmployeeModal(employee: Employee) {
    document.getElementById("edit-employee-form")?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteEmployeeModal(employeeId: number) {
    document.getElementById("delete-employee-form")?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public openEditEmployeeModal(employee: Employee) {
    this.editEmployee = employee;
  }

  public openDeleteEmployeeModal(employee: Employee) {
    this.deleteEmployee = employee;
  }

  public searchEmployees(key: string) {
    const result: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(employee);
      }
    }
    this.employees = result;
    if (result.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
