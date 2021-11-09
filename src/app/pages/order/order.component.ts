import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any = [];
  user: any = null;
  admissions: any[] = [];
  products: any = [];

  constructor(private service: CommonService,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.GetOrders();
  }

  async GetOrders() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading orders...',
    });
    // await loading.present();
    this.service.GetOrders(this.user.student_id)
      .subscribe(result => {
        this.orders = result.Items;
        let admissions = result.Items[0].service_details.filter((prop: { is_active: boolean; }) => prop.is_active === true).reverse();
        // this.admissions = this.service.removeDuplicates(admissions, 'fk_subject_id');

        this.products = result.Items[0].product_details.filter((prop: { is_active: boolean; }) => prop.is_active === true).reverse();
        loading.dismiss();
      });
  }
  gotoProductDetails(order: any) {
    console.log(order)
    this.router.navigate(['/order-details'], { state: { order: order } })
  }

}
