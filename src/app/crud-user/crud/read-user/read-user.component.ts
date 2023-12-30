import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppService, RowDetailService } from 'src/app/app.service';
import { Person } from 'src/app/interfaces/person';
import { CrudUserSearchComponent } from '../../utils/crud-user-search/crud-user-search.component';
import { MatCardModule } from '@angular/material/card';
import { AuthGuard } from '../../../auth.guard';
import { RoleHandlerComponent } from '../../../role-handler/role-handler.component';



@Component({
  selector: 'app-read-user',
  standalone: true,
  imports: [
    CommonModule,
    CrudUserSearchComponent,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css'],
})
export class ReadUserComponent {
  foundUser: Person | undefined;
  isAdmin$: boolean | undefined;

  constructor(
    private appService: AppService = Inject(AppService),
    private AuthGuard: AuthGuard,
    private RoleHandlerComponent: RoleHandlerComponent


  ) {}

  onUserFound(user: Person | undefined) {
    if (user) {
      this.foundUser = user;
    } else {
      this.foundUser = undefined;
    }
  }

  ngOnInit(): void {
    this.isAdmin$ = this.RoleHandlerComponent.isAdmin();
    this.AuthGuard.canActivate();
    const id = localStorage.getItem('user_id') ?? '';
    this.appService.getUserById(id).subscribe({
      next: (user) => {
      if (user) {
        this.foundUser = user;
      } else {
        this.foundUser= undefined;
      }},
      error: (error) => {
        console.log(error)
      },
      complete: () => {'Delete Operation Completed'}
    });
  }
}