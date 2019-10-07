import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from 'src/models/cliente.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;
  cliente: ClienteDTO;

  constructor(
    private router: Router,
    private storage: StorageService,
    private clienteService: ClienteService

  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();
        },
        error => {
          if(error.status == 403){
            this.router.navigate(['/home']);
          }
        });
    }else {
      this.router.navigate(['/home']);
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
      },
      error => {});
  }

}
