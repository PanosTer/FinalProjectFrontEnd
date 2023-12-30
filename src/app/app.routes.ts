import { Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { CreateUserComponent } from "./crud-user/crud/create-user/create-user.component";
import { ReadUserComponent } from "./crud-user/crud/read-user/read-user.component";
import { UpdateUserComponent } from "./crud-user/crud/update-user/update-user.component";
import { UpdateUserPasswordComponent } from "./crud-user/crud/update-user-password/update-user-password.component";
import { DeleteUserComponent } from "./crud-user/crud/delete-user/delete-user.component";
import { CreatePostComponent } from "./crud-post/crud/create-post/create-post.component";
import { ReadPostComponent } from "./crud-post/crud/read-post/read-post.component";
import { UpdatePostComponent } from "./crud-post/crud/update-post/update-post.component";
import { DeletePostComponent } from "./crud-post/crud/delete-post/delete-post.component";
import { ListPostsComponent } from "./crud-post/utils/list-post/list-post.component";
import { ListUsersComponent } from "./crud-user/utils/list-users/list-users.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { ReadUsersPostComponent } from "./crud-post/crud/read-user-posts/read-user-posts.component";
import { UpdateUserListComponent } from "./crud-user/crud/update-user-from-list/update-user-from-list.component";
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'crud-user/create', component: CreateUserComponent },
  {path: 'crud-user/read', component: ReadUserComponent, canActivate: [AuthGuard]},
  {path: 'crud-user/update', component: UpdateUserComponent , canActivate: [AuthGuard]},
  {path: 'crud-user/update-password', component: UpdateUserPasswordComponent},
  {path: 'crud-user/delete', component: DeleteUserComponent , canActivate: [AuthGuard]},
  {path: 'crud-user/list', component: ListUsersComponent , canActivate: [AuthGuard]},
  {path: 'crud-post/create', component: CreatePostComponent , canActivate: [AuthGuard]},
  {path: 'crud-post/read', component: ReadPostComponent , canActivate: [AuthGuard]},
  {path: 'crud-post/update', component: UpdatePostComponent , canActivate: [AuthGuard]},
  {path: 'crud-post/delete', component: DeletePostComponent , canActivate: [AuthGuard]},
  {path: 'crud-post/list', component: ListPostsComponent},
  {path: 'crud-post/read-user-posts', component: ReadUsersPostComponent , canActivate: [AuthGuard]},
  {path: 'crud-user/update-from-list', component: UpdateUserListComponent , canActivate: [AuthGuard]}];