import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  searchText: any;
  courses: any;
  constructor(private commonSer: CommonService, private router: Router) {

  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.commonSer.getCourses().subscribe(res => {
      this.courses = res.Items.reverse();
      console.log(this.courses)
    })
  }

  getCourseDetail(course: any) {
    this.router.navigateByUrl('/course/' + course.pk_course_id)
  }

}
