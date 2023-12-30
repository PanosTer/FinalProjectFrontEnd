import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'notification-handler',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './notification-handler.component.html',
  styleUrls: ['./notification-handler.component.css'],
})
export class NotificationHandlerComponent {
  @Output() postCreated = new EventEmitter();
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  constructor(
    private _snackBar: MatSnackBar,

  ){}

  public onNotification(message: string, verticalPosition : any, duration: number){
      this._snackBar.open(message,"Ok",{
        verticalPosition : verticalPosition,
        duration: duration * 1000,
      })
    }
  
  }


    
