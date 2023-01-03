import { Component, OnInit } from '@angular/core';
import { FileItems } from 'src/app/models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {
  public estaSobreDrop =false;
  public archivos:FileItems[]=[];
  
  constructor(
    private _sCarg: CargaImagenesService
    ) { }

  ngOnInit(): void {
  }

  cargarImagenes(){
    this._sCarg.cargarImagenesFirebase(this.archivos);
  }
  pruebaSobreElemento(event:any){
    console.log(event);
    
  }

  limpiarArchivos(){
    this.archivos =[]
  }
}
