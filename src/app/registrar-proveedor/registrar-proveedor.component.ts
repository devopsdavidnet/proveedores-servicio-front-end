import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { FormArray, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs'; // ✅ ESTA ES LA CLAVE
import { MatDialog } from '@angular/material/dialog';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';


@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
  styleUrls: ['./registrar-proveedor.component.css']
})
export class RegistrarProveedorComponent implements OnInit {
   
form: FormGroup;
  selectedIndex = 0;
  allowTabChange = false; // 🔑 Controla si se puede cambiar de tab

  constructor(private fb: FormBuilder, private dialog: MatDialog ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
       tieneSMS: [false],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Detecta cambios de tab por clic
  onTabChange(event: MatTabChangeEvent): void {
    const nextIndex = event.index;

    if (!this.allowTabChange) {
      if (nextIndex === 1 && (!this.form.get('nombre')?.valid || !this.form.get('email')?.valid)) {
        this.form.get('nombre')?.markAsTouched();
        this.form.get('email')?.markAsTouched();
        this.selectedIndex = 0;
      } else if (nextIndex === 2 && !this.form.get('telefono')?.valid) {
        this.form.get('telefono')?.markAsTouched();
        this.selectedIndex = 1;
      }
    }

    this.allowTabChange = false;
  }

  goToNextTab(currentTab: number): void {
    if (currentTab === 1 && this.form.get('nombre')?.valid && this.form.get('email')?.valid) {
      this.allowTabChange = true;
      this.selectedIndex = 1;
    } else if (currentTab === 2 && this.form.get('telefono')?.valid) {
      this.allowTabChange = true;
      this.selectedIndex = 2;
    } else {
      if (currentTab === 1) {
        this.form.get('nombre')?.markAsTouched();
        this.form.get('email')?.markAsTouched();
      } else if (currentTab === 2) {
        this.form.get('telefono')?.markAsTouched();
      }
    }
  }

  goToPreviousTab(): void {
    if (this.selectedIndex > 0) {
      this.allowTabChange = true;
      this.selectedIndex--;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }



  onSMSChange(event: any): void {
    if (event.checked) {
      const dialogRef = this.dialog.open(SmsDialogComponent, {
        width: '500px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Datos del SMS:', result);
        } else {
          this.form.get('tieneSMS')?.setValue(false); // desmarca si cancela
        }
      });
    }
  }



}
