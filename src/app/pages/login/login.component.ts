import { UserService } from './../../services/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, ModalController, AlertController } from '@ionic/angular';
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

  registration_form: FormGroup;
  userInfo: any = {};

  mobile: boolean = false;

  @HostListener("window:resize", [])
  onResize() {
    var width = window.innerWidth;
    if (width < 786) {
      this.mobile = true;
    }
    //console.log(width)
  }


  loginForm: FormGroup;
  public studentId: number;
  response: any;
  public instituteId: any;
  public branchId: number;
  Capture: string;
  user: any;
  registerMode: boolean = false;
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
    private __service: CommonService,
    public alertController: AlertController) {
    this.instituteId = environment.instituteId

    console.log('this.router.url', this.router.url);
    this.userService.user.subscribe(user => {
      this.user = user;
    })
  }


  ngOnInit(): void {
    console.log(environment.branch_id)
    this.registration_form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      login_email: ['', Validators.compose([Validators.required])],
      login_password: ['', Validators.compose([Validators.required])],
      fk_institute_id: [environment.instituteId, Validators.compose([Validators.required])],
      fk_branch_id: [environment.branch_id, Validators.compose([Validators.required])],
      // adding_source: ['mobile_app', Validators.compose([Validators.required])],
      Active: ['Active', Validators.compose([Validators.required])],
      is_active: ['true', Validators.compose([Validators.required])],
      cellphone: ['', Validators.compose([Validators.required])],

    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      remember: [true, Validators.compose([Validators.required])],
      institute_id: [environment.instituteId, Validators.compose([Validators.required])],
      login_type: ['token_student_login', Validators.compose([Validators.required])] //token_student_login
    });

  }

  ValidateEmail(mail: string) {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
      return false
    }
    return true
  }

  ValidatePhone(no: string) {
    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(no)) {
      return false
    }
    return true
  }
  gotoToPage() {
    this.__service.headerTitle.next('Login');
    this.navCtrl.navigateForward('/login');
  }

  async onSubmitReg(formvalue: { [x: string]: any; name: any; login_email: any; cellphone: any; login_password: any; }) {

    if (formvalue['name'] == '' || formvalue['login_email'] == '' || formvalue['cellphone'] == '' || formvalue['billing_address'] == '' || formvalue['billing_city'] == '' || formvalue['billing_state'] == '' || formvalue['billing_zip'] == '' || formvalue['billing_country'] == '' || formvalue['login_password'] == '') {
      this.__service.showToast('Please fill all the fields!', 'top', 3000)
      return false;
    }

    if (this.ValidateEmail(formvalue['login_email']) == false) {
      this.__service.showToast('You have entered an invalid email address!', 'top', 3000)
      return false;
    }

    if (this.ValidatePhone(formvalue['cellphone']) == false) {
      this.__service.showToast('You have entered an invalid phone number!', 'top', 3000)
      return false;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Creating your account...',
    });
    await loading.present();

    console.log(formvalue);

    this.userInfo.name = formvalue.name;
    this.userInfo.login_email = formvalue.login_email;
    this.userInfo.cellphone = formvalue.cellphone;
    this.userInfo.login_password = formvalue.login_password;
    this.userInfo.fk_institute_id = environment.instituteId;
    this.userInfo.fk_branch_id = environment.branch_id;
    this.userInfo.Active = formvalue.Active;
    this.userInfo.is_active = formvalue.is_active;

    console.log('Active ---- ' + JSON.stringify(this.userInfo));

    this.__service.setNewUser(this.userInfo).subscribe(async (res: any) => {
      await loading.dismiss();
      if (res.Message === 'Success!') {
        const userId = res.Item;
        let user = {}
        user['institute_id'] = this.instituteId;
        user['student_id'] = userId;
        user['branch_id'] = this.branchId;

        localStorage.setItem('currentUser', JSON.stringify(user));

        this.__service.user.next(user);

        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.getStudentProfile();
        this.accountCreatedPopup(userId);
      }
      if (res.Message === 'user exists') {
        this.userService.showToast('Email or Phone Number exists, please enter valid details!');
        return;
      }

    });
    return 0
  }

  async accountCreatedPopup(userId) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Great!',
      subHeader: 'Success',
      message: 'Your account has been created successfully.',
      buttons: [
        {
          text: 'okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['/home'])
          }
        },
      ],
      backdropDismiss: false
    });

    await alert.present();

  }

  async onSubmit(m: FormGroup) {
    console.log('fun call................')
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.userService.onLogin(m).subscribe((res: any) => {
      loading.dismiss()
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
        this.router.navigate(['/home'])
        if (this.response.Item != null) {
          const user = this.response.Item;

          this.__service.user.next(this.response.Item);
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

  async removeToken(student_id: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.userService.removeToken(student_id).subscribe((result) => {
      loading.dismiss()
    });
  }

  async getStudentProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.userService.getStudentProfile(this.user.student_id).subscribe((resp) => {
      loading.dismiss()
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