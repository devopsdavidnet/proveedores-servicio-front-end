import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-registro-instructores',
  templateUrl: './registro-instructores.component.html',
  styleUrls: ['./registro-instructores.component.css']
})
export class RegistroInstructoresComponent implements OnInit  {

  form: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<RegistroInstructoresComponent>) {
    this.form = this.fb.group({
      personal: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addPersona(); // Añadir uno por defecto
  }

  get personalArray(): FormArray {
    return this.form.get('personal') as FormArray;
  }

  addPersona(): void {
    const personaForm = this.fb.group({
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      cedula: ['', Validators.required],
      licencia: ['', Validators.required]
    });

    this.personalArray.push(personaForm);
  }

  removePersona(index: number): void {
    this.personalArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close(this.form.value);
     // alert('Formulario enviado correctamente');
    } else {
      this.form.markAllAsTouched();
    }
  }

   onCancel(): void {
    this.dialogRef.close(null);
  }

}
