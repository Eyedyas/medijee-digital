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
  constructor(private commonSer: CommonService, private router: Router) {

  }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.commonSer.getBlogs().subscribe(res => {
      this.blogs = res.Items.reverse();
      console.log(this.blogs)
    })
  }

  getBlogDetail(blog: any) {
    this.router.navigateByUrl('/blog-single/' + blog.pk_blog_id)
  }

}
