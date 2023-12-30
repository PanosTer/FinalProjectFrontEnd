
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Person, ChangePassword } from './interfaces/person';
import { Post } from './interfaces/post';
import { Credentials } from './interfaces/credentials';
import { JWTToken } from './interfaces/jwttoken';
import { BehaviorSubject, Observable } from 'rxjs';

const NESTJS_API = 'http://localhost:3001/'


@Injectable()
export class RowDetailService {
  rowDetailSource: BehaviorSubject<any> = new BehaviorSubject(null);
  rowDetail$: Observable<any> = this.rowDetailSource.asObservable();
  setRowDetail(detail:any) {
      this.rowDetailSource.next(detail);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  isLoggedIn= localStorage.getItem('access_token') ? new BehaviorSubject<boolean>(true) : new BehaviorSubject<boolean>(false);
  fullname= localStorage.getItem('fullname') ? new BehaviorSubject<string>(localStorage.getItem('fullname') || '') : new BehaviorSubject<string>('');
  photoUrl= localStorage.getItem('photoUrl') ? new BehaviorSubject<string>(localStorage.getItem('photoUrl') || '') : new BehaviorSubject<string>('');


  constructor(private http: HttpClient = inject(HttpClient)
  ) { }

  getAllUsers(){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Person[]>('http://localhost:3001/users',{ headers })
  }

  getUserById(id:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Person>(`http://localhost:3001/users/${id}`,{ headers })
  }

  getUserName(username:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Person>(`http://localhost:3001/users/username/${username}`,{ headers })
  }

  addUser(user: Person){
    return this.http.post<Person>('http://localhost:3001/users', user)
  }

  deleteUser(id:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.delete<Person>(`http://localhost:3001/users/${id}`, { headers })
  }

  updateUser(user: Person, id: string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.put<Person>(`http://localhost:3001/users/${id}`, user, { headers })
  }

  updateUserPassword(user: ChangePassword){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.put<Person>(`http://localhost:3001/users/password/change`, user, { headers })
  }

  // NestJS calls

  login(credentials: Credentials){
    return this.http.post<JWTToken>(`${NESTJS_API}auth/login`, credentials);
  }

  logout() {
    this.isLoggedIn.next(false);
    this.fullname.next('');
    this.photoUrl.next('');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('access_token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('photoUrl');
  }

  /************************************ post **********************************/

  getAllPosts(){
    return this.http.get<Post[]>('http://localhost:3001/posts')
  }

  getAllPostsRegex(postTitle: string){
    return this.http.get<Post[]>(`http://localhost:3001/posts/title/regex?postTitle=${postTitle}`)
  }

  getUsersPostsRegex(userId: string,  postTitle: string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Post[]>(`http://localhost:3001/posts/title/userid/regex?postTitle=${postTitle}&userId=${userId}`,{ headers })
  }

  getPostByUserId(id:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Post>(`http://localhost:3001/posts/userId/${id}`,{ headers })
  }

  getPostByPostTitlerUserId(id:string, postTitle:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Post>(`http://localhost:3001/posts/title/userId?postTitle=${postTitle}&userId=${id}`,{ headers })
  }

  getPostByTitle(title: string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Post>(`http://localhost:3001/posts/${title}`,{ headers })
  }

  addPost(post: Post){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.post<Post>('http://localhost:3001/posts/', post, { headers })
  }

  deletePost(id:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    const postId = localStorage.getItem('post_id')
    return this.http.delete<Post>(`http://localhost:3001/posts/${id}`, { headers })
  }

  updatePost(post: Post, postId: string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.put<Post>(`http://localhost:3001/posts/${postId}`, post, { headers })
  }
}
