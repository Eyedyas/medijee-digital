import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  user: any = null;



  cartItems: any[] = [];
  productsCode: any[] = []
  promo_code: any = {};
  promo_discount: number = 0;
  draftValue: any;
  discountedPrice: number;
  promo_product: string;



  constructor(public modalController: ModalController,
    public navCtrl: NavController,
    private __service: CommonService,
    private router: Router
  ) {
    this.cartItems = JSON.parse(localStorage.getItem('cartValue'));
    this.setDiscountedPrice(this.getCartItemAndValue()['price']);

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.cartItems = JSON.parse(localStorage.getItem('cartValue'));

  }

  public getCartItemAndValue() {
    let item: any = {
      quantity: 0,
      price: 0
    };
    let cartItems = JSON.parse(localStorage.getItem('cartValue'));
    if (cartItems != null) {
      for (let citem of cartItems) {
        item['quantity'] = item['quantity'] + citem.quantity;
        item['price'] = item['price'] + (citem.price * citem.quantity);
      }
    }
    return item;
  }

  increasqty(product: any) {
    let cartitem = JSON.parse(localStorage.getItem('cartValue'));
    if (cartitem != null) {
      for (let item of cartitem) {
        if (item.product_id == product.product_id) {
          item.quantity = Number(item.quantity);
          item.quantity++;
        }
      }
    }
    localStorage.removeItem('cartValue');
    localStorage.setItem('cartValue', JSON.stringify(cartitem));
    this.cartItems = JSON.parse(localStorage.getItem('cartValue'));
    this.setDiscountedPrice(this.getCartItemAndValue()['price']);
  }

  decreasqty(product: any) {
    let cartitem = JSON.parse(localStorage.getItem('cartValue'));
    let removedIndex: any = null;
    if (cartitem != null) {
      let index = 0;
      for (let item of cartitem) {
        if (item.product_id == product.product_id) {
          item.quantity = Number(item.quantity);
          if (item.quantity != 0) {
            item.quantity--;
          }
          if (item.quantity == 0) {
            removedIndex = index;

            this.productsCode.filter(prop => {

              if (prop.product_name === product.product_name) {
                const index = this.productsCode.indexOf(prop);
                this.productsCode.splice(index, 1);
                this.promo_code = {};
                this.promo_discount = 0;
              }

            });

            console.log(this.productsCode)

          }
        }
        index++;
      }
      if (removedIndex != null) {
        if (index == 1) {
          localStorage.removeItem("providerId");
          this.draftValue = JSON.parse(localStorage.getItem('cartDraftValue'));
          if (this.draftValue != undefined) {
          }
          cartitem = cartitem.filter(function (value: any, index: any, arr: any) {
            return index != removedIndex;
          });
        } else {
          cartitem = cartitem.filter(function (value: any, index: any, arr: any) {
            return index != removedIndex;

          });

        }
      }
    }
    localStorage.removeItem('cartValue');
    localStorage.setItem('cartValue', JSON.stringify(cartitem));
    this.cartItems = JSON.parse(localStorage.getItem('cartValue'));
    this.setDiscountedPrice(this.getCartItemAndValue()['price']);

  }

  applyPromoCode(promo_code: any) {

    console.log(promo_code)

    console.log(this.getCartItemAndValue()['price'])

    this.promo_discount = promo_code.discount;

    this.setDiscountedPrice(this.getCartItemAndValue()['price'])



    /* let product_name;
    let discount;

    this.productsCode.filter(prop => {
      if(prop.code_id === promo_code){
        product_name = prop.product_name;
        this.cartItems.filter(prop => {
          if(prop.product_name === product_name){
            console.log(prop.product_name)
            this.promo_product = prop.product_name;
            this.promo_discount = 20;
            this.getCartItemAndValue()['price'] - 20;

          }
        }) 
      }
    })  */

  }

  async openPaymentDetailsForm(discountedPrice: any) {
    console.log(discountedPrice)
    this.router.navigate(['/address-form'], { state: { discountedPrice: discountedPrice } })

    if (this.cartItems.filter(prop => prop.product_name == this.promo_product).length == 0) {
      //return false;
    }
    // const modal = await this.modalController.create({
    //   component: HomeComponent,
    //   cssClass: 'my-custom-class',
    //   componentProps: {
    //     'discountedPrice': discountedPrice.toFixed(2)
    //   }
    // });
    // modal.onDidDismiss()
    //   .then((data: any) => {
    //   });
    // return await modal.present();
  }

  setDiscountedPrice(price: any) {
    this.discountedPrice = price - (price * (this.promo_discount / 100))
  }

  goForStudentLogin() {

    const navigationExtras: NavigationExtras = {
      state: {
        fromURL: '/bag'
      }
    };
    this.__service.headerTitle.next('Login');
    this.navCtrl.navigateForward(['/login'], navigationExtras);

  }


  goForStudentSignup() {
    this.__service.headerTitle.next('Register');
    this.navCtrl.navigateForward('/register');
  }

}
