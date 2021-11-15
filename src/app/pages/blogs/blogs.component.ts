import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: any;
  constructor(private commonSer: CommonService, private router: Router, private loadingCtrl: LoadingController) {

  }

  ngOnInit(): void {
    this.getBlogs();
  }

  async getBlogs() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonSer.getBlogs().subscribe(res => {
      loading.dismiss()
      this.blogs = res.Items.reverse();
      console.log(this.blogs)
    })
  }

  getBlogDetail(blog: any) {
    this.router.navigateByUrl('/blog-single/' + blog.pk_blog_id)
  }

}
