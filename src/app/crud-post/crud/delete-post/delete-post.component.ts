import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/interfaces/post';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { CrudPostSearchComponent } from '../../utils/crud-post-search-criteria/crud-post-search-criteria.component';
import { DangerAreYouSureComponent } from '../../utils/danger-are-you-sure/danger-are-you-sure.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';
import { AuthGuard } from '../../../auth.guard';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [CommonModule, CrudPostSearchComponent, DangerAreYouSureComponent, MatCardModule],
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent {
  @Output() postDeleted = new EventEmitter();
  foundPost: Post | undefined;
  postNotFound = false;
  @ViewChild('postId') postIdInput!: ElementRef<HTMLInputElement>;

  constructor(
    private appService: AppService = Inject(AppService),
    private http: HttpClient = Inject(HttpClient),
    private router: Router = Inject(Router),
    private notificationHandler : NotificationHandlerComponent,
    private AuthGuard: AuthGuard
  ){}

  onPostFound(post: Post | undefined){
    this.foundPost = post;
  }

  onConfirm(iamSure: boolean){
    if(iamSure && this.foundPost){
      this.AuthGuard.canActivate();
      const id = this.foundPost._id ?? ''
      this.appService.deletePost(id).subscribe({
        next: (post) => {
          this.postNotFound = false;
          this.notificationHandler.onNotification("Success Delete Post", 'top', 3);
          this.postDeleted.emit();
          this.router.navigate(['crud-post/read-user-posts']);
        },
        error: (error) => {
          console.log(error)
          this.notificationHandler.onNotification(error.error.message, 'top', 3);
          this.postNotFound = true;
        },
        complete: () => {'Delete Operation Completed'}
      })
    }else{
      this.foundPost = undefined;
    }
  }

}
