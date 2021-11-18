import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.css']
})
export class EnquiryFormComponent implements OnInit {

  user: any;
  enquiryRequestform: FormGroup;
  course_title: any;
  courses: any;

  constructor(private commonSer: CommonService,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.commonSer.user.subscribe(user => {
      this.user = user;
      console.log(this.user)
    })
  }

  ngOnInit(): void {
    this.getCourse()
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.enquiryRequestform = this.formBuilder.group({
      fk_enquiry_category_id: ["Courses", Validators.compose([Validators.required])],
      email: [this.user.student_email, Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      fk_institute_id: [environment.instituteId, Validators.compose([Validators.required])],
      fk_branch_id: [environment.branch_id, Validators.compose([Validators.required])],
      course_title: ['', Validators.compose([Validators.required])],
      fk_source_id: [1, Validators.compose([Validators.required])],
      type: ['website', Validators.compose([Validators.required])],
    });
  }

  async getCourse() {
    // const loading = await this.loadingCtrl.create({
    //   message: 'Please wait...',
    // });
    // await loading.present();
    this.commonSer.getCourses().subscribe(res => {
      // loading.dismiss()
      this.courses = res.Items.reverse().slice(2, 5);
      console.log(this.courses)
    })
  }

  getCoursesFilter(course_title) {
    this.course_title = course_title.target.value
    console.log(course_title)
  }

  async onSubmit(value) {
    console.log('enquery form values: ', value)
    if (value.fk_enquiry_category_id === null || value.fk_branch_id === null || value.email === null || value.name === null || value.phone === null || value.message === null) {
      this.userService.showToast('Please fill all the fields.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    value['fk_source_id'] = 1;
    this.commonService.postQueryV2(value).subscribe((result) => {
      this.userService.showToast('Thank you for the request, our team will soon reach out to you.');
      loading.dismiss();
      if (this.user == null) {
        this.navCtrl.navigateForward('/dashboard');
      }
      else {
        this.navCtrl.navigateForward('/home-v2');
      }
    });
  }

}
