import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: 'login.component.html',
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user: UserModel = new UserModel();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<LoginComponent>,
        private authService: AuthService,
        private alertService: AlertService) {
            this.loginForm = this.formBuilder.group({
            'username': [this.user.username, Validators.required],
            'password': [this.user.password, Validators.required]
        });
        this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        }

    ngOnInit() {
        
    }
    
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.login();
    }

    login(): void {
        if ((this.authService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                    this.dialogRef.close();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                })))
        this.dialogRef.close();
    }
}
