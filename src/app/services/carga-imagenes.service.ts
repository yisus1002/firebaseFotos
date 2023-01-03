import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { FileItems } from '../models/file-items';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import 'firebase/compat/storage'; 
import { async } from '@angular/core/testing';
import { map, Observable } from 'rxjs';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private CARPERAIMAGENES= 'img';
  public imagenes:FileItems[]=[]

  constructor(
    private afs: AngularFirestore,
    ) { 
      this.itemsCollection = this.afs.collection<any>(this.CARPERAIMAGENES,);


    }

  private guardarImage(imagen:{nombre:string, url:string}){
    this.itemsCollection.add(imagen)
  }

  public cargarImagenesFirebase(imagenes:FileItems[]){
    // let storageRef = firebase.storage().ref();
    let storageRef = firebase.app().storage().ref();
    for(const item of imagenes){
      item.estadoSubiendo =true;
      if(item.progreso >=100){
        continue;
      }
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPERAIMAGENES}/${item.nombreArchivo}`)
      .put(item.archivo);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot:firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100,
        (error) => console.log(`Error al subir `, error),
       async ()=>{
          console.log('cargada corectamente');
         await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => item.url = downloadURL);
          item.estadoSubiendo =false;
          this.guardarImage({
            nombre: item.nombreArchivo,
            url: item.url
          })
        }
        )
    }
  }
  
  cargarMensajes():Observable<FileItems[]>{
  
    return this.itemsCollection.valueChanges()
    .pipe(map((data:FileItems[])=>{
      console.log(data);
      this.imagenes=[];
      for( let mensaje of data){
        this.imagenes.unshift(mensaje)
      } 
     return this.imagenes
    }))
  }

}
