import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/interfaces/person';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthGuard } from '../../../auth.guard';


@Component({
  selector: 'app-crud-user-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './crud-user-search.component.html',
  styleUrls: ['./crud-user-search.component.css'],
})
export class CrudUserSearchComponent {
  foundUser: Person | undefined;
  @Output() userFound = new EventEmitter<Person | undefined>();

  form = new FormGroup({
    id: new FormControl('', Validators.required),
  });

  constructor(private appService: AppService = Inject(AppService),
  private AuthGuard: AuthGuard

  ) {}

  onSearch() {
    this.AuthGuard.canActivate();
    const username = this.form.controls.id.value ?? '';
    this.appService.getUserName(username).subscribe({
      next: (user) => {
        this.foundUser = user;
        this.userFound.emit(this.foundUser);
      },
      error: (error) => {
        this.foundUser = undefined;
        this.userFound.emit(this.foundUser);
      },
      complete: () => {
        console.log('Operation Completed');
      },
    });
  }
}