import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['../../../assets/styles/molla-style.css']
})
export class MyAccountComponent implements OnInit {
  user: any = null;
  cartItems = [];

  constructor(
    private loadingCtrl: LoadingController,
    private commonService: CommonService,
    public navCtrl: NavController,


  ) { }

  ngOnInit(): void {
  }


  onLogout() {
    // this.nav.setRoot(DashboardPage);
    // localStorage.removeItem("currentUser");
    this.removeToken();
  }

  async removeToken() {
    // this.menu.close();

    const loading = await this.loadingCtrl.create({
      message: 'Logging out...',
    });
    await loading.present();


    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.user.token)
    // for now send student id once token issue fixed from backend then share token ;
    this.commonService.removeToken(this.user.student_id).subscribe((result) => {
      // this.commonService.institute_id = environment.instituteId;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('myprofile');
      localStorage.removeItem('providerId');
      localStorage.removeItem('providerIdAdm');
      localStorage.setItem('cartValue', JSON.stringify(this.cartItems));
      localStorage.setItem('cartValueAdm', JSON.stringify(this.cartItems));
      this.commonService.user = null;
      loading.dismiss();
      this.navCtrl.navigateRoot('/login');

    });
  }


}
