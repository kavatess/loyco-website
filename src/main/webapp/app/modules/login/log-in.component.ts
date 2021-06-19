import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
@Component({
  selector: 'ly-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  user_name = '';
  pass_word = '';
  error = false;
  btnClicked = false;
  constructor(private authService: AuthService) {}
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
  login(): void {
    this.btnClicked = true;
    if (this.user_name.length && this.pass_word.length) {
      this.error = false;
      this.authService.login(this.user_name, this.pass_word);
      return;
    }
    this.btnClicked = false;
    this.error = true;
  }
  ngOnInit(): void {}
}
