import { Router } from '@angular/router';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10];

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pedido = this.router.getCurrentNavigation().extras.state.pedido;
    }

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required],
    });
  }

  nextPage(){
    this.pedido.pagamento = this.formGroup.value;
    this.router.navigate(['/order-confirmation'], {state: {pedido: this.pedido}});
  }
}
