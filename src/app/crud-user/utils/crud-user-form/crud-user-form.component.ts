import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from 'src/app/interfaces/person';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-crud-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule,],
  templateUrl: './crud-user-form.component.html',
  styleUrls: ['./crud-user-form.component.css']
})
export class CrudUserFormComponent implements OnChanges {

  @Input() title = 'User Form';
  @Input() personInput: Person | undefined;
  @Output() person = new EventEmitter<Person>();

 
  userId: string | undefined;
  form = new FormGroup({
    givenName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    age: new FormControl(0, [Validators.required, Validators.min(18), Validators.max(120)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    photoURL: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    username: new FormControl('', [Validators.required]),
  })

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['personInput']?.currentValue){
      this.form.patchValue(changes['personInput'].currentValue)
    }
  }

  onSubmit(){
    this.person.emit(this.form.value as Person);
    //this.form.reset();
  }

  ngOnInit(): void {
   this.userId = localStorage.getItem('user_id') ?? undefined;

  }
}
