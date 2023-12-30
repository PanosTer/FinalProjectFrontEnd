import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person, ChangePassword } from 'src/app/interfaces/person';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { NotificationHandlerComponent } from 'src/app/notification-handler/notification-handler.component';
import { AuthGuard } from '../../../auth.guard';


@Component({
  selector: 'app-update-user-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule,],
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.css'],
})
export class UpdateUserPasswordComponent implements OnChanges {

  @Input() title = 'Update Password';
  @Input() personInput: Person | undefined;
  @Output() person = new EventEmitter<Person>();

 
  userId: string | undefined;
  form = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
  })

  constructor(
    private appService: AppService = Inject(AppService),
    private router: Router,
    private notificationHandler : NotificationHandlerComponent,
    private AuthGuard: AuthGuard
) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['personInput']?.currentValue){
      this.form.patchValue(changes['personInput'].currentValue)
    }
  }

  onSubmit(){
    this.AuthGuard.canActivate();
    this.appService.updateUserPassword(this.form.value as ChangePassword).subscribe(() => {
      this.router.navigate(['/home']);
    }, err =>{
      this.notificationHandler.onNotification(err.error.message, 'top', 3)});
      this.person.emit(this.form.value as Person);
  }
    
    
  
}
