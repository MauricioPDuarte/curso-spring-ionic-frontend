import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    ) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');

    this.produtoService.findByCategoria(id.toString())
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }

}
