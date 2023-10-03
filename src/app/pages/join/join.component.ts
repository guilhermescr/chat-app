import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent {
  // errorMessages: string[] = [
  //   'This account already exists.',
  //   'Username or Password is invalid.',
  // ];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    if (localStorage.getItem('username')) {
      this.authService.logOutUser();
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
    // this.joinForm.valueChanges.subscribe((data) => {});
  }

  submitUsername(): void {
    if (
      this.joinForm.value.isNewAccount &&
      this.authService.checkIfUserIsRegisteredInDatabase(
        this.joinForm.value.username!
      )
    ) {
      console.log('already exists.');
    }

    return;

    if (this.joinForm.valid) {
      const { username, password, isNewAccount } = this.joinForm.value;

      this.authService.handleAuthentication(
        { username: username!, password: password! },
        !!isNewAccount
      );
    }
  }
}
