import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit {

  pk_blog_id: number;
  sub: any;
  blog: any = {};


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private commonService: CommonService,
    private __service: CommonService,
    private loadingCtrl: LoadingController) {

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.pk_blog_id = params['id'];
      this.getBlogDetails(this.pk_blog_id);
    });
  }

  ngOnInit(): void {
  }

  async getBlogDetails(pk_blog_id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonService.getBlogDetails(pk_blog_id).subscribe(resp => {
      loading.dismiss()
      this.blog = resp.Item
      console.log('blog title: ', this.blog.abstracts)
    });
  }

}
