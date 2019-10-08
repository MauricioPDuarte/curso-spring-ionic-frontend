import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.produtoService.findById(id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {})
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
      },
      error => {})
  }
}
