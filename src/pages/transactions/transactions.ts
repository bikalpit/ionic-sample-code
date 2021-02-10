import { Component } from '@angular/core';
import { IonicPage,NavController, AlertController, ModalController, ToastController, MenuController, LoadingController} from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { global_data } from '../../providers/global';
import { ViewDetailPage } from '../view-detail/view-detail';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
public trips: any;
loading:any;
htmlData:any;
users = [];
noData: any;

currSymbol: any;
page = 0;
user_type: any;
isloadmore: boolean = false;
requestObject:any;
  constructor(public nav: NavController, 
              public forgotCtrl: AlertController, 
              public toastCtrl: ToastController,
              public modelCtrl: ModalController, 
              public menu: MenuController,              
              public http : HttpClient,
              public loadingCtrl: LoadingController) {
    this.user_type =  localStorage.getItem('user_type');
    this.currSymbol =  localStorage.getItem("currSymbol");
	  	this.fnLoadTransaction(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

 showLoader(message) {
  this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
  });
  this.loading.present();
}
/*Reload data when scroll list */
/*doRefresh(refresher) { 
 	this.showLoader();  
    this.requestObject = {
      "api_key" : global_data.api_key,
      "user_id": localStorage.getItem('user_id'),     
      "action":"get_user_appointments_list"
    };  
}*/
fnLoadTransaction(page){
    this.showLoader("Loading transactions...");  
    this.requestObject = {
    "api_key" : global_data.api_key,
    "page" : page,
    "user_id": localStorage.getItem('user_id'),	 
    "type": localStorage.getItem('user_type'),
    "action":"get_payment_order_rec"
    };
    console.log(JSON.stringify(this.requestObject));

     
  this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
  .subscribe((res: any) => {     
        this.loading.dismiss();
      
        if(res.status == "true"){
           this.noData = "No Data Available";
           this.htmlData = res.response;
           for(let i=0; i<this.htmlData.length; i++) {
            
            this.users.push(this.htmlData[i]);
           }         
          }else{
this.noData = "No Data Available";
          }
  }, error => {  
  });

 }
 
fnViewTransaction(order_id){
this.showLoader("Loading details..."); 
  this.requestObject = {
  "api_key" : global_data.api_key,
  "order_id":order_id,
  "action":"get_appointment_detail"
  };  
  console.log(JSON.stringify(this.requestObject));

  this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
  .subscribe((res: any) => {     
  	this.loading.dismiss();
  if(res.status == "true"){
  
    let viewData = {
                "pageName" : 'my_booking',
                "MyBookingData" : res.response
              }  
          
      let modal = this.modelCtrl.create(ViewDetailPage,{viewData:viewData});
      modal.onDidDismiss(() => {
        // you can any function here as per your need
      });
      modal.present();
    }else{

    }
  }, error => {  
  });


  }


 doRefresh(refresher){
  this.isloadmore = false;
  this.page = 0;
    this.requestObject = {
    "api_key" : global_data.api_key,
    "page" : "0",
    "user_id": localStorage.getItem('user_id'),  
    "type": localStorage.getItem('user_type'),
    "action":"get_payment_order_rec"
    };
     
  this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
  .subscribe((res: any) => {     
        
        if(res.status == "true"){

           this.users = res.response;
            refresher.complete();
         
          }else{
          refresher.complete();
          }
  }, error => {  
  });
   
    /*this.requestObject = {
      "api_key" : global_data.api_key,
      "user_id": localStorage.getItem('user_id'),  
      "type": "user",

      "action":"get_payment_order_rec"
    };
     
  this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
  .subscribe((res: any) => {
        if(res.status == "true"){
           this.htmlData = res.response;
           refresher.complete();
          }else{

          }
  }, error => {  
  });*/

 }

doInfinite(infiniteScroll) {

if(this.isloadmore)
  return;
 this.showLoader("Loading transactions...");
  this.isloadmore = true;
  this.page = this.page+1;
 setTimeout(() => {
     this.requestObject = {
    "api_key" : global_data.api_key,
    "page" : this.page,
    "user_id": localStorage.getItem('user_id'),  
    "type": localStorage.getItem('user_type'),
    "action":"get_payment_order_rec"
    };
     
  this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
  .subscribe((res: any) => {     
         this.loading.dismiss();
        if(res.status == "true"){
           this.htmlData = res.response;
         for(let i=0; i<this.htmlData.length; i++) {
            this.users.push(this.htmlData[i]);
           }
          this.isloadmore = false;
          }else{
             //this.isloadmore = false;
             //infiniteScroll.complete();
          }
  }, error => {  
  });
    infiniteScroll.complete();
    
  }, 500);

}

}
