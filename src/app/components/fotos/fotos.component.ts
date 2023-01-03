import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit {

  constructor(
    public _sCarg: CargaImagenesService
    ) { }

  ngOnInit(): void {
    this._sCarg.cargarMensajes().subscribe((data)=>{
      // console.log(data);
      
    })
  }

}
