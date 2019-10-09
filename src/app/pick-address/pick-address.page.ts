import { Router } from '@angular/router';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(
    private storage: StorageService,
    private clienteService: ClienteService,
    private router: Router,
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
        },
          error => {
            if (error.status == 403) {
              this.router.navigate(['/home']);
            }
          });
    } else {
      this.router.navigate(['/home']);
    }
  }

}
