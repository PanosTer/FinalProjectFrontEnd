import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService, RowDetailService } from 'src/app/app.service';
import { Person } from 'src/app/interfaces/person';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DangerAreYouSureComponent } from '../../utils/danger-are-you-sure/danger-are-you-sure.component';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../auth.guard';


@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatCardModule, DangerAreYouSureComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @Output() sendUser  = new EventEmitter<Person>();
  @Output() deleteUser = new EventEmitter<string>();
  @Output() public userFound = new EventEmitter<Person | undefined>();

  users: Person[] = [];
  foundUser: Person | undefined;
  dataSource!: MatTableDataSource<Person>;

  mobileColumns: string[] = ['givenName', 'surName', 'photoURL', 'action'];
  tabletColumns: string[] = [ 'givenName', 'surName', 'age', 'photoURL', 'action'];
  desktopColumns: string[] = [
    'givenName',
    'surName',
    'age',
    'email',
    'address',
    'photoURL',
    'username',
    'action'

  ];
  displayedColumns: string[] = this.desktopColumns;

  constructor(
    private appService: AppService = Inject(AppService),
    private breakpointObserver: BreakpointObserver,
    private router: Router = Inject(Router),
    private rowDetailService: RowDetailService,
    private AuthGuard: AuthGuard
    
  ) {}

  ngOnInit(): void {
    this.AuthGuard.canActivate();
    this.appService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource<Person>(this.users);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {'Delete Operation Completed'}
    
    });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.displayedColumns = this.mobileColumns;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.displayedColumns = this.tabletColumns;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.displayedColumns = this.tabletColumns;
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.displayedColumns = this.desktopColumns;
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.displayedColumns = this.desktopColumns;
        }
      });
  }

  onSendUser(user: Person){
    this.sendUser.emit(user);
  }

  onDeleteUser(i: string){
    this.AuthGuard.canActivate();
    var deleteUser = window.confirm('Are you absolutely sure you want to delete?');
    if (deleteUser) {
        this.appService.deleteUser(i).subscribe({
          next: (user) => {
            this.deleteUser.emit();
            window.location.reload() 
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {'Delete Operation Completed'}
        })
      }    
  }

  onUpdateUser(id : string){
    this.AuthGuard.canActivate();
    this.appService.getUserById(id).subscribe({
      next: (user) => {
        this.rowDetailService.setRowDetail(user);
        this.router.navigate(["crud-user/update-from-list"])
      
      },
      error: (error) => {
        this.foundUser = undefined;
      },
      complete: () => {
        console.log('Operation Completed');
      },
    });
  }

}