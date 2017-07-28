import { NgModule }      from '@angular/core';
import { routing,appRoutingProviders }  from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule,routing  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [appRoutingProviders]
})
export class AppModule { }
