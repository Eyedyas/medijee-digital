import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService) {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.pk_product_id = params['id'];
      this.getProductDetails(this.pk_product_id);
    });
  }

  ngOnInit(): void {
    console.log('here is product id: ', this.pk_product_id)
    this.getProductDetails(this.pk_product_id);
  }

  getProductDetails(pk_Product_id: number) {
    this.commonService.getProductDetails(pk_Product_id).subscribe(resp => {
      this.product = resp.Item
      console.log('product title: ', this.product.asset_name)
    });
  }

}
