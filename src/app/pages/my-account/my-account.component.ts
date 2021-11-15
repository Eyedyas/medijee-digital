import { Router } from '@angular/router';
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
  cartItems = [];
  user: any = null;

  constructor(
    private loadingCtrl: LoadingController,
    private commonService: CommonService,
    public navCtrl: NavController,
    private router: Router
  ) {
    this.commonService.user.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
  }
  onLogout() {
    this.removeToken();
  }

  async removeToken() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging out...',
    });
    await loading.present();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.commonService.removeToken(this.user.student_id).subscribe((result) => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('myprofile');
      localStorage.removeItem('providerId');
      localStorage.setItem('cartValue', JSON.stringify(this.cartItems));
      loading.dismiss();
      this.commonService.showToast('You are successfully signed Out!', 'top', 3000)

      this.commonService.user.next(null);

      this.router.navigate(['/home'])

    });
  }


}
