import { CourseComponent } from './pages/course/course.component';
import { BlogSingleComponent } from './pages/blog-single/blog-single.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageComponent } from './pages/page/page.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course', component: CourseComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog-single', component: BlogSingleComponent },
  { path: 'page', component: PageComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
