import { Component, EventEmitter, Inject,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudUserSearchComponent } from '../../utils/crud-user-search/crud-user-search.component';
import { Person } from 'src/app/interfaces/person';
import { CrudUserFormComponent } from '../../utils/crud-user-form/crud-user-form.component';
import { AppService, RowDetailService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';
import { AuthGuard } from '../../../auth.guard';


@Component({
  selector: 'app-update-user-from-list',
  standalone: true,
  imports: [
    CommonModule,
    CrudUserSearchComponent,
    CrudUserFormComponent,
    MatCardModule,
  ],
  templateUrl: './update-user-from-list.component.html',
  styleUrls: ['./update-user-from-list.component.css'],
})
export class UpdateUserListComponent {
  //@Input() userFound: Person | undefined;
  @Input() public userFound : Person | undefined;
  foundUser: Person | undefined;
  data: Person | undefined;
  userId : string | undefined;

  constructor(
    private appService: AppService = Inject(AppService),
    private router: Router,
    private rowDetailService: RowDetailService,
    private notificationHandler : NotificationHandlerComponent,
    private AuthGuard: AuthGuard

  ) {}

  ngOnInit() {
    
    this.rowDetailService.rowDetail$.subscribe(row => {
      this.userFound = row;
      this.userId = row._id;
  });
  }

  onUpdate(user: Person) {
    this.AuthGuard.canActivate();
    const id = this.userId || '';
    user.photoURL = user.photoURL?.length ==0 ? undefined : user.photoURL;
    this.appService.updateUser(user, id).subscribe((user) => {
      this.router.navigate(['/crud-user/list']);
    }, err =>{
      this.notificationHandler.onNotification(err.error.message, 'top', 3)}
    );
  }
}
