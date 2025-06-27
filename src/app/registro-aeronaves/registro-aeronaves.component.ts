import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-aeronaves',
  templateUrl: './registro-aeronaves.component.html',
  styleUrls: ['./registro-aeronaves.component.css']
})
export class RegistroAeronavesComponent {
constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistroAeronavesComponent>
  ) {
   
  }

 onCancel(): void {
    this.dialogRef.close(null);
  }

}
