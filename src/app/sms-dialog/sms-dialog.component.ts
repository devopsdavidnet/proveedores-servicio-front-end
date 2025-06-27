import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-sms-dialog',
  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.css']
})
export class SmsDialogComponent {

  smsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SmsDialogComponent>
  ) {
    this.smsForm = this.fb.group({
      responsable: ['', Validators.required],
      fechaImplementacion: ['', Validators.required],
      nivelMadurez: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.smsForm.valid) {
       console.log("entro por si");
      this.dialogRef.close(this.smsForm.value);
    } else {
      console.log("Entro por no");
      this.smsForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

}
