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
  id: number =0;
  constructor(private apiService: ApiService,
    private router : Router,
    private route: ActivatedRoute){}

  public userForm : any = new FormGroup({
    id: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    console.log('id = ', this.id);
    if (this.id > 0) {
      this.loadData(this.id);
    }
  }

  public onSubmit(): void{
    var user : User = {
      id: this.userForm.get('id')?.value,
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
      email: this.userForm.get('email')?.value,
      order: []
    };

    if(this.id>0){
      this.apiService.updateUser(this.id,user as User).subscribe( (data) => {
        console.log('Cap nhat User' + data);
        this.router.navigate(['Users']);
      });
    } else {
      this.apiService.createUser(user as User).subscribe( (data) => {
        console.log('Them nguoi moi' + data);
        this.router.navigate(['Users']);
      });
    }
  }

  private loadData(id: number): void {
    console.log('load data', id);
    this.apiService.getUserById(id).subscribe((data) => {
      console.log('get user: ', data);
      this.userForm.patchValue(data);
    });
  }
}
