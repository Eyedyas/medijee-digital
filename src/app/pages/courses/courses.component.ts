import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  searchTextEl: any = '';
  searchText: any = '';
  courses: any;
  summary: string = `MEDIJEE Classes are unique from other institutes because of its immense focus on the quality of academic delivery and
                                        its pedagogy mastered over more multiple years.`;

  constructor(private commonSer: CommonService, private router: Router, private loadingCtrl: LoadingController) {

  }

  ngOnInit(): void {
    this.getCourse();
  }

  async getCourse() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonSer.getCourses().subscribe(res => {
      loading.dismiss()
      this.courses = res.Items.reverse();
      console.log(this.courses)
    })
  }

  getCourseDetail(course: any) {
    this.router.navigateByUrl('/course/' + course.pk_course_id)
  }

  filterCourses(event: any) {
    if (event.target.value == '') {
      this.searchTextEl = '';
      this.searchText = '';
    }

  }
}
