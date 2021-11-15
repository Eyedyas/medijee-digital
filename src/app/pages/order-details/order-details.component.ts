import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  sub: any;
  ImageUrl: any = environment.DownloadImage;
  pk_product_mapping_id: any;

  order: any = this.router.getCurrentNavigation().extras.state.order;

  constructor(private __service: CommonService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute) {



  }

  ngOnInit(): void {
    console.log(this.order);
    this.pk_product_mapping_id = this.order.pk_product_mapping_id;
    this.getOrderDetails(this.pk_product_mapping_id);
  }

  async getOrderDetails(pk_product_mapping_id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.__service.getProductDetails(pk_product_mapping_id).subscribe(resp => {
      loading.dismiss()
      this.order = resp.Item;
    });
  }

  // async UpdateStatus(status: string) {

  //   const loading = await this.loadingCtrl.create({
  //     message: 'Please wait...',
  //   });
  //   await loading.present();

  //   this.__service.UpdateStatus(this.order.pk_product_mapping_id, status).subscribe(async (result) => {
  //     await loading.dismiss();
  //     if (status == 'Cancel') {
  //       this.__service.showToast('Your order has been cancelled successfully. Contact admin in case of any queries.', 'top', 4000)
  //     }
  //     else {
  //       this.__service.showToast('We have taken you return request. We will get back to you soon.', 'top', 4000)
  //     }
  //     this.__service.headerTitle.next("Orders");
  //     this.navCtrl.navigateForward(['/orders']);
  //   });
  // }

  goToCart(product) {
    this.router.navigate(['/bag'])
  }

  calculateDiscount(actual_price, asset_price) {
    return Math.round(((actual_price - asset_price) / actual_price) * 100);
  }

  checkCancelValidity(hour: any) {
    var today = new Date();
    var now = today.getTime();
    today.setHours(today.getHours() + Number(hour));
    var validity = today.getTime();
    if (now > validity) {
      return false;
    }
    else {
      return true;
    }
  }

  checkReturnValidity(day: any) {
    var today = new Date();
    var now = today.getTime();
    today.setDate(today.getDate() + Number(day));
    var validity = today.getTime();
    if (now > validity) {
      return false;
    }
    else {
      return true;
    }
  }


}
