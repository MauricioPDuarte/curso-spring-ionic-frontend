import { ProdutoDTO } from './../../models/produto.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        id: '1',
        nome: 'Mouse',
        preco: 90.99
      },
      {
        id: '2',
        nome: 'Teclado',
        preco: 100.00
      }
    ]
  };

}
