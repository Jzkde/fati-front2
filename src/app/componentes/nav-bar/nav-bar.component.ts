import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    private dbService: DbService,
    private toastr: ToastrService) { }

  backup() {
    this.dbService.exportarDb().subscribe({
      next: (data) => {
        this.toastr.success(data , 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });

      },
      error: (error) => {
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        console.log(error.error);
      }
    });
  }
 asociar() {
    this.dbService.asociar().subscribe({
      next: (data) => {
        this.toastr.success(data, 'OK', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });

      },
      error: (error) => {
        this.toastr.error(error.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-bottom-center'
        });
        console.log(error.error);
      }
    });
  }
}