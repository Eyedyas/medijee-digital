import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-e-shop',
  templateUrl: './e-shop.component.html',
  styleUrls: ['./e-shop.component.css']
})
export class EShopComponent implements OnInit {

  eShop: any;
  imageUrl: any = environment.DownloadImage;

  searchTextEl: any = '';
  searchText: any = '';
  summary: string = `MEDIJEE Classes are unique from other institutes because of its immense focus on the quality of academic delivery and
                                        its pedagogy mastered over more multiple years.`;


  constructor(private commonSer: CommonService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {

  }

  ngOnInit(): void {
    //this.getCourse();
  }

  async getCourse() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonSer.getEShop().subscribe(res => {
      loading.dismiss()
      this.eShop = res.Items.slice(0,5);
      console.log(this.eShop)
    })
  }

  productDetail(product: any) {
    this.router.navigateByUrl('/product-detail/' + product.pk_asset_id);
  }
  filterCourses(event: any) {
    console.log(event.target.value)
    if (event.target.value == '') {
      this.searchTextEl = '';
      this.searchText = '';
    }

  }
}