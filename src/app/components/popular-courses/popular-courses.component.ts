import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent implements OnInit {

  courses: any;
  constructor(private commonSer: CommonService,
    private loadingCtrl: LoadingController) {

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
      this.courses = res.Items;
      console.log(this.courses)
    })
  }
}
