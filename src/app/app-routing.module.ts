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
  { path: 'e-shop', component: EShopComponent },
  { path: 'bag', component: CartComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
