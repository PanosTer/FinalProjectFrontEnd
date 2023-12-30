import { Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudUserSearchComponent } from '../../utils/crud-user-search/crud-user-search.component';
import { Person } from 'src/app/interfaces/person';
import { CrudUserFormComponent } from '../../utils/crud-user-form/crud-user-form.component';
import { AppService, RowDetailService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';
import { AuthGuard } from '../../../auth.guard';
import { RoleHandlerComponent } from '../../../role-handler/role-handler.component';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    CrudUserSearchComponent,
    CrudUserFormComponent,
    MatCardModule
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  foundUser: Person | undefined;

  constructor(
    private appService: AppService = Inject(AppService),
    private router: Router,
    private notificationHandler : NotificationHandlerComponent,
    private AuthGuard: AuthGuard,
    private RoleHandlerComponent: RoleHandlerComponent


  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id') ?? '';
    this.AuthGuard.canActivate();
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

  onUpdate(user: Person) {
    this.AuthGuard.canActivate();
    const id = localStorage.getItem('user_id') ?? '';
    const isAdmin = this.RoleHandlerComponent.isAdmin();
    
    user.photoURL = user.photoURL?.length ==0 ? undefined : user.photoURL;
    this.appService.updateUser(user, id).subscribe((user) => {
      if (isAdmin){
        this.router.navigate(['/crud-user/list']);
      }else{
        this.router.navigate(['/crud-user/read']);
      }
    }, err =>{
      this.notificationHandler.onNotification(err.error.message, 'top', 3)});
  }
}
