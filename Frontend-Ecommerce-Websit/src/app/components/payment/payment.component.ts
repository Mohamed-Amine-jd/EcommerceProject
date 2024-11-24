import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Payment } from 'src/app/interfaces/payment';
import { PaymentService } from 'src/app/services/payment.service';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public payments: Payment[] = [];
  constructor(private toastr: ToastrService,private paymentService: PaymentService) { }

  ngOnInit() {
    this.getPayments();
  }

  public getPayments(): void {
    this.paymentService.getPayment().subscribe(
      (response: Payment[]) => {
        this.payments = response;
        console.log(this.payments);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deletepay(pay: Payment): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le payy : ${pay.id} ?`)) {
      this.paymentService.deletepay(pay.id).subscribe(
        () => {
          this.toastr.success('Le payy a été supprimé avec succès', 'Succès');
          this.getPayments;
        }
      );
      }}

}
