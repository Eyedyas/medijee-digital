import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  user: any[] = null;
  courses: any;
  constructor(private commonSer: CommonService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getCourse();
  }

  getCourse() {
    this.commonSer.getCourses().subscribe(res => {
      this.courses = res.Items.reverse().slice(2, 5);
      console.log(this.courses)
    })
  }
  getCourseDetail(course: any) {
    this.router.navigateByUrl('/course/' + course.pk_course_id)
  }
}
