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


  constructor(private commonSer: CommonService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.commonSer.getEShop().subscribe(res => {
      this.eShop = res.Items;
      console.log(this.eShop)
    })
  }

  productDetail(product: any) {
    this.router.navigateByUrl('/product-detail/' + product.pk_asset_id);
  }
}