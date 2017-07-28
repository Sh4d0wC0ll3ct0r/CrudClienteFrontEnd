import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {ClienteService} from './servicios/cliente.service';
import {Cliente} from './modelos/cliente';
@Component({
  selector: 'my-app',
  templateUrl: `app/views/contenedor-global.html`,
  providers:[ClienteService]
})
export class AppComponent implements OnInit { 
    name = 'Angular'; 
    titulo: String;
    public clientes: Cliente[];
    public cliente: Cliente;
    public idCliente: String;
    public errorMessage: any;
    public editing:boolean
    public showForm:boolean;
   constructor(
     public _route: ActivatedRoute,
     public _router: Router,
     public _clienteService: ClienteService
   ){
     this.titulo='Contenedor';
     this.editing = false;
     this.showForm= false;
     
   };
   ngOnInit(){
       console.log('cliente-list.component.ts cargado');
       //console.log(this.getClientes());
       this.cliente = new Cliente("","",false);
       this.getClientes();
   } 
  public getClientes(){
     this._clienteService.getClientes()
            .subscribe(result => {
                this.clientes = result.clientes;
                console.log(this.clientes);
                if(!this.clientes){
                    alert('Error en el servidor');
                }          
            },
            error=>{
                this.errorMessage = <any>error;
                if(this.errorMessage != null){
                    console.log("fffff "+this.errorMessage);
                }
            });
   }

  editCliente(id:String,cli:Cliente){
    this.editing = true;
    this.cliente = cli;
    this.idCliente = id;
    this.showForm= true;
  
  }
  onSubmit(){
  if(this.editing){
	this._route.params.forEach((params: Params) => {
			let id = this.idCliente;
      console.log("id del cliente : "+ id);
			this._clienteService.editCliente(id, this.cliente).subscribe(
				response => {
					this.cliente = response.cliente;

					if(!response.cliente){
						alert('Error en el servidor');
					}else{ 
            this.cliente = {nombre:null, email:null, estado: false};
						this._router.navigate(['/cliente', id]);
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						this._router.navigate(['/']);
					}
				}
			);

		});
  }
   else { 
	this._clienteService.addCliente(this.cliente).subscribe(
			response => {
				this.cliente = response.cliente;
				if(!response.cliente){
                    console.log("error"+this.cliente);
					alert("Error en el servidor");
				}else{
          this.getClientes();
          this.cliente = {nombre:null, email:null, estado: false};
					this._router.navigate(['/']);
				}
			},
			error => {
				this.errorMessage = <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
				}
			}
    );
   } 
  }
  public mostrarForm(){
    this.editing = false;
    this.showForm=true;
    this.cliente = {nombre:null, email:null, estado: false};
  }
   public viewCliente(cli:Cliente)
   {
      this.cliente= cli;
      this.showForm=false;
   }
   public deleteCliente(id:String)
   {
      this._clienteService.deleteCliente(id).subscribe(
			response => {
				if(!response.cliente){
					alert('Error en el servidor');
				}
        this.getClientes();
        this.cliente = {nombre:null, email:null, estado: false};
			},
			error => {
				this.errorMessage = <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
				}
			}
		);
   }




}
