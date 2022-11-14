import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  imageGallery = [];

  constructor(
    private commonService: CommonService,
    private loadingCtrl: LoadingController
  ) {
    this.getGallery();
  }

  ngOnInit(): void {}

  async getGallery() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonService.getGallery().subscribe((result) => {
      loading.dismiss();
      this.imageGallery = result.Items.reverse();
    });
  }
}
