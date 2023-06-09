import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api-service.service';
import { User } from '../model/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  userId: number | undefined;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.apiService.getUserById(this.userId).subscribe(user => {
          this.userForm.setValue({
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email
          });
        });
      }
    });
  }

  onSubmit(): void {
    const user: User = this.userForm.value;
    if (this.userId) {
      this.apiService.updateUser(this.userId, user).subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
        this.router.navigate(['Users']);
      });
    } else {
      this.apiService.createUser(user).subscribe(createdUser => {
        console.log('New user created:', createdUser);
        this.router.navigate(['Users']);
      });
    }
  }
}
