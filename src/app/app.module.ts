import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { TutorsComponent } from './components/tutors/tutors.component';
import { EventsComponent } from './components/events/events.component';
import { PopularCoursesComponent } from './components/popular-courses/popular-courses.component';
import { ELearningComponent } from './components/e-learning/e-learning.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { PageComponent } from './pages/page/page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PartnerComponent } from './components/partner/partner.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogSingleComponent } from './pages/blog-single/blog-single.component';
import { CourseComponent } from './pages/course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NewsComponent,
    TutorsComponent,
    EventsComponent,
    PopularCoursesComponent,
    ELearningComponent,
    HomeSliderComponent,
    HeaderComponent,
    AboutComponent,
    CoursesComponent,
    BlogsComponent,
    PageComponent,
    ContactComponent,
    HomeComponent,
    RegisterComponent,
    PartnerComponent,
    BlogSingleComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
