import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService, RowDetailService } from 'src/app/app.service';
import { Post } from 'src/app/interfaces/post';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../auth.guard';

@Component({
  selector: 'app-crud-post-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './crud-post-search.component.html',
  styleUrls: ['./crud-post-search.component.css'],
})
export class CrudPostSearchComponent {
  foundPost: Post | any;
  @Output() postFound = new EventEmitter<Post | undefined>();
  @Input() fromUsersPost: boolean | undefined;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(private appService: AppService = Inject(AppService),
  private rowDetailService: RowDetailService,
  private router: Router = Inject(Router),
  private AuthGuard: AuthGuard
  ) {}

  ngOnInit() {
    this.rowDetailService.rowDetail$.subscribe(row => {
      this.fromUsersPost = row ? row.fromUserPost: false;
    });
  }

 reloadPage() {
    window.location.reload() 
  }

  onSearch() {
    const title = this.form.controls.title.value ?? '';
    this.appService.getAllPostsRegex(title).subscribe({
      next: (post) => {
        this.foundPost = post;
        this.postFound.emit(this.foundPost);
      },
      error: (error) => {
        this.foundPost = undefined;
        this.postFound.emit(this.foundPost);
      },
      complete: () => {
        console.log('Operation Completed');
      },
    });
  }

  onSearchForUsersPosts() {
    this.AuthGuard.canActivate();
    const title = this.form.controls.title.value ?? '';
    const userId = localStorage.getItem('user_id') || '';
    this.appService.getUsersPostsRegex(userId, title).subscribe({
      next: (post) => {
        this.foundPost = post;
        this.postFound.emit(this.foundPost);
      },
      error: (error) => {
        this.foundPost = undefined;
        this.postFound.emit(this.foundPost);
      },
      complete: () => {
        console.log('Operation Completed');
      },
    });
  }
}