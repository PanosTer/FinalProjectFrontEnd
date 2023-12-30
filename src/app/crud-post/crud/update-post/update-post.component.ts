import { Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudPostSearchComponent } from '../../utils/crud-post-search-criteria/crud-post-search-criteria.component';
import { Post } from 'src/app/interfaces/post';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';
import { AppService } from 'src/app/app.service';
import { MatCardModule } from '@angular/material/card';
import {NotificationHandlerComponent} from '../../../notification-handler/notification-handler.component';
import { AuthGuard } from '../../../auth.guard';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [
    CommonModule,
    CrudPostSearchComponent,
    CrudPostFormComponent,
    MatCardModule,
    NotificationHandlerComponent
  ],
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent {
  foundPost: Post | undefined;
  postId: any;

  constructor(
    private appService: AppService = Inject(AppService),
    private notificationHandler : NotificationHandlerComponent,
    private AuthGuard: AuthGuard
  ) {}

  onPostFound(post: Post | undefined) {
    if (post) {
      this.foundPost = post;
      this.postId = post._id;
    } else {
      this.foundPost = undefined;
    }
  }

  onUpdate(post: Post) {
    this.AuthGuard.canActivate();
    post.photoURL = post.photoURL?.length ==0 ? undefined : post.photoURL;
    this.appService.updatePost(post, this.postId).subscribe((post) => {
      this.notificationHandler.onNotification('Post updated successfully!', 'top', 3);
      this.foundPost = undefined;
    }, err => {
      this.notificationHandler.onNotification(err.error.message, 'top', 3);
    });
  }
}
