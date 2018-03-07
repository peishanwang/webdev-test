import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../../../models/user.model.client";
import {UserService} from "../../../services/user.service.client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username: String;
  password: String;
  confirmPassword: String;
  errorMsg = 'Passwords are different!';

  constructor(
    private userService: UserService,
    private router: Router) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password1;
    this.confirmPassword = this.registerForm.value.password2;

    if (this.password == this.confirmPassword) {
      const user = new User(undefined, this.username, this.password, undefined, undefined);
      this.userService.createUser(user);

      return this.userService.createUser(user).subscribe(
        (user: User) => {
          this.router.navigate(['user/', user._id]);
        }
      );
    } else {
      alert(this.errorMsg);
    }
  }

  addNewUser() {

  }

  ngOnInit() {
  }

}
