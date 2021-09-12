import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from './user-model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  usersForm: FormGroup;
  editMode = false;
  editedItem: any;
  subUserLists: UserModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(){
    this.usersForm= new FormGroup({
      'name': new FormControl(null,Validators.required),
      'email': new FormControl(null),
      'phone': new FormControl(null),
    });

    this.onEditingUserList();
  }

  onEditingUserList() {
    this.userService.userListSelected.subscribe(
      (userobj: UserModel) => {
        this.editMode = true;
        this.editedItem = userobj;
        this.usersForm.setValue({
          'name': this.editedItem.name,
          'email': this.editedItem.email,
          'phone': this.editedItem.phone,
        })
      }
    )
  }

  OnSubmit() {
    if(this.usersForm.valid){
      if(!this.editMode){
        this.userService.addUserList(this.usersForm.value).subscribe(
          (response: UserModel) => {
            console.log(response);
            alert('Successfully added');
            this.userService.addList(response);
            this.onClear();
          },
          err => {console.log(err);}
        )
      }else{
        this.userService.updateUserList(this.editedItem.id,this.usersForm.value).subscribe(
          (response: UserModel) => {
            console.log(response);
            alert('Successfully Updated')
            this.userService.updateList(response.id,response);
            this.onClear();
          },
          err => {
            console.log(err);
          }
        )
      }
    }
  }

  onClear() {
    this.usersForm.reset();
    this.editMode = false;
  }
}
