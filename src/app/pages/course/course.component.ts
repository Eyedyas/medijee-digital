import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: any;
  sub: any;
  pk_course_id: number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private commonService: CommonService,
    private __service: CommonService) {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.pk_course_id = params['id'];
      this.getCourseDetails(this.pk_course_id);
    });
  }

  getCourseDetails(pk_Product_id: number) {
    this.commonService.getCourseDetails(pk_Product_id).subscribe(resp => {
      this.course = resp.Item
      console.log('course title: ', this.course)
    });
  }

  ngOnInit(): void {
  }

}
