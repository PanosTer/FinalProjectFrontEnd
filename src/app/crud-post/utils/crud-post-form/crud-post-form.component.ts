import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-crud-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule,],
  templateUrl: './crud-post-form.component.html',
  styleUrls: ['./crud-post-form.component.css']
})
export class CrudPostFormComponent implements OnChanges {
  @Input() title = 'Post Form';
  @Input() postInput: Post | undefined;
  @Output() post = new EventEmitter<Post>();

  form = new FormGroup({
    postTitle: new FormControl('', Validators.required),
    postText: new FormControl('', Validators.required),
    photoURL: new FormControl(null),
  })

  ngOnChanges(changes: SimpleChanges): void {
        if(changes['postInput']?.currentValue){
      this.form.patchValue(changes['postInput'].currentValue);
    }
  }

  onSubmit(){
    this.post.emit(this.form.value as Post);
    //this.form.reset();    
  }
}
