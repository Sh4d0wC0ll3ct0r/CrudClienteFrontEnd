import { Injectable } from  '@angular/core';
import {Http,Response,Headers} from '@angular/http' ;
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Cliente} from '../modelos/cliente';
import {GLOBAL} from './global'
import { CLIENTES } from '../mock/mock-clientes';

@Injectable()
export class ClienteService{
    public url:String;

    constructor(private _http:Http){
        this.url=GLOBAL.url;
    }

    getClientes(){
        return this._http.get(this.url+'clientes').map(res=>res.json());
       //return CLIENTES;
    }
    addCliente(cliente: Cliente){
		let json = JSON.stringify(cliente);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'cliente', params, {headers: headers})
						 .map(res => res.json());
    }
    editCliente(id:String, cliente: Cliente){
		let json = JSON.stringify(cliente);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'cliente/'+id, params, {headers: headers})
						 .map(res => res.json());
	}
    public deleteCliente(id : String)
    {
        return this._http.delete(this.url+'cliente/'+ id).map(res => res.json());;
    }
}