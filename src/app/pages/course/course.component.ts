import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NavController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: any;
  sub: any;
  cartItem: any = [];
  DownloadImage = environment.DownloadImage;
  product: any = {};
  course_price: number = 1000;
  course_first_pay: number = (this.course_price * 10) / 100;
  course_remaining_price = this.course_price - this.course_first_pay

  pk_course_id: number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private commonService: CommonService,
    private __service: CommonService,
    private loadingCtrl: LoadingController) {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.pk_course_id = params['id'];
      this.getCourseDetails(this.pk_course_id);
    });
  }

  async getCourseDetails(pk_Product_id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonService.getCourseDetails(pk_Product_id).subscribe(resp => {
      loading.dismiss()
      this.course = resp.Item;
      this.getSubject(this.course.fk_branch_id, this.course.pk_course_id);
      console.log('course title: ', this.course)
    });
  }

  totalFees = null;

  async getSubject(branch_id, course_id){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonService.getSubject(branch_id, course_id)
      .subscribe(result => {
        this.totalFees = result.Items[0]?.fees;
        loading.dismiss();
      });
  }

  courses = [];

  async getCourse() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonService.getCourses().subscribe(res => {
      loading.dismiss()
      this.courses = res.Items.filter((item) => item.status === "Active").reverse().slice(0, 3);
      console.log(this.courses)
    })
  }


  addItemInCart(product) {

    if (localStorage.getItem('providerId') == null) {
      localStorage.setItem('providerId', '0');
      this.cartItem = [];
      let dataset: any = {};
      // dataset['product_id'] = product.product_id;
      dataset['course_id'] = this.course.pk_course_id;
      dataset['product_name'] = this.course.course_title;
      if (this.course.picture != null) {
        dataset['picture'] = this.DownloadImage + this.course.picture;
      }
      else {
        dataset['picture'] = 'assets/images/blank-basket.png';
      }
      dataset['max_discount_overall'] = this.course.max_discount_overall;
      dataset['quantity'] = 1;
      this.cartItem.push(dataset);
      localStorage.setItem('cartValue', JSON.stringify(this.cartItem));
    }
    else if (localStorage.getItem('providerId') == product.fk_institute_id) {
      let counter = 0;
      let local_storage_cart_value = JSON.parse(localStorage.getItem('cartValue'));
      for (let j = 0; j < local_storage_cart_value.length; j++) {
        if (local_storage_cart_value[j].product_id == product.pk_asset_id) {
          this.increasqty(product);
          counter++;
        }
      }
      if (counter == 0) {
        if (localStorage.getItem('cartValue')) {
          this.cartItem = JSON.parse(localStorage.getItem('cartValue'));
        }
        let dataset: any = {};
        dataset['product_id'] = product.pk_asset_id;
        dataset['product_name'] = product.asset_name;
        dataset['course_id'] = product.fk_course_id;
        if (product.logo != null) {
          dataset['product_image'] = this.DownloadImage + product.logo;
        }
        else {
          dataset['product_image'] = 'assets/images/blank-basket.png';
        }
        dataset['price'] = product.asset_price;
        dataset['quantity'] = 1;
        this.cartItem.push(dataset);
        localStorage.setItem('cartValue', JSON.stringify(this.cartItem))
      }
    }

  }

  goToCart(product) {
    this.__service.headerTitle.next('My Account');
    this.navCtrl.navigateForward(['/my-account']);
  }

  increasqty(product) {
    let cartitem = JSON.parse(localStorage.getItem('cartValue'));
    if (cartitem != null) {
      for (let item of cartitem) {
        if (item.product_id == product.pk_asset_id) {
          item.quantity = Number(item.quantity);
          item.quantity++;
        }
      }
    }
    localStorage.removeItem('cartValue');
    localStorage.setItem('cartValue', JSON.stringify(cartitem));
  }

  public checkItemStatusInCart(item) {
    let flag = false;
    let cartitem = JSON.parse(localStorage.getItem('cartValue'));
    if (cartitem && cartitem.length > 0) {
      for (let i of cartitem) {
        if (i.product_id == item.pk_asset_id) {
          flag = true;
        }
      }
    }
    return flag;
  }

  ngOnInit(): void {
    this.getCourse();
  }

}
