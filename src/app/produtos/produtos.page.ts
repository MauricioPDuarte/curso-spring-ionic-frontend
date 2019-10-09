import { async } from '@angular/core/testing';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];
  isLoading = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router,
    private loadCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
          error => { });
    }
  }

  loadData(){
    this.presentLoading();
    this.produtoService.findByCategoria(this.id.toString())
      .subscribe(response => {
        this.items = response['content'];
        this.dismiss();
        this.loadImageUrls();
      },
        error => {
          this.dismiss();
        });
  }

  showDetail(produto_id) {
    this.router.navigate(['/produto-detail/', produto_id]);
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadCtrl.create({
      message: 'Aguarde...'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadCtrl.dismiss();
  }

  doRefresh(event) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
