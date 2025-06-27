import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray,  FormControl } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface TreeNode {
  label: string;
  level: number;
  expandable: boolean;
  indexPath: number[]; // [objetivo, meta?, indicador?]
  type: 'objetivo' | 'meta' | 'indicador';
}


@Component({
  selector: 'app-sms-dialog',
  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.css']
})
export class SmsDialogComponent {
/*
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
  */
form: FormGroup;
  expandedNodes: Set<string> = new Set();

  treeControl = new FlatTreeControl<TreeNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<TreeNode, TreeNode>(
    node => node,
    node => node.level,
    node => node.expandable,
    () => []
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      objetivos: this.fb.array([]),
    });
    this.addObjetivo();
  }

  get objetivos(): FormArray {
    return this.form.get('objetivos') as FormArray;
  }

  getMetas(i: number): FormArray {
    return this.objetivos.at(i).get('metas') as FormArray;
  }

  getIndicadores(i: number, j: number): FormArray {
    return this.getMetas(i).at(j).get('indicadores') as FormArray;
  }

  private getNodeKey(node: TreeNode): string {
    return `${node.type}-${node.indexPath.join('-')}`;
  }

  private restoreExpandedNodes(nodes: TreeNode[]) {
    nodes.forEach(n => {
      const key = this.getNodeKey(n);
      if (this.expandedNodes.has(key)) {
        this.treeControl.expand(n);
      }
    });
  }

  private storeExpandedNodes() {
    this.expandedNodes.clear();
    this.treeControl.dataNodes?.forEach(n => {
      if (this.treeControl.isExpanded(n)) {
        this.expandedNodes.add(this.getNodeKey(n));
      }
    });
  }

  addObjetivo() {
    const index = this.objetivos.length;
    this.objetivos.push(this.fb.group({
      nombreObjetivo: [''],
      metas: this.fb.array([]),
    }));
    setTimeout(() => {
      this.refreshTree();
      const node = this.dataSource.data.find(n => n.type === 'objetivo' && n.indexPath[0] === index);
      if (node) this.treeControl.expand(node);
    });
  }

  addMeta(i: number) {
    const metas = this.getMetas(i);
    const metaIndex = metas.length;
    metas.push(this.fb.group({
      nombreMeta: [''],
      indicadores: this.fb.array([]),
    }));
    setTimeout(() => {
      this.refreshTree();
      const node = this.dataSource.data.find(n => n.type === 'meta' && n.indexPath[0] === i && n.indexPath[1] === metaIndex);
      if (node) this.treeControl.expand(node);
    });
  }

  addIndicador(i: number, j: number) {
    const indicadores = this.getIndicadores(i, j);
   
indicadores.push(this.fb.group({
  nombreIndicador: [''],
  periodicidad: [''],
  tipo: [''],
  formula: [''],
  alerta1: [''],
  alerta2: [''],
  alerta3: [''],





    }));
    setTimeout(() => {
      this.refreshTree();
      const node = this.dataSource.data.find(n => n.type === 'meta' && n.indexPath[0] === i && n.indexPath[1] === j);
      if (node) this.treeControl.expand(node);
    });
  }

  removeObjetivo(i: number) {
    this.objetivos.removeAt(i);
    this.refreshTree();
  }

  removeMeta(i: number, j: number) {
    this.getMetas(i).removeAt(j);
    this.refreshTree();
  }

  removeIndicador(i: number, j: number, k: number) {
    this.getIndicadores(i, j).removeAt(k);
    this.refreshTree();
  }

  refreshTree() {
    this.storeExpandedNodes();
    const nodes: TreeNode[] = [];

    this.objetivos.controls.forEach((_, i) => {
      nodes.push({
        label: `Objetivo ${i + 1}`,
        level: 0,
        expandable: true,
        type: 'objetivo',
        indexPath: [i],
      });

      const metas = this.getMetas(i);
      metas.controls.forEach((_, j) => {
        nodes.push({
          label: `Meta ${i + 1}.${j + 1}`,
          level: 1,
          expandable: true,
          type: 'meta',
          indexPath: [i, j],
        });

        const indicadores = this.getIndicadores(i, j);
        indicadores.controls.forEach((_, k) => {
          nodes.push({
            label: `Indicador ${i + 1}.${j + 1}.${k + 1}`,
            level: 2,
            expandable: false,
            type: 'indicador',
            indexPath: [i, j, k],
          });
        });
      });
    });

    this.dataSource.data = nodes;
    setTimeout(() => this.restoreExpandedNodes(this.dataSource.data));
  }

  hasChild = (_: number, node: TreeNode) => node.expandable;

  getNombreObjetivoControl(i: number): FormControl {
    return this.objetivos.at(i).get('nombreObjetivo') as FormControl;
  }

  getNombreMetaControl(i: number, j: number): FormControl {
    return this.getMetas(i).at(j).get('nombreMeta') as FormControl;
  }

  getNombreIndicadorControl(i: number, j: number, k: number): FormControl {
    return this.getIndicadores(i, j).at(k).get('nombreIndicador') as FormControl;
  }

  getPeriodicidadControl(i: number, j: number, k: number): FormControl {
    return this.getIndicadores(i, j).at(k).get('periodicidad') as FormControl;
  }

  getTipoIndicadorControl(i: number, j: number, k: number): FormControl {
  return this.getIndicadores(i, j).at(k).get('tipo') as FormControl;
}
getFormulaControl(i: number, j: number, k: number): FormControl {
  return this.getIndicadores(i, j).at(k).get('formula') as FormControl;
}
getNivelAlerta1Control(i: number, j: number, k: number): FormControl {
  return this.getIndicadores(i, j).at(k).get('alerta1') as FormControl;
}
getNivelAlerta2Control(i: number, j: number, k: number): FormControl {
  return this.getIndicadores(i, j).at(k).get('alerta2') as FormControl;
}
getNivelAlerta3Control(i: number, j: number, k: number): FormControl {
  return this.getIndicadores(i, j).at(k).get('alerta3') as FormControl;
}


}
