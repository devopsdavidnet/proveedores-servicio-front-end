import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { FormArray, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs'; // ✅ ESTA ES LA CLAVE
import { MatDialog } from '@angular/material/dialog';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
import { RegistroAeronavesComponent } from '../registro-aeronaves/registro-aeronaves.component';


@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
  styleUrls: ['./registrar-proveedor.component.css']
})
export class RegistrarProveedorComponent implements OnInit {
   form: FormGroup;
  selectedIndex = 0;
  allowTabChange = false;
tabEnabled: boolean[] = [true, false, false, false]; // Solo tab 0 habilitado al inicio

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      /* informacion general de la organización*/
      nombre_organizacion: ['', Validators.required],
      tipo_explotador: ['', Validators.required],
      otro_tipo_proveedor: ['', Validators.required],
      departamento: ['', Validators.required],
      direccion_organizacion:['', Validators.required],
      telefono_organizacion:['', Validators.required],
      correo_organizacion:['', [Validators.required, Validators.email]],

      /*datos de certificación*/
       fecha_inicial_certificacion:['', Validators.required],
       fecha_expiracion_certificacion:['',Validators.required],
       numero_certificado:['',Validators.required],
       numero_resolucion_administrativa:['',Validators.required],
       resolucion_tipo_organizacion:['',Validators.required],
       otro_resolucion_tipo_organizacion:['',Validators.required],
       tipo_operacion:['',Validators.required],
       otro_tipo_operacion:['',Validators.required],
       tipo_transporte_aereo:['',Validators.required],
      otro_tipo_transporte_aereo:['',Validators.required],
      tiene_sms: [false],
      fecha_aceptacion_sms:[''],
       especificacion1:[''],
       especificacion2:[''],
       especificacion3:[''],
       especificacion4:[''],
       especificacion5:[''],
       especificacion6:[''],
       especificacion7:[''],
       especificacion8:[''],
       especificacion9:[''],
       especificacion10:[''],
       especificacion11:[''],
       especificacion12:[''],
       especificacion13:[''],
       otra_especificaciones:[''],




      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      
      ciudad: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /*
  onTabChange(event: any): void {
    if (!this.allowTabChange) {
      this.selectedIndex = event.previouslySelectedIndex;
    }
    this.allowTabChange = false;
  }
  */

onTabChange(event: any): void {
  const fromIndex = event.previouslySelectedIndex;
  const toIndex = event.index;

  if (toIndex > fromIndex) {
    // Si va hacia adelante, validamos
    const valid = this.validateCurrentTab();
    if (!valid) {
      // Impedimos avanzar si no es válido
      this.selectedIndex = fromIndex;
      return;
    }
  }

  // Si va hacia atrás, lo permitimos
  this.selectedIndex = toIndex;
}



goToNextTab(): void {
  if (this.validateCurrentTab() && this.selectedIndex < this.tabEnabled.length - 1) {
    this.tabEnabled[this.selectedIndex + 1] = true; // Habilita siguiente tab
    this.selectedIndex++;
  }
}

/*
  goToNextTab(): void {
    const valid = this.validateCurrentTab();
    if (valid) {
      this.allowTabChange = true;
      this.selectedIndex++;
    }
  }
*/

  

  goToPreviousTab(): void {
    if (this.selectedIndex > 0) {
      this.allowTabChange = true;
      this.selectedIndex--;
    }
  }
  

  validateCurrentTab(): boolean {
    console.log('valor '+this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:
        this.form.get('nombre_organizacion')?.markAsTouched();
        this.form.get('tipo_explotador')?.markAsTouched();
        
        this.form.get('departamento')?.markAsTouched();
        this.form.get('direccion_organizacion')?.markAsTouched();
        this.form.get('telefono_organizacion')?.markAsTouched();
        this.form.get('correo_organizacion')?.markAsTouched();

        return (this.form.get('nombre_organizacion')?.valid ?? false) && 
       (this.form.get('tipo_explotador')?.valid ?? false) && 
       (this.form.get('departamento')?.valid ?? false) && 
       (this.form.get('direccion_organizacion')?.valid ?? false) && 
       (this.form.get('telefono_organizacion')?.valid ?? false) && 
       (this.form.get('correo_organizacion')?.valid ?? false);
             
      case 1:
        this.form.get('telefono')?.markAsTouched();
        
         return (this.form.get('telefono')?.valid ?? false);

      case 2:
        this.form.get('ciudad')?.markAsTouched();
        
        return (this.form.get('ciudad')?.valid ?? false);
      case 3:
        this.form.get('pais')?.markAsTouched();
        
     return (this.form.get('pais')?.valid ?? false);
 

      default:
        return false;
    }
  }

  onSMSChange(event: any): void {
    
    if (event.checked) {
      const dialogRef = this.dialog.open(SmsDialogComponent, {
        width: '500px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          this.form.get('tieneSMS')?.setValue(false);
        }
      });
    }
  }

  registroAeronaves(): void {
    
    
      const dialogRef = this.dialog.open(RegistroAeronavesComponent, {
        width: '500px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          this.form.get('tieneSMS')?.setValue(false);
        }
      });
    
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario completo:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
