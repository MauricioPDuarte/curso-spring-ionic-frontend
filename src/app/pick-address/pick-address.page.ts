import { CartService } from './../../services/domain/cart.service';
import { Router } from '@angular/router';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    private storage: StorageService,
    private clienteService: ClienteService,
    private router: Router,
    private cartSerive: CartService,
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartSerive.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          };
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

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.router.navigate(['/payment'], {state: {pedido: this.pedido}})
  }

}
