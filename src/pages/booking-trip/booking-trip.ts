import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { DatePipe } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { Slides } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { global_data } from '../../providers/global';
import { BookingsPage } from "../bookings/bookings";
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-booking-trip',
  templateUrl: 'booking-trip.html',
})

export class BookingTripPage {

  card = {
    cardNumber: "", expiryMonth: "", expiryYear: "", cvc: ""
  };

  loading: any;
  requestObject: any;
  public log;
  sessionData = {
    service_name: ""
  };
  booking = {
    postal_code: ""
  };
  unitArr = {
    units: {}
  };
  addonArr = {
    addons: {}
  };
  unitTemp: any;
  taxlabel: any;
  addonRateArr = [];
  addonQtyArr = [];
  addonIdArr = [];
  unitRateArr = [];
  addonMaxQuantity = [];
  addon_no_maxqty = [];
  unitQtyArr = [];
  unitIdArr = [];
  datee: any;
  appointment = {
    date: ""
  };
  appointmentDetails = {
    address: "", zip: "", city: "", state: ""
  };
  addonsObject = {
    addonQty: ""
  };

  nod: any;
  staffSchedule = { slot: "" };
  className: string = 'drinkcard-cc';
  selected: boolean = false;
  service: string;
  method_name = '';
  serviceData: any;
  totalAmount: any;
  totalAmountAfterAddons: any;
  formService: any;
  formSetAddons: any;
  taxValue: any;
  taxStatus: any;
  taxType: any;
  postaCodeStatus: any = 'N';
  counter: any;
  amountTemp: any;
  addonTitle: any;
  addonId: any;
  addonBasePrice: any;

  totalTaxedAmount: any;
  tax: any;
  formSetFreq: any;
  addonsData: any;
  serviceID: any;
  methodData: any;
  unitData: any;
  addonsQty: any;
  addonsAmount: any;
  Data: any;
  add_on: any;
  frequency: any;
  currSymbol: any;
  TotalTax: any;
  freqRate: any;
  addons_nod: any;
  appointmentData: any;
  freqData: any;
  addonList: any;
  staffData: any;
  freqList: any;
  unit_id: any;
  timeslotsData: any;
  appointmentDate: any;
  cartDetailArr = [];
  timeslots: any;
  selectedSlot: any;
  serviceStaffId: string = "";
  formGetTimeSlots: any;
  frequently_discount_type: any;
  buttonClicked: any;
  FreqDiscount: any;
  imgSource = "../assets/img/cleaning-method.png";

  fullname: any;
  email: any;

  cardData: any;

  public staff_id: string = "1";


  public orderSummeryView: Boolean = false;

  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public datepipe: DatePipe,
    public http: HttpClient,
    public actionSheetController: ActionSheetController) {

    this.formService = formBuilder.group({ item: [''] });
    this.formSetAddons = formBuilder.group({ addonList: [''] });
    this.formSetFreq = formBuilder.group({ freqList: [''] });
    this.currSymbol = localStorage.getItem("currSymbol");
    this.totalTaxedAmount = 0;
    this.requestObject = {
      "api_key": global_data.api_key,
      "option_name": "ct_tax_vat_status",
      "action": "get_setting"
    };
    console.log(JSON.stringify(this.requestObject));

    this.http.post(global_data.url, this.requestObject,
      { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.taxStatus = res.response[0].option_value;
        console.log(JSON.stringify(this.taxStatus));

        //alert(JSON.stringify(this.taxStatus));
      }, error => {
        this.presentToast('Server down....');
      });

    this.requestObject = {
      "api_key": global_data.api_key,
      "option_name": "ct_tax_vat_type",
      "action": "get_setting"
    };
    console.log(JSON.stringify(this.requestObject));

    this.http.post(global_data.url, this.requestObject,
      { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.taxType = res.response[0].option_value;
        console.log(JSON.stringify(this.taxType));
      }, error => {
        this.presentToast('Server down....');
      });


    this.requestObject = {
      "api_key": global_data.api_key,
      "option_name": "ct_tax_vat_value",
      "action": "get_setting"
    };
    console.log(JSON.stringify(this.requestObject));

    this.http.post(global_data.url, this.requestObject,
      { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.taxValue = res.response[0].option_value;
        console.log(JSON.stringify(this.taxValue));
      }, error => {
        this.presentToast('Server down....');
      });

      this.requestObject = {
        "api_key": global_data.api_key,
        "option_name": "ct_postalcode_status",
        "action": "get_setting"
      };
      console.log(JSON.stringify(this.requestObject));
  
      this.http.post(global_data.url, this.requestObject,
        { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.postaCodeStatus = res.response[0].option_value;
          if(this.postaCodeStatus == 'N'){
            this.getServiceData();
          }
          console.log(JSON.stringify(this.postaCodeStatus));
        }, error => {
          this.presentToast('Server down....');
        });
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingTripPage');
  }

  fnHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  previous_unitData() {
    this.slides.slidePrev();
    this.unitData = null;
    this.method_name = '';
  }

  radioChecked(id, service_name) {
    this.service = '';
    this.service = id;
    localStorage.setItem("selected_service_name", service_name);
    this.sessionData.service_name = localStorage.getItem("selected_service_name");
  }

  radioFrequencyChecked(id) {
    this.frequency = '';
    this.frequency = id;
  }

  radioServiceStaffChecked(id) {
    this.serviceStaffId = '';
    this.serviceStaffId = id;

  }

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
    });
    this.loading.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  fnCheckPostalCode() {
    if (this.booking.postal_code) {
      this.showLoader("Verifying postal code...");
      this.requestObject = {
        "api_key": global_data.api_key,
        "postal_code": this.booking.postal_code,
        "action": "check_postal_code"
      };
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          if (res.status == "true") {
            this.getServiceData();
            this.slides.slideNext();
          } else {
            this.loading.dismiss();
            this.presentToast('Postal code not found');
          }
        }, error => {
          this.presentToast('Server down....');
        });
    } else {
      this.presentToast('Please enter postal code');
    }

  }

  getServiceData(){
    this.showLoader("Getting Service...");
    this.requestObject = {
      "api_key": global_data.api_key,
      "action": "get_all_services"
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject,
      { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
         this.loading.dismiss();
        if (res.status == "true") {
          this.serviceData = res.response;
          console.log(JSON.stringify(this.serviceData));
          //this.slides.slideNext();
          this.orderSummeryView = true;
        } else {
          this.presentToast('No services found');
        }
      }, error => {
        this.presentToast('Server down....');
      });
  }

  fnGetMethod(form) {
    this.serviceID = this.formService.value.item;
    if (this.serviceID) {
      this.showLoader("Fetching methods...");
      this.requestObject = {
        "api_key": global_data.api_key,
        "service_id": this.serviceID,
        "action": "get_methods_of_selected_service"
      };
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.methodData = res.response;
            console.log(JSON.stringify(this.methodData));
            this.slides.slideNext();
          } else {
            this.presentToast('No method for selected service');
          }
        }, error => {
          this.presentToast('Server down....');
        });
    } else {
      this.presentToast('Please select service');
    }
  }

  fnSelectedMethod(method_id, service_id) {
    this.method_name = "";
    this.method_name = method_id;
    this.requestObject = {
      "api_key": global_data.api_key,
      "service_id": service_id,
      "method_id": method_id,
      "action": "get_units_of_selected_method"
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        if (res.status == "true") {
          this.unitData = res.response;
          console.log(JSON.stringify(this.unitData));
          this.nod = res.no_of_dropdown;
        } else {
          this.presentToast('There are no units found');
        }
      }, error => {
        this.presentToast('Server down....');
      });
  }

  fnSetUnits(service_id) {
    this.unitTemp = this.unitArr.units;
    if (JSON.stringify(this.unitTemp) != '{}') {
      this.unitRateArr.length = 0;
      this.unitQtyArr.length = 0;
      this.unitIdArr.length = 0;
      this.totalAmount = 0;
      this.taxlabel = 1;
      for (let j = 0; j < parseInt(this.nod); j++) {
        let y = "unit" + j;
        if (this.unitTemp[y]) {
          this.unitRateArr[j] = this.unitTemp[y].split('-')[0];
          this.unitQtyArr[j] = this.unitTemp[y].split('-')[1];
          this.unitIdArr[j] = this.unitTemp[y].split('-')[2];
        }
      }
      for (let t = 0; t < this.unitRateArr.length; t++) {
        if (this.unitRateArr[t]) {
          this.totalAmount = parseFloat(this.totalAmount) + parseFloat(this.unitRateArr[t]);
        }
      }
      localStorage.setItem("total_amount", this.totalAmount);
      this.fnCalTaxOnTotal();
      this.requestObject = {
        "api_key": global_data.api_key,
        "service_id": service_id,
        "action": "get_addons_of_selected_service"
      };
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.addonsData = res.response;
            console.log(JSON.stringify(this.addonsData));
            this.addons_nod = this.addonsData.length;
            this.addon_no_maxqty.length = 0;
            for (let index = 0; index < parseInt(this.addons_nod); index++) {
              let i = 1;
              this.addonMaxQuantity.length = 0;
              let temp = [];
              for (let m = 0; m < parseInt(this.addonsData[index].maxqty); m++) {
                temp[m] = i;
                i++;
              }
              this.addon_no_maxqty.push(temp);
            }
            this.slides.slideNext();
          } else {
            this.presentToast('No addons for selected method');
            this.fnSetAddons();
            this.slides.slideNext();
          }
        }, error => {
          this.presentToast('Server down....');
        });
    } else {
      this.presentToast('Select atleast one unit');
    }
  }

  fnSetAddons() {
    this.addonIdArr.length = 0;
    this.addonRateArr.length = 0;
    this.addonQtyArr.length = 0;
    this.showLoader("Fetching subscription packages...");
    if (this.addonArr.addons) {
      this.unitTemp = this.addonArr.addons;
      this.totalAmountAfterAddons = 0;
      for (let j = 0; j < parseInt(this.addons_nod); j++) {
        let y = "addon-" + j;
        if (this.unitTemp[y]) {
          this.addonIdArr[j] = this.unitTemp[y].split('-')[0];
          this.addonQtyArr[j] = this.unitTemp[y].split('-')[2];
          if (this.unitTemp[y].split('-')[1]) {
            this.addonRateArr[j] = this.addonsAmount = parseFloat(this.unitTemp[y].split('-')[1]) * parseInt(this.unitTemp[y].split('-')[2]);
            this.totalAmountAfterAddons = parseFloat(this.totalAmountAfterAddons) + parseFloat(this.addonsAmount);
          }
        }
      }
      this.totalAmountAfterAddons = parseFloat(localStorage.getItem("total_amount")) + parseFloat(this.totalAmountAfterAddons);
      localStorage.setItem("total_amount", this.totalAmountAfterAddons);
      this.fnCalTaxOnTotal();
    }

    this.requestObject = {
      "api_key": global_data.api_key,
      "action": "get_all_frequently_discount"
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        if (res.status == "true") {
          this.freqData = res.response;
          console.log(JSON.stringify(this.freqData));
          this.slides.slideNext();
        } else {
          this.presentToast(res.response);
        }
      }, error => {
        this.presentToast('Server down....');
      });

  }

  fnSetFreq(form) {
    this.freqRate = this.formSetFreq.value.freqList;
    if (this.freqRate) {
      // if (this.freqRate.split(',')[2] == "Once") {
      //   this.frequently_discount_type = "1";
      // } else if (this.freqRate.split(',')[2] == "Bi-Weekly") {
      //   this.frequently_discount_type = "2";
      // } else if (this.freqRate.split(',')[2] == "Weekly") {
      //   this.frequently_discount_type = "3";
      // } else if (this.freqRate.split(',')[2] == "Monthly") {
      //   this.frequently_discount_type = "4";
      // }
      this.frequently_discount_type = this.freqRate.split(',')[3]
      if (this.freqRate.split(',')[1] == "P") {
        this.FreqDiscount = parseFloat(localStorage.getItem("total_amount")) * parseFloat(this.freqRate.split(',')[0]) / 100;
      } else {
        this.FreqDiscount = parseFloat(this.freqRate.split(',')[0]);

      }
      this.totalAmount = parseFloat(localStorage.getItem("total_amount")) - parseFloat(this.FreqDiscount);
      localStorage.setItem("total_amount", this.totalAmount);
      this.fnCalTaxOnTotal();
      this.requestObject = {
        "api_key": global_data.api_key,
        "service_id": this.serviceID,
        "action": "get_staff_of_selected_service"
      };
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.staffData = res.response;
            console.log(JSON.stringify(this.staffData));
            this.slides.slideNext();
          } else {
            this.slides.slideNext();

          }
        }, error => {
          this.presentToast('Server down....');
        });
    } else {
      this.presentToast('Select any package');
    }

  }
  
  nextToTimeSlote(){
    this.slides.slideNext();
    this.fnGetTimeSlots();
  }

  fnGetTimeSlots() {
    this.datee = new Date();
    let latest_date = this.datepipe.transform(this.datee, 'dd-MM-yyyy');
    this.appointmentDate = this.appointment.date;
    this.appointmentDate = this.datepipe.transform(this.appointmentDate, 'dd-MM-yyyy');
    if (this.appointmentDate) {
      if (this.appointmentDate >= latest_date) {
        if (this.serviceStaffId == "") {
          this.staff_id = "1"
        } else {
          this.staff_id = this.serviceStaffId;
        }
        this.requestObject = {
          "api_key": global_data.api_key,
          "staff_id": this.staff_id,
          "selected_date": this.appointmentDate,
          "action": "get_slots"
        };
        console.log(JSON.stringify(this.requestObject));
        this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
          .subscribe((res: any) => {
            this.loading.dismiss();
            if (res.status == "true") {
              this.timeslotsData = res.response;
              console.log(JSON.stringify(this.timeslotsData));
              this.slides.slideNext();
            } else {
              let toast = this.toastCtrl.create({
                message: "None of time slot available please check another dates",
                duration: 3000,
                position: 'center',
              });
              toast.present();
            }
          }, error => {
            this.presentToast('Server down....');
          });
      } else {
        this.presentToast("Please select valid date");
      }
    } else {
      this.presentToast('Please select date');
    }
  }


  fnSetTimeSLot() {
    this.selectedSlot = this.staffSchedule.slot;
    if (this.selectedSlot) {
        this.requestObject = {
        "api_key": global_data.api_key,
        "user_id": localStorage.getItem("user_id"),
        "type": "user",
        "action": "get_profile_detail"
      };
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.appointmentData = res.response;
            console.log(JSON.stringify(this.appointmentData));
            this.slides.slideNext();
          } else {
            this.presentToast('Details not found');
          }
        }, error => {
          this.presentToast('Server down....');
        });
    } else {
      this.presentToast('Select time slot');
    }
  }

  radioMultipleChecked(id, addonId, basePrice, maxQty, addonServiceName) {
    this.addonMaxQuantity.length = 0;
    this.add_on = '';
    this.add_on = id;
  }

  fnGotoNext() {
    this.fnSetAddons();
  }

  fnSetAppointmentDetails() {
    console.log(this.appointmentDetails);
  }

  previousthree() {
    this.unitData = null;
    this.unitArr.units = {};
    this.method_name = '';
    this.addonArr.addons = {};
    this.addonsData = null;
    this.slides.slidePrev();
    this.slides.slidePrev();
    this.slides.slidePrev();
  }

  previoustwo() {
    this.unitData = null;
    this.method_name = '';
    this.addonArr.addons = {};
    this.unitArr.units = {};
    this.addonsData = null;
    this.slides.slidePrev();
    this.slides.slidePrev();
  }
  prevone() {
    this.unitData = null;
    this.method_name = '';
    this.addonArr.addons = {};
    this.unitArr.units = {};
    this.addonsData = null;
    this.slides.slidePrev();
  }

  fnCalTaxOnTotal() {

    if (this.taxStatus == "Y") {
      this.totalTaxedAmount = 0;
      this.tax = 0;
      this.amountTemp = localStorage.getItem("total_amount");
      if (this.taxType == "P") {
        this.tax = ((parseFloat(this.taxValue) + 100) / 100);
        this.TotalTax = ((parseFloat(this.taxValue) / 100) * parseInt(this.amountTemp)).toFixed(2);
        this.totalTaxedAmount = parseFloat(this.amountTemp) * parseFloat(this.tax);
        alert(this.totalTaxedAmount);
        this.totalTaxedAmount = this.totalTaxedAmount.toFixed(2);
      } else if (this.taxType == "F") {
        this.tax = this.taxValue;
        this.TotalTax = this.taxValue;
        this.totalTaxedAmount = parseFloat(this.amountTemp) + parseFloat(this.tax);
        this.totalTaxedAmount = this.totalTaxedAmount.toFixed(2);
      }
    }
  }


  fnActionSheet() {

    const actionSheet = this.actionSheetController.create({
      title: 'Preferred Payment Method',
      buttons: [{
        text: 'Locally Pay',
        handler: () => {
          console.log('Pay Locally');
          this.fnBookAppointment();
        }
      }, {
        text: 'Credit/Debit Card Payment',
        handler: () => {
          console.log('Credit/Debit Card Pay');
          this.slides.slideNext();

        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  fnBookAppointment() {

    for (let arrInd = 0; arrInd < this.unitRateArr.length; arrInd++) {
      if (this.unitRateArr[arrInd] != null) {
        this.cartDetailArr[arrInd] = {
          "unit_id": this.unitIdArr[arrInd],
          "qty": this.unitQtyArr[arrInd],
          "rate": this.unitRateArr[arrInd],
          "type": "unit"
        }
      }
    }
    if (this.addonArr.addons) {
      this.counter = this.cartDetailArr.length;
      for (let arrInd = 0; arrInd < this.addonIdArr.length; arrInd++) {
        if (this.addonIdArr[arrInd] != null) {
          this.cartDetailArr[this.counter] = {
            "unit_id": this.addonIdArr[arrInd],
            "qty": this.addonQtyArr[arrInd],
            "rate": this.addonRateArr[arrInd],
            "type": "addon"
          }
        }
        this.counter++;
      }
    }
    if (this.serviceStaffId == "") {
      this.staff_id = "1"
    } else {
      this.staff_id = this.serviceStaffId;
    }

    this.requestObject = {
      "api_key": global_data.api_key,
      "recurrence_id": this.frequently_discount_type,
      "user_id": localStorage.getItem("user_id"),
      "staff_id": this.staff_id,
      "service_id": this.serviceID,
      "method_id": this.method_name,
      "booking_date_time": this.appointmentDate + " " + this.selectedSlot,
      "order_duration": "60",
      "cart_detail": this.cartDetailArr,
      "payment_method": "Pay At Venue",
      "sub_total": this.totalAmountAfterAddons,
      "tax": this.TotalTax,
      "discount": 0,
      "freq_discount_amount": this.FreqDiscount,
      "net_amount": this.totalTaxedAmount,
      "action": "book_appointment",
      "transaction_id": ""
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        if (res.status == "true") {
          console.log(JSON.stringify(res));
          this.navCtrl.push(BookingsPage).then(() => {
            let index = 1;
            this.navCtrl.remove(index);
          });
          let toast = this.toastCtrl.create({
            message: "Appointment booked successfully",
            duration: 3000,
            position: 'center',

          });
          toast.present();

        } else {
          let toast = this.toastCtrl.create({
            message: "Failed to book appointment",
            duration: 3000,
            position: 'center',

          });
          toast.present();
        }
      }, error => {
        this.presentToast('Server down....');
      });

  }

  fnCardPayment() {

    if (this.card.cardNumber.length == 16 && this.card.expiryMonth.length == 2 && this.card.expiryYear.length == 4 && this.card.cvc.length == 3) {

      this.requestObject = {
        "api_key": global_data.api_key,
        "full_name": localStorage.getItem('fullname'),
        "email": localStorage.getItem('user_email'),
        "card_number": this.card.cardNumber,
        "card_month": this.card.expiryMonth,
        "card_year": this.card.expiryYear,
        "card_cvv": this.card.cvc,
        "amount": this.totalTaxedAmount,
        "action": "stripe_payment_method"
      };
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.cardData = res.response;
            console.log(JSON.stringify(this.cardData));
            this.fnCardBookAppointment();
            let toast = this.toastCtrl.create({
              message: "Appointment booked successfully",
              duration: 3000,
              position: 'center',

            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: "Failed to book appointment",
              duration: 3000,
              position: 'center',
            });
            toast.present();
          }
        }, error => {

          this.presentToast('Server down....');

        });
    } else {
      this.presentToast('Please filled up all details');

    }
  }


  fnCardBookAppointment() {
    this.showLoader("Booking appointment...");
    for (let arrInd = 0; arrInd < this.unitRateArr.length; arrInd++) {
      if (this.unitRateArr[arrInd] != null) {
        this.cartDetailArr[arrInd] = {
          "unit_id": this.unitIdArr[arrInd],
          "qty": this.unitQtyArr[arrInd],
          "rate": this.unitRateArr[arrInd],
          "type": "unit"
        }
      }
    }
    if (this.addonArr.addons) {
      this.counter = this.cartDetailArr.length;
      for (let arrInd = 0; arrInd < this.addonIdArr.length; arrInd++) {
        if (this.addonIdArr[arrInd] != null) {
          this.cartDetailArr[this.counter] = {
            "unit_id": this.addonIdArr[arrInd],
            "qty": this.addonQtyArr[arrInd],
            "rate": this.addonRateArr[arrInd],
            "type": "addon"
          }
        }
        this.counter++;
      }
    }

    if (this.serviceStaffId == "") {
      this.staff_id = "1"
    } else {
      this.staff_id = this.serviceStaffId;
    }
    this.requestObject = {
      "api_key": global_data.api_key,
      "recurrence_id": this.frequently_discount_type,
      "user_id": localStorage.getItem("user_id"),
      "staff_id": this.staff_id,
      "service_id": this.serviceID,
      "method_id": this.method_name,
      "booking_date_time": this.appointmentDate + " " + this.selectedSlot,
      "order_duration": "60",
      "cart_detail": this.cartDetailArr,
      "payment_method": "Stripe",
      "sub_total": this.totalAmountAfterAddons,
      "tax": this.TotalTax,
      "discount": 0,
      "freq_discount_amount": this.FreqDiscount,
      "net_amount": this.totalTaxedAmount,
      "action": "book_appointment",
      "transaction_id": this.cardData
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        if (res.status == "true") {
          console.log(JSON.stringify(res));

          // this.navCtrl.push(BookingsPage);
          this.navCtrl.push(BookingsPage).then(() => {
            let index = 1;
            this.navCtrl.remove(index);
          });
          let toast = this.toastCtrl.create({
            message: "Appointment booked successfully",
            duration: 3000,
            position: 'center',

          });
          toast.present();

        } else {
          let toast = this.toastCtrl.create({
            message: "Failed to book appointment",
            duration: 3000,
            position: 'center',

          });
          toast.present();
        }
      }, error => {
        this.presentToast('Server down....');
      });

  }

} // main curly closed here
