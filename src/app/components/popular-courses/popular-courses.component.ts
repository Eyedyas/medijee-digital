import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent implements OnInit {


  summary: string = `MEDIJEE Classes are unique from other institutes because of its immense focus on the quality of academic delivery and
                                        its pedagogy mastered over more multiple years.`;

  courses: any;
  constructor(private commonSer: CommonService,
    private loadingCtrl: LoadingController,
    private router: Router) {

  }

  ngOnInit(): void {
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
