import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from 'src/app/interfaces/person';
import { AppService } from 'src/app/app.service';
import { CrudUserFormComponent } from '../../utils/crud-user-form/crud-user-form.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, CrudUserFormComponent, MatCardModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  @Output() userCreated = new EventEmitter();
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  constructor(
    private appService: AppService = Inject(AppService),
    private _snackBar: MatSnackBar,
    private router: Router,
    private notificationHandler : NotificationHandlerComponent
  ){}

  onUser(user: Person){
    user.photoURL = user.photoURL?.length ==0 ? undefined : user.photoURL;
    this.appService.addUser(user).subscribe(user => {
      this.notificationHandler.onNotification('User created successfully!', 'top', 3);
      this.router.navigate(["/login"])
      this.userCreated.emit();
    }, err => {
      this.notificationHandler.onNotification(err.error.message, 'top', 3);
    });
  }
}
