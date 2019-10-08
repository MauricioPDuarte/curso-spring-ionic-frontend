import { API_CONFIG } from './../../config/api.config';
import { Router } from '@angular/router';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private menu: MenuController,
    ) { }

  ngOnInit() {
    this.menu.enable(true);
  }

  ionViewWillEnter(){

    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  showProdutos(){
    this.router.navigate(['/produtos']);
  }

}
