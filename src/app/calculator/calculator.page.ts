// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {
//   IonContent,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonSelect,
//   IonSelectOption,
//   IonButton,
//   IonList,
//   IonNote,
//   ToastController
// } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-calculator',
//   templateUrl: './calculator.page.html',
//   styleUrls: ['./calculator.page.scss'],
//   standalone: true,
//   imports: [
//     IonContent,
//     IonHeader,
//     IonTitle,
//     IonToolbar,
//     IonCard,
//     IonCardHeader,
//     IonCardTitle,
//     IonCardContent,
//     IonItem,
//     IonLabel,
//     IonInput,
//     IonSelect,
//     IonSelectOption,
//     IonButton,
//     IonList,
//     IonNote,
//     CommonModule,
//     FormsModule
//   ]
// })
// export class CalculatorPage implements OnInit {

//   ipAddress: string = '';
//   subnet: string = '/24';

//   result: any = null;

//   history: any[] = [];
//   selectedResult: any = null;

//   constructor(private toastCtrl: ToastController) {}

//   ngOnInit() {
//     const data = localStorage.getItem('ipHistory');
//     if (data) {
//       this.history = JSON.parse(data);
//     }
//   }

//   calculate() {
//     if (!this.isValidIP(this.ipAddress)) {
//       this.showToast('IP Address tidak valid');
//       return;
//     }

//     if (!this.subnet) {
//       this.showToast('Subnet belum dipilih');
//       return;
//     }

//     const ipParts = this.ipAddress.split('.').map(x => parseInt(x));

//     const ipInt =
//       (ipParts[0] << 24) +
//       (ipParts[1] << 16) +
//       (ipParts[2] << 8) +
//       ipParts[3];

//     const prefix = parseInt(this.subnet.replace('/', ''));

//     const mask = this.cidrToMask(prefix);
//     const maskInt = this.ipToInt(mask);

//     const networkInt = ipInt & maskInt;
//     const broadcastInt = networkInt | (~maskInt >>> 0);

//     const toIP = (int: number) => {
//       return [
//         (int >>> 24) & 255,
//         (int >>> 16) & 255,
//         (int >>> 8) & 255,
//         int & 255
//       ].join('.');
//     };

//     const host = prefix >= 31 ? 0 : Math.pow(2, 32 - prefix) - 2;

//     this.result = {
//       class: this.getIPClass(this.ipAddress),
//       network: toIP(networkInt),
//       broadcast: toIP(broadcastInt),
//       subnet: mask,
//       range: prefix >= 31
//         ? `${toIP(networkInt)} - ${toIP(broadcastInt)}`
//         : `${toIP(networkInt + 1)} - ${toIP(broadcastInt - 1)}`,
//       host: host
//     };

//     this.saveToHistory();
//   }

//   saveToHistory() {
//     const item = {
//       ip: this.ipAddress,
//       subnet: this.subnet,
//       result: this.result
//     };

//     this.history.unshift(item);
//     localStorage.setItem('ipHistory', JSON.stringify(this.history));
//   }

//   showDetail(item: any) {
//     this.selectedResult = item.result;
//     this.result = item.result;
//   }

//   clearHistory() {
//     this.history = [];
//     localStorage.removeItem('ipHistory');
//     this.showToast('History dihapus');
//   }

//   cidrToMask(prefix: number): string {
//     const mask = (0xffffffff << (32 - prefix)) >>> 0;

//     return [
//       (mask >>> 24) & 255,
//       (mask >>> 16) & 255,
//       (mask >>> 8) & 255,
//       mask & 255
//     ].join('.');
//   }

//   ipToInt(ip: string): number {
//     return ip.split('.').reduce((acc, part) => {
//       return (acc * 256) + parseInt(part);
//     }, 0);
//   }

//   reset() {
//     this.ipAddress = '';
//     this.subnet = '/24';
//     this.result = null;
//   }

//   getIPClass(ip: string): string {
//     const firstOctet = parseInt(ip.split('.')[0]);

//     if (firstOctet >= 1 && firstOctet <= 126) return 'A';
//     if (firstOctet >= 128 && firstOctet <= 191) return 'B';
//     if (firstOctet >= 192 && firstOctet <= 223) return 'C';
//     if (firstOctet >= 224 && firstOctet <= 239) return 'D';
//     return 'E';
//   }

//   isValidIP(ip: string): boolean {
//     const regex =
//       /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
//     return regex.test(ip);
//   }

//   async copyResult() {
//     if (!this.result) return;

//     const text = `
// IP Address: ${this.ipAddress}${this.subnet}
// Class: ${this.result.class}
// Network: ${this.result.network}
// Broadcast: ${this.result.broadcast}
// Subnet: ${this.result.subnet}
// Range: ${this.result.range}
// Host: ${this.result.host}
//     `;

//     await navigator.clipboard.writeText(text);
//     this.showToast('Hasil di-copy!');
//   }

//   async showToast(message: string) {
//     const toast = await this.toastCtrl.create({
//       message,
//       duration: 1500,
//       position: 'bottom',
//       color: 'primary'
//     });

//     await toast.present();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList,
  IonNote,
  IonFooter, // TAMBAHKAN INI
  IonIcon,   // TAMBAHKAN INI
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // TAMBAHKAN INI
import { logoInstagram } from 'ionicons/icons'; // TAMBAHKAN INI

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonList,
    IonNote,
    IonFooter, // WAJIB ADA DI SINI
    IonIcon,   // WAJIB ADA DI SINI
    CommonModule,
    FormsModule
  ]
})
export class CalculatorPage implements OnInit {

  ipAddress: string = '';
  subnet: string = '/24';
  result: any = null;
  history: any[] = [];
  selectedResult: any = null;

  constructor(private toastCtrl: ToastController) {
    // Registrasi icon Instagram supaya bisa tampil
    addIcons({ logoInstagram });
  }

  ngOnInit() {
    const data = localStorage.getItem('ipHistory');
    if (data) {
      this.history = JSON.parse(data);
    }
  }

  // Fungsi untuk membuka link Instagram
  openInstagram() {
  const url = 'https://www.instagram.com/isal.doan6?igsh=MW5xdjF1d2Z6Ynp1dQ==';
  
  // Gunakan window.open dengan target _system agar Android melemparnya ke App Instagram atau Browser
  window.open(encodeURI(url), '_system');
}

  // ... (Sisa fungsi calculate() dan lainnya milik lo tetap sama di bawah)
  calculate() {
    if (!this.isValidIP(this.ipAddress)) {
      this.showToast('IP Address tidak valid');
      return;
    }
    if (!this.subnet) {
      this.showToast('Subnet belum dipilih');
      return;
    }
    const ipParts = this.ipAddress.split('.').map(x => parseInt(x));
    const ipInt = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
    const prefix = parseInt(this.subnet.replace('/', ''));
    const mask = this.cidrToMask(prefix);
    const maskInt = this.ipToInt(mask);
    const networkInt = ipInt & maskInt;
    const broadcastInt = networkInt | (~maskInt >>> 0);
    const toIP = (int: number) => {
      return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
    };
    const host = prefix >= 31 ? 0 : Math.pow(2, 32 - prefix) - 2;
    this.result = {
      class: this.getIPClass(this.ipAddress),
      network: toIP(networkInt),
      broadcast: toIP(broadcastInt),
      subnet: mask,
      range: prefix >= 31 ? `${toIP(networkInt)} - ${toIP(broadcastInt)}` : `${toIP(networkInt + 1)} - ${toIP(broadcastInt - 1)}`,
      host: host
    };
    this.saveToHistory();
  }

  saveToHistory() {
    const item = { ip: this.ipAddress, subnet: this.subnet, result: this.result };
    this.history.unshift(item);
    localStorage.setItem('ipHistory', JSON.stringify(this.history));
  }

  showDetail(item: any) {
    this.selectedResult = item.result;
    this.result = item.result;
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem('ipHistory');
    this.showToast('History dihapus');
  }

  cidrToMask(prefix: number): string {
    const mask = (0xffffffff << (32 - prefix)) >>> 0;
    return [(mask >>> 24) & 255, (mask >>> 16) & 255, (mask >>> 8) & 255, mask & 255].join('.');
  }

  ipToInt(ip: string): number {
    return ip.split('.').reduce((acc, part) => (acc * 256) + parseInt(part), 0);
  }

  reset() {
    this.ipAddress = '';
    this.subnet = '/24';
    this.result = null;
  }

  getIPClass(ip: string): string {
    const firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet >= 1 && firstOctet <= 126) return 'A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D';
    return 'E';
  }

  isValidIP(ip: string): boolean {
    const regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    return regex.test(ip);
  }

  async copyResult() {
    if (!this.result) return;
    const text = `IP Address: ${this.ipAddress}${this.subnet}\nClass: ${this.result.class}\nNetwork: ${this.result.network}\nBroadcast: ${this.result.broadcast}\nSubnet: ${this.result.subnet}\nRange: ${this.result.range}\nHost: ${this.result.host}`;
    await navigator.clipboard.writeText(text);
    this.showToast('Hasil di-copy!');
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1500, position: 'bottom', color: 'primary' });
    await toast.present();
  }
}