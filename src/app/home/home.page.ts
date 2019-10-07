import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private menu: MenuController) {}

  ionViewWillEnter() {
    this.menu.swipeGesture(false, 'menuApp');
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true, 'menuApp')
  }


  login(){
    this.router.navigate(['/categorias']);
  }


}
