import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { FormArray, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs'; // ✅ ESTA ES LA CLAVE
import { MatDialog } from '@angular/material/dialog';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
import { RegistroAeronavesComponent } from '../registro-aeronaves/registro-aeronaves.component';
import { RegistroInstructoresComponent } from '../registro-instructores/registro-instructores.component';


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
       otra_especificaciones:[''],

           /*  Caracteristicas de la Organización */
        nacionalidad_organizacion:[''],    
        tamano_organizacion:[''],
        complejidad_organizacion:[''],
        capacidad1:[''],
        capacidad2:[''],
        capacidad3:[''],
        capacidad4:[''],
        capacidad5:[''],
        capacidad6:[''],
        capacidad7:[''],
        capacidad8:[''],
        otro_capacidad:[''],

        tipo1:[''],
        tipo2:[''],
        tipo3:[''],
        tipo4:[''],
        tipo5:[''],
          
        certificado1:[''],
        fecha_expiracion_certificado1:[''],
         certificado2:[''], 
         fecha_expiracion_certificado2:[''],
         certificado3:[''],
         fecha_expiracion_certificado3:[''],
         certificado4:[''],
         fecha_expiracion_certificado4:[''],
         certificado5:[''],
         fecha_expiracion_certificado5:[''],
         certificado6:[''], 
         fecha_expiracion_certificado6:[''],

certificado7:[''],
fecha_expiracion_certficado7:[''],
certificado8:[''],
fecha_expiracion_certificado8:[''],
certificado9:[''],
fecha_expiracion_certificado9:[''],
certificado10:[''],
fecha_expiracion_certificado10:[''],
certificado11:[''],
fecha_expiracion_certificado11:[''],
certificado12:[''],
fecha_expiracion_certificado12:[''],
certificado13:[''],
fecha_expiracion_certificado13:[''],
certificado14:[''],
fecha_expiracion_certificado14:[''],
certificado15:[''],
fecha_expiracion_certificado15:[''],
certificado16:[''],
fecha_expiracion_certificacion16:[''],
certificado17:[''],
fecha_expiracion_certificacion17:[''],
 /* Dato del Directorio y tecnico*/

  nombre_gerente_responsable:[''],
   telefono_gerente_responsable:[''],
   correo_gerente_responsable:[''],
   fecha_designacion_gerente_responsable:[''],

    nombre_responsable_operaciones:[''],
    telefono_responsable_operaciones:[''],
    correo_responsable_operaciones:[''],
    fecha_designacion_responsable_operaciones:[''],
    

    nombre_responsable_mantenimiento:[''],
    telefono_responsable_mantenimineto:[''],
    correo_responsable_mantenimiento:[''],
    fecha_designacion_responsable_mantenimiento:[''],

    nombre_responsable_sms:[''],
    telefono_responsable_sms:[''],
    correo_responsable_sms:[],
    fecha_designacion_responsable_sms:[''],

    nombre_responsable_calidad:[''],
    telefono_responsable_calidad:[''],
    
    correo_responsable_calidad:[''],
    fecha_designacion_responsable_calidad:[''],

    

    nombre_jefe_piloto:[''],
    telefono_jefe_piloto:[''],
    correo_jefe_piloto:[''],
    fecha_designacion_jefe_piloto:[''],

nombre_jefe_instruccion:[''],
telefono_jefe_instruccion:[''],
correo_jefe_instruccion:[''],
fecha_designacion_jefe_instruccion:[''],




 nombre_jefe_vuelo:[''],
 telefono_jefe_vuelo:[''],
 correo_jefe_vuelo:[''],
 fecha_designacion_jefe_vuelo:[''],


nombre_jefe_instruccion_teorica:[''],
telefono_jefe_instruccion_teorica:[''],
correo_jefe_instruccion_teorica:[''],
fecha_designacion_jefe_instrucion_teorica:[''],


nombre_aistente_instructor:[''],
telefono_asistente_instructor:[''],
correo_asistente_instructor:[''],
fecha_designacion_asistente_instructor:[''],




    /*  email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      
      ciudad: ['', Validators.required],
      pais: ['', Validators.required]*/
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
  /*if (this.validateCurrentTab() && this.selectedIndex < this.tabEnabled.length - 1) {
    this.tabEnabled[this.selectedIndex + 1] = true; // Habilita siguiente tab
    this.selectedIndex++;
  }*/
   this.selectedIndex++;
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
        width: '1000px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Datos del objetivo y metas e indicadores:', result);
        } else {
          this.form.get('tiene_sms')?.setValue(false); // desmarca si cancela
        }
      });
    }
  }

  registroAeronaves(): void {
    
    
      const dialogRef = this.dialog.open(RegistroAeronavesComponent, {
        width: '1000px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('hola como estas ');
          console.log('Datos del SMS aeronaves:', result);
        }
      });
    
  }
registroInstructores(): void {
    
    
      const dialogRef = this.dialog.open(RegistroInstructoresComponent, {
        width: '1000px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log("ddddddddddddddddddddd");
        if (result) {
          console.log('hola como estas ');
          console.log('Datos del instructors:', result);
        }
      });
    
  }





  onSubmit(): void {
    //if (this.form.valid) {


      console.log('Formulario completo:', this.form.value);
   /* } else {
      this.form.markAllAsTouched();
    }*/
  }
}
