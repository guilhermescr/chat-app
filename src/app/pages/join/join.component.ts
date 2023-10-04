import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent {
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (localStorage.getItem('username')) {
      alert(
        "You're already logged in. Please, log out before coming to this page."
      );
      
      this.router.navigateByUrl('/chat');
    }
  }

  joinForm = this.fb.group({
    username: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(16)],
    ],
    isNewAccount: [true, [Validators.required]],
  });

  ngOnInit(): void {
    this.joinForm.valueChanges.subscribe(() => (this.errorMessage = ''));
  }

  submitUsername(): void {
    if (this.joinForm.valid) {
      const { username, password, isNewAccount } = this.joinForm.value;

      const isNewAccountAndIsRegisteredInDatabase =
        this.joinForm.value.isNewAccount &&
        this.authService.checkIfUserIsRegisteredInDatabase(
          this.joinForm.value.username!
        );

      const isNotNewAccountAndIsNotRegisteredInDatabase =
        !this.joinForm.value.isNewAccount &&
        !this.authService.checkIfUserIsRegisteredInDatabase(
          this.joinForm.value.username!
        );
      const isUsernameOrPasswordIncomplete =
        !this.authService.isUserDataEqualToOneOfTheRegisteredOnes({
          username: this.joinForm.value.username!,
          password: this.joinForm.value.password!,
        });

      if (isNewAccountAndIsRegisteredInDatabase) {
        this.errorMessage = 'This account already exists.';
      } else if (isNotNewAccountAndIsNotRegisteredInDatabase) {
        this.errorMessage = 'This account does not exist.';
      } else if (!isNewAccount && isUsernameOrPasswordIncomplete) {
        this.errorMessage = 'Username or Password is incorrect.';
      } else {
        this.errorMessage = '';

        this.authService.handleAuthentication(
          { username: username!, password: password! },
          !!isNewAccount
        );
      }
    } else {
      this.errorMessage = this.joinForm.controls.username.invalid
        ? 'You must provide a username and password.'
        : 'Password must have at least 8 characters.';
    }
  }
}
