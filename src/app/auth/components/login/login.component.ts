import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(["/"]);
        this.reloadPage();
      },
      err => {
        this.isLoginFailed = true;
        this.errorMessage = "Nieznany błąd, spróbuj ponownie później"

        if (err.status === 401) {
          this.errorMessage = err.error.message;
        }

      }
    );
  }

  reloadPage(): void {
    window.location.replace('/');
  }
}
