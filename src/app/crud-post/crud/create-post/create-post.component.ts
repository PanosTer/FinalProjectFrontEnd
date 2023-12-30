import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/interfaces/post';
import { AppService } from 'src/app/app.service';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {NotificationHandlerComponent} from '../../../notification-handler/notification-handler.component';
import { AuthGuard } from '../../../auth.guard';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, CrudPostFormComponent, MatCardModule, NotificationHandlerComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter();
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  constructor(
    private appService: AppService = Inject(AppService),
    private _snackBar: MatSnackBar,
    private router : Router,
    private notificationHandler : NotificationHandlerComponent,
    private AuthGuard: AuthGuard
  ){}

  onPost(post: Post){
    this.AuthGuard.canActivate();
    post.photoURL = post.photoURL?.length ==0 ? undefined : post.photoURL;
    const username = localStorage.getItem('username') ?? '';
    post.username = username;
    this.appService.addPost(post).subscribe(post => {
      this.notificationHandler.onNotification('Post created successfully!', 'top', 3);
      this.router.navigate(["/crud-post/read-user-posts"])
      this.postCreated.emit();
    }, err => {
      this.notificationHandler.onNotification(err.error.message, 'top', 3);
    });
  }      
}
