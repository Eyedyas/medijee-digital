import { OrderComponent } from './pages/order/order.component';
import { StackholderComponent } from './pages/stackholder/stackholder.component';
import { AboutMedijeeComponent } from './pages/about/about-medijee/about-medijee.component';
import { AboutChairmanComponent } from './pages/about/about-chairman/about-chairman.component';
import { AdmissionProcedureComponent } from './pages/school/admission-procedure/admission-procedure.component';
import { FeeStructureComponent } from './pages/school/fee-structure/fee-structure.component';
import { DownloadAdmissionFormComponent } from './pages/school/download-admission-form/download-admission-form.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
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
import { LoginComponent } from './pages/login/login.component';
import { EShopComponent } from './pages/e-shop/e-shop.component';
import { AddressFormComponent } from './pages/address-form/address-form.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about-chairman', component: AboutChairmanComponent },
  { path: 'about-medijee', component: AboutMedijeeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog-single/:id', component: BlogSingleComponent },
  { path: 'page', component: PageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'e-shop', component: EShopComponent },
  { path: 'bag', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'address-form', component: AddressFormComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stackholder', component: StackholderComponent },
  { path: 'fee-structure', component: FeeStructureComponent },
  { path: 'admission-procedure', component: AdmissionProcedureComponent },
  { path: 'admission-form', component: DownloadAdmissionFormComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
