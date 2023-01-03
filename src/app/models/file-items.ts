export class FileItems {
    public archivo:File;
    public nombreArchivo:string;
    public url! :string;
    public estadoSubiendo: boolean;
    public progreso:number;


    constructor(archivo:File){
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;

    this.estadoSubiendo=false;
    this.progreso=0;
    }
}
