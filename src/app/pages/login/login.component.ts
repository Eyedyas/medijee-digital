import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public studentId: number;
  response: any;
  public instituteId: any;
  public branchId: number;
  Capture: string;
  user: any;
  registerMode: boolean = true;
  DownloadImage = environment.DownloadImage;

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private userService: UserService,
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private service: CommonService) {
    this.instituteId = this.service.iid;

    console.log('this.router.url', this.router.url);
    this.userService.user.subscribe(user => {
      this.user = user;
    })
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      remember: [true, Validators.compose([Validators.required])],
      institute_id: [environment.instituteId, Validators.compose([Validators.required])],
      login_type: ['token_student_login', Validators.compose([Validators.required])] //token_student_login
    });
  }

  async onSubmit(m: FormGroup) {
    console.log('fun call................')
    this.userService.onLogin(m).subscribe((res: any) => {

      this.response = res;
      if (this.response.Message === 'AlreadyLogin') {
        this.userService.showToast('You are already login!');
        return;
      }
      if (this.response.Message === 'PasswordMismatch') {
        this.userService.showToast('Please enter valid details!');
        return;
      }
      if (this.response.Message === 'Invalid') {
        this.userService.showToast('Please enter valid details!');
        return;
      }

      else if (this.response.Message === 'Login successful!') {
        this.router.navigateByUrl('home')
        if (this.response.Item != null) {
          const user = this.response.Item;

          this.userService.user.next(this.response.Item);
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.getStudentProfile();
        }
        else {
          this.userService.showToast('Login failed due to server error!');
          return;
        }
      }
      return this.response
    }
    );

  }

  removeToken(student_id: any) {
    this.userService.removeToken(student_id).subscribe((result) => {
    });
  }

  getStudentProfile() {
    this.userService.getStudentProfile(this.user.student_id).subscribe((resp) => {
      this.userService.studentName.next(resp.Item.name);
      localStorage.setItem('myProfile', JSON.stringify(resp.Item));
      if (resp.Item.picture == null) {
        this.userService.studentImage.next('assets/imgs/blank-avatar.png');
      }
      else {
        this.userService.studentImage.next(this.DownloadImage + '' + resp.Item.picture);
      }
    });
  }
}