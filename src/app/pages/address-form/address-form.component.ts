import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, LoadingController, Platform, AlertController, ToastController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
// import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {


  addAddressForm: FormGroup;
  cartItem: any = [];
  user: any = null;
  paymentTransaction: any = {};
  selectedServiceList: any;
  selectedAdmissionSubjects: any[] = [];
  showModalBox: boolean = false;
  myprofile: any;
  admission_id: number;

  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private service: CommonService,
    private platform: Platform,
    public alertController: AlertController,
    public toastController: ToastController,
    private userService: UserService
  ) {
    this.cartItem = JSON.parse(localStorage.getItem('cartValue'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.myprofile = JSON.parse(localStorage.getItem('myprofile'));
  }

  ngOnInit() {
    if (this.user == null) {
      this.addAddressForm = this.formBuilder.group({
        billing_address: ['', Validators.compose([Validators.required])],
        billing_city: ['', Validators.compose([Validators.required])],
        billing_state: ['', Validators.compose([Validators.required])],
        billing_zip: ['', Validators.compose([Validators.required])],
        billing_country: ['India', Validators.compose([Validators.required])],
        billing_tel: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
      });
    }
    else {
      this.addAddressForm = this.formBuilder.group({
        billing_address: ['', Validators.compose([Validators.required])],
        billing_city: ['', Validators.compose([Validators.required])],
        billing_state: ['', Validators.compose([Validators.required])],
        billing_zip: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        billing_country: ['India', Validators.compose([Validators.required])],
        billing_tel: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
      });
    }

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // this.cartItems = JSON.parse(localStorage.getItem('cartValue'));

  }
  // dismissModal() {
  //   this.modalCtrl.dismiss({
  //     'dismissed': true
  //   });
  // }

  orderNow(data: any) {
    console.log(data)
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

  // ValidatePhone(no) {
  //   if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(no)) {
  //     return false
  //   }

  // }

  // ValidatePin(pin) {
  //   if (!/^(\d{4}|\d{6})$/.test(pin)) {
  //     return false
  //   }

  // }

  async bookService(value: any) {

    console.log('function vall')
    if (this.addAddressForm.get('billing_address').value === ''
      || this.addAddressForm.get('billing_city').value === ''
      || this.addAddressForm.get('billing_state').value === ''
      || this.addAddressForm.get('billing_zip').value === ''
      || this.addAddressForm.get('billing_country').value === ''
      || this.addAddressForm.get('billing_tel').value === ''
      || this.addAddressForm.get('billing_address').value === null
      || this.addAddressForm.get('billing_city').value === null
      || this.addAddressForm.get('billing_state').value === null
      || this.addAddressForm.get('billing_zip').value === null
      || this.addAddressForm.get('billing_country').value === null
      || this.addAddressForm.get('billing_tel').value === null) {
      this.service.showToast('Please enter all the mandatory fields!', 'top', 3000)
      // return false;
    }

    // if (this.ValidatePhone(this.addAddressForm.get('billing_tel').value) == false) {
    //   this.service.showToast('You have entered an invalid phone number!', 'top', 3000)
    //   return false;
    // }

    // if (this.ValidatePin(this.addAddressForm.get('billing_zip').value) == false) {
    //   this.service.showToast('You have entered an invalid pin code!', 'top', 3000)
    //   return false;
    // }

    this.user.cell_phone = value.billing_tel;
    this.user.current_address = value.billing_address;
    this.user.pin_code = value.billing_zip;
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    this.booking(value, 'draft');
    return true

  }

  async getPaymentHistory(trackingId: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.service.getPaymentTransaction(trackingId).subscribe(resp => {
      loading.dismiss()
      if (resp.Message == 'Success!') {
        this.paymentTransaction = resp.Item;
        if (this.paymentTransaction.order_status == 'Success') {
          const status = 'submitted';
          this.booking(this.paymentTransaction, status);
        } else {
          const status = 'draft';
          const paymentTransaction = { amount: this.paymentTransaction.amount, payment_mode: 'cash' };
          this.booking(paymentTransaction, status);
        }
      }
    },
      (error: any) => {
        alert(error)
      }
    );
  }

  async booking(formData: any, status: any) {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.selectedServiceList = JSON.parse(localStorage.getItem('cartValue'));

    let userBookingInfo: any = {};


    userBookingInfo.fk_student_id = this.user.student_id;
    userBookingInfo.fk_institute_id = environment.instituteId;
    userBookingInfo.fk_branch_id = environment.branch_id
    userBookingInfo.fk_course_id = this.selectedServiceList[0].course_id;
    userBookingInfo.status = status;
    userBookingInfo.sgst = 0;
    userBookingInfo.cgst = 0;
    userBookingInfo.payment_mode = 'online';
    userBookingInfo.final_amount = this.getCartItemAndValue()['price'];
    userBookingInfo.pay_amount = this.getCartItemAndValue()['price'];
    userBookingInfo.deposit = this.getCartItemAndValue()['price'];

    if (this.selectedServiceList.length > 0) {
      let i;
      for (i = 0; i < this.selectedServiceList.length; i++) {
        this.selectedAdmissionSubjects.push({

          pk_asset_id: this.selectedServiceList[i].product_id,
          is_deleted: false,
          is_active: true,
          final_price: this.selectedServiceList[i].price,

        });


      }
    }

    userBookingInfo.admission_date = new Date();
    userBookingInfo.course_assets = this.selectedAdmissionSubjects;

    console.log(userBookingInfo);

    this.service.serviceBooking(userBookingInfo).subscribe(async res => {
      await loading.dismiss();
      if (res.Success === true) {

        this.admission_id = res.Item;


        this.submitRequest(formData);
        // this.dismissModal();
      }
    },
      (error: any) => {
        alert(error)
      }
    );
  }

  submitRequest(value: any) {

    let url = environment.Baseurl.split('/api')[0]


    const paymentUrl = url + '/onlinepayment/SubmitRequest?institute_id=' + environment.instituteId +
      '&id=' + this.user.student_id + '&amount=' + this.getCartItemAndValue()['price']
      + '&billing_name=' + this.myprofile.name
      + '&billing_email=' + this.myprofile.login_email
      + '&billing_address=' + value.billing_address
      + '&billing_city=' + value.billing_city
      + '&billing_state=' + value.billing_state
      + '&billing_zip=' + value.billing_zip
      + '&billing_country=' + value.billing_country
      + '&billing_tel=' + value.billing_tel
      + '&admission_id=' + this.admission_id
      + '&success_url=' + 'https://clientsome-shop.web.app/success'
      + '&fail_url=' + 'https://clientsome-shop.web.app/failure';

    console.log(paymentUrl);
    window.open(paymentUrl, '_blank');
  }
}
