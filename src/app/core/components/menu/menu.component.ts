import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  user: UserModel = null;
  currentUserSubscription: Subscription;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.IsAuthenticated$;
    this.currentUserSubscription = this.authService.CurrentUser$.subscribe(user => {
      this.user = user;
    });
    console.log(this.user);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.authService.logout();
  }
}
