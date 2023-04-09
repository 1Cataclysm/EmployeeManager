import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees: Employee[] = [];
  editEmployee: Employee | undefined;

  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;

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
        this.totalPages = Math.ceil(this.employees.length / this.pageSize);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  public setCurrentPage(page: number): void {
    this.currentPage = page;
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
    console.log("changer")
    this.currentPage = 1;
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(employee);
      }
    }
    this.employees = result;
    if (key.length === 0 || !key) {
      this.getEmployees();
    }
  }

}
