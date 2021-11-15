import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  user: any;
  courses: any;

  constructor(private commonSer: CommonService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.commonSer.user.subscribe(user => {
      this.user = user;
      console.log(this.user)
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getCourse();
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
  getCourseDetail(course: any) {
    this.router.navigateByUrl('/course/' + course.pk_course_id)
  }
}
