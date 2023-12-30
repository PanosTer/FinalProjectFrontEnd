import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-role-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-handler.component.html',
  styleUrls: ['./role-handler.component.css']
})
export class RoleHandlerComponent {

  constructor(
    private jwtHelperService: JwtHelperService = Inject(JwtHelperService),
    ){}

  isAdmin() {
    const access_token = localStorage.getItem('access_token') || '';
    const decoded_token = this.jwtHelperService.decodeToken(
      access_token
    );
    if (decoded_token.isAdmin) {
      return true;
    } else {
      return false;
    }
  }

}