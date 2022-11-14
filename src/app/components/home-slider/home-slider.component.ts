import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, IonSlides } from '@ionic/angular';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  slidesData = [];

  @ViewChild('slides', {static: true}) slides: IonSlides; 

  slideIndex:number = 1;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private commonService: CommonService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { 
      this.getBanners();
    }

  ngOnInit(): void {
  }

  slideChanged(e: any, slides) {
    slides.getActiveIndex().then((index: number) => {
        this.slideIndex = index + 1;
    });
  }

  async getBanners(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    
    this.commonService.getInstituteSlider().subscribe((resp) => {
      this.slidesData = resp.Items;
      loading.dismiss();
    });
  }

}
