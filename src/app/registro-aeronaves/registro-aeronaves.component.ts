import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray,  FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro-aeronaves',
  templateUrl: './registro-aeronaves.component.html',
  styleUrls: ['./registro-aeronaves.component.css']
})
export class RegistroAeronavesComponent {
  
  form: FormGroup;
constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistroAeronavesComponent>
  ) {
   this.form = this.fb.group({
      aeronaves: this.fb.array([])
    });
  }



  

  get aeronaves(): FormArray {
    return this.form.get('aeronaves') as FormArray;
  }

  addAeronave(): void {
    const aeronaveGroup = this.fb.group({
      matricula: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      serie: [''],
      fechaExpiracion: ['', Validators.required]
    });

    this.aeronaves.push(aeronaveGroup);
  }

  removeAeronave(index: number): void {
    this.aeronaves.removeAt(index);
  }

/*  onSubmit(): void {
    console.log(this.form.value);
  }
*/
onSubmit(): void {
    if (this.form.valid) {
       console.log("entro por si");
      this.dialogRef.close(this.form.value);
    } else {
      
      this.form.markAllAsTouched();
    }
  }


 onCancel(): void {
    this.dialogRef.close(null);
  }

}
