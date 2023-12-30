import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService, RowDetailService} from 'src/app/app.service';
import { Post } from 'src/app/interfaces/post';
import { CrudPostSearchByUserIdComponent } from '../../utils/crud-post-search-userid/crud-post-search-userid.component';
import { MatCardModule } from '@angular/material/card';
import { CrudPostFormComponent } from '../../utils/crud-post-form/crud-post-form.component';
import { CrudPostSearchComponent } from '../../utils/crud-post-search/crud-post-search.component';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';
import { AuthGuard } from '../../../auth.guard';


@Component({
  selector: 'app-read-user-posts',
  standalone: true,
  imports: [
    CommonModule,
    CrudPostSearchByUserIdComponent,
    MatCardModule,
    CrudPostFormComponent,
    CrudPostSearchComponent
  ],
  templateUrl: './read-user-posts.component.html',
  styleUrls: ['./read-user-posts.component.css'],
})
export class ReadUsersPostComponent implements OnInit{
  posts: any;
  foundPost: any;
  postId: any;
  foundUsersPosts : any;

  @Output() postFound = new EventEmitter<Post | undefined>();  
  constructor(
    private appService: AppService = Inject(AppService),
    private rowDetailService: RowDetailService,
    private notificationHandler : NotificationHandlerComponent,
    private AuthGuard: AuthGuard
    ) {}

  ngOnInit() {
    this.AuthGuard.canActivate();
    const id = localStorage.getItem('user_id') ?? '';
    this.rowDetailService.setRowDetail({fromUserPost:true});
    this.appService.getPostByUserId(id).subscribe({
      next : (post) => {
        if (post) {
          this.posts = post;
        } else {
          this.posts= [];
        }},
        error: (error) => {
          console.log(error)
        },
        complete: () => {'Delete Operation Completed'}

      
    });
}

onDeletePost(id: string){
  var deleteUser = window.confirm('Are you absolutely sure you want to delete?');
  if (deleteUser) {
      this.AuthGuard.canActivate();
      this.appService.deletePost(id).subscribe({
        next: (user) => {
          window.location.reload() 
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {'Delete Operation Completed'}
      })
    }    
}

onUpdatePost(title : string, id : string){
  this.AuthGuard.canActivate();
  const userId = localStorage.getItem('user_id') || '';
  this.appService.getPostByPostTitlerUserId(userId, title).subscribe({
    next: (post) => {
      this.foundPost = post;
      this.postId = id;
      this.postFound.emit(this.foundPost);
    },
    error: (error) => {
      this.foundPost = undefined;
      this.notificationHandler.onNotification(error.message, 'top', 3);
    },
    complete: () => {
      console.log('Operation Completed');
    },
  });
}

onUpdate(post: Post) {
  post.photoURL = post.photoURL?.length ==0 ? undefined : post.photoURL;
  this.appService.updatePost(post, this.postId).subscribe((post) => {
    window.location.reload()
  }, err => {
   this.notificationHandler.onNotification(err.error.message, 'top', 3);
  });
}

onPostFound(post: Post | undefined) {
  if (post) {
    this.foundUsersPosts = post;
  } else {
    this.foundUsersPosts = undefined;
  }
}
}


