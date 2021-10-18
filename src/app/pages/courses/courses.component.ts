import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

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
