import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

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

  constructor(private router: Router, private menu: MenuController) {}

  ionViewWillEnter() {
    this.menu.enable(false, 'menuApp');
  }

  ionViewDidLeave() {
    this.menu.enable(true, 'menuApp')
  }


  login(){
    console.log(this.creds);
    this.router.navigate(['/categorias']);
  }


}
