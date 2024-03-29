import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EShopComponent } from './pages/e-shop/e-shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { AboutComponentComponent } from './components/about-component/about-component.component';
import { FeeStructureComponent } from './pages/school/fee-structure/fee-structure.component';
import { AdmissionProcedureComponent } from './pages/school/admission-procedure/admission-procedure.component';
import { DownloadAdmissionFormComponent } from './pages/school/download-admission-form/download-admission-form.component';
import { AboutChairmanComponent } from './pages/about/about-chairman/about-chairman.component';
import { AboutMedijeeComponent } from './pages/about/about-medijee/about-medijee.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StackholderComponent } from './pages/stackholder/stackholder.component';
import { AddressFormComponent } from './pages/address-form/address-form.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { EnquiryFormComponent } from './components/enquiry-form/enquiry-form.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

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
    CourseComponent,
    LoginComponent,
    EShopComponent,
    ProductDetailComponent,
    CartComponent,
    AboutComponentComponent,
    FeeStructureComponent,
    AdmissionProcedureComponent,
    DownloadAdmissionFormComponent,
    AboutChairmanComponent,
    AboutMedijeeComponent,
    StackholderComponent,
    AddressFormComponent,
    MyAccountComponent,
    OrderComponent,
    OrderDetailsComponent,
    EnquiryFormComponent,
    GalleryComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
