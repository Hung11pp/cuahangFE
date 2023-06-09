import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { ApiService } from '../api-service.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[] = [];
  constructor(private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.apiService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
  addUser(): void {
    this.router.navigate(['user-form']);
  }
  updateUser(id: number, user: User): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { id: id }
    };
    this.router.navigate(['user-form'], navigationExtras);

    this.apiService.updateUser(id, user).subscribe(updatedUser => {
      // Xử lý khi cập nhật user thành công
      console.log('User updated:', updatedUser);
      // Refresh danh sách user
      this.getUsers();
    });
  }
  deleteUser(id: number): void {
    this.apiService.deleteUser(id).subscribe(() => {
      // Xử lý khi xóa user thành công
      console.log('User deleted');
      // Refresh danh sách user
      this.getUsers();
    });
  }
}
