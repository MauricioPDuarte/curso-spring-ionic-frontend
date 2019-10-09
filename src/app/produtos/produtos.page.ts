import { async } from '@angular/core/testing';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[] = [];
  isLoading = false;
  id: number;
  page: number = 0;
  checkComplete: boolean = false;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router,
    private loadCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadDataProducts();
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i<=end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
          error => { });
    }
  }

  loadDataProducts(){
    this.presentLoading();
    this.produtoService.findByCategoria(this.id.toString(), this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        this.dismiss();
        this.loadImageUrls(start, end);
        if(response["last"] == true){
          this.checkComplete = true;
        }
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
    this.page = 0;
    this.items = [];
    this.checkComplete = false;
    this.loadDataProducts();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData(event) {
    if(!this.checkComplete){
      this.page++;
      this.loadDataProducts();
    }
    setTimeout(() => {
      event.target.complete();

      if (this.checkComplete) {
        event.target.disabled = true;
      }
    }, 2000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
