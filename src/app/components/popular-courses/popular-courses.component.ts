import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent implements OnInit {

  courses: any;
  constructor(private commonSer: CommonService) {

  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.commonSer.getCourses().subscribe(res => {
      this.courses = res.Items;
      console.log(this.courses)
    })
  }
}
