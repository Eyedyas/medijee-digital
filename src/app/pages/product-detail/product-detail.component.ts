import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pk_product_id: number;
  sub: any;
  imageUrl: any = environment.DownloadImage;
  product: any = {};
  cartItem: any = [];
  DownloadImage = environment.DownloadImage;
  summary: string = `MEDIJEE Classes are unique from other institutes because of its immense focus on the quality of academic delivery and
                                        its pedagogy mastered over more multiple years.`;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private commonService: CommonService) {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.pk_product_id = params['id'];
      this.getProductDetails(this.pk_product_id);
    });


  }

  ngOnInit(): void {
    this.getProductDetails(this.pk_product_id);
  }

  async getProductDetails(pk_Product_id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonService.getProductDetails(pk_Product_id).subscribe(resp => {
      loading.dismiss()
      this.product = resp.Item
    });
  }


  addItemInCart(product: any) {

    if (localStorage.getItem('providerId') == null) {
      localStorage.setItem('providerId', product.fk_institute_id);
      this.cartItem = [];
      let dataset: any = {};
      dataset['product_id'] = product.pk_asset_id;
      dataset['product_name'] = product.asset_name;
      dataset['course_id'] = product.fk_course_id;
      if (product.logo != null) {
        dataset['product_image'] = this.DownloadImage + product.logo;
      }
      else {
        dataset['product_image'] = 'assets/imgs/blank-basket.png';
      }
      dataset['price'] = product.asset_price;
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
          dataset['product_image'] = 'assets/imgs/blank-basket.png';
        }
        dataset['price'] = product.asset_price;
        dataset['quantity'] = 1;
        this.cartItem.push(dataset);
        localStorage.setItem('cartValue', JSON.stringify(this.cartItem))
      }
    }

  }

  public checkItemStatusInCart(item: any) {
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

  increasqty(product: any) {
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

  goToCart(product: any) {
    this.router.navigate(['/my-account'])
  }

}
