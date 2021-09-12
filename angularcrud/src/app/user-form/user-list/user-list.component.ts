import { Component, OnInit } from '@angular/core';

import { UserModel } from '../user-model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  userId: string = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.getUserList();
    this.route.params.subscribe(
      data => {this.userId = data.id;}
    );
    this.userService.userListChanged.subscribe(
      (list: UserModel[]) => {
        this.users = list;
      }
    )
  }

  getUserList() {
    this.userService.getUsersLists().subscribe(
      data => {
        console.log(data);
        this.userService.getSubUserList(data);
      }
    );
  }


  editUserList(userObj:UserModel) {
    this.userService.userListSelected.emit(userObj);
  }

  deleteUserList(id:number) {
    this.userService.deleteUserList(id).subscribe(
      id => {
        console.log(id);
      }
    )
  }

}
