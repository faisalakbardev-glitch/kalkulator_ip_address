import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { Platform, IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; // Bawa komponen Ionic-nya dari standalone

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, // Pastikan ini true jika projek lu standalone
  imports: [IonApp, IonRouterOutlet], // 👈 TAMBAHKAN INI BIAR 'ion-app' DIKENALI
})
export class AppComponent implements OnInit {

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          this.myOnDestroyFunction();
          App.exitApp();
        } else {
          window.history.back();
        }
      });
    });
  }

  myOnDestroyFunction() {
    console.log('Menjalankan fungsi bersih-bersih data kalkulator IP...');
  }
}