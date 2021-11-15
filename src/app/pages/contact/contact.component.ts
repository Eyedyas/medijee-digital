import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private commonService: CommonService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      sender_email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    });
  }

  async submitForm(formData): Promise<any> {
    console.log(formData)

    if (formData.name === ''
      || formData.sender_email === ''
      || formData.phone === ''
    ) {
      alert('Please enter all the mandatory fields!')
      return false;
    }

    let name = formData.name;
    let phone = formData.phone;
    let sender_email = formData.sender_email;
    let message = formData.message;
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commonService.MedijeeEmail(name, sender_email, phone, message).subscribe(resp => {
      loading.dismiss()
      this.contactForm.reset();
      alert('Your request has been submitted successfully! SRN Partners team will connect with you soon.');
    }, (error) => {
      loading.dismiss()
      alert('Oops! Something went wrong. Please try again later.');
    });
  }
}
