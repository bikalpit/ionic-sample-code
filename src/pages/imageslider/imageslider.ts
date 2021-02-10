import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";


/**
 * Generated class for the ImagesliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imageslider',
  templateUrl: 'imageslider.html',
})
export class ImagesliderPage {

slides = [
    {
      title: "Welcome",
      description: "Make your online appointment",
      image: "assets/img/calendar.png",   
      skip: "SKIP",
      button: ""
    },
    {
      title: "Scheduling",
      description: "Make your online appointment scheduling super easy",
      image: "assets/img/schedule.png",
      skip: "SKIP",
      button: ""
     },
    {
      title: "Get Started",
      description: "Get started by logging in or by signing up",
      image: "assets/img/check-mark.png",   
      skip: "",
      button: "GET STARTED"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesliderPage');
  }

    fnLoginView(){

       this.navCtrl.push(LoginPage);
  }

  fnSkipView(){

  	   this.navCtrl.push(LoginPage);

  }

}

