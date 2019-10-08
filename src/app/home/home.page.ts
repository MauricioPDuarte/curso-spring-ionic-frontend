import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(
    private router: Router,
    private menu: MenuController,
    private auth: AuthService,
    private navCtrl: NavController
    ) {}

  ionViewWillEnter() {
    this.menu.enable(false, 'menuApp');
  }

  ionViewDidLeave() {
    this.menu.enable(true, 'menuApp')
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['/categorias']);
    },
    error => {});
  }



  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['/categorias']);
    },
    error => {});
  }

  signup(){
    //this.router.navigate(['/signup']);
    this.navCtrl.navigateForward(['/signup']);
  }


}
