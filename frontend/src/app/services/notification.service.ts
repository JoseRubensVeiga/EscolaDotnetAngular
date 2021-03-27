import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private confirmConfig: SweetAlertOptions = {
    icon: 'question',
    confirmButtonText: 'Confirmar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#7030a0',
    heightAuto: false,
    showCloseButton: true,
    customClass: {
      cancelButton: 'Swal__cancelButton',
    },
  };

  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.toastrConfig.resetTimeoutOnDuplicate = true;
    this.toastr.toastrConfig.timeOut = 10000;
    this.toastr.toastrConfig.progressBar = true;
  }

  confirm(options: SweetAlertOptions): Observable<boolean> {
    return from(
      Swal.fire({
        ...this.confirmConfig,
        ...options,
      })
    ).pipe(pluck('isConfirmed'));
  }

  success(text: string, title = 'Sucesso!'): void {
    this.toastr.success(text, title);
  }

  error(text: string, title = 'Erro!'): void {
    this.toastr.error(text, title);
  }

  warning(text: string, title = 'Atenção!'): void {
    this.toastr.warning(text, title);
  }

  info(text: string, title = 'Informação'): void {
    this.toastr.info(text, title);
  }
}
