import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Post } from 'src/app/interfaces/post';
import { CrudPostSearchComponent } from '../../utils/crud-post-search/crud-post-search.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-read-post',
  standalone: true,
  imports: [
    CommonModule,
    CrudPostSearchComponent,
    MatCardModule,
  ],
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css'],
})
export class ReadPostComponent {
  foundPost: Post | undefined;

  constructor(private appService: AppService = Inject(AppService)) {}

  onPostFound(post: Post | undefined) {
    if (post) {
      this.foundPost = post;
    } else {
      this.foundPost = undefined;
    }
  }
}
