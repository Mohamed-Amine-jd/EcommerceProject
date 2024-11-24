import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProduitComponent } from './components/produit/produit.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeconnecterComponent } from './components/seconnecter/seconnecter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinscrireComponent } from './components/sinscrire/sinscrire.component';
import { AjouterproduitComponent } from './components/ajouterproduit/ajouterproduit.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { AjoutercontactComponent } from './components/ajoutercontact/ajoutercontact.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditaboutComponent } from './components/editabout/editabout.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { UserComponent } from './components/user/user.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/aboutus/aboutus.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ProductDetailComponent } from './components/product-detail-component/product-detail-component.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { ProduitsponsoComponent } from './components/produitsponso/produitsponso.component';
import { FooterUserComponent } from './components/footer-user/footer-user.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';





@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    FooterComponent,
    SeconnecterComponent,
    SinscrireComponent,
    AjouterproduitComponent,
    HeaderAdminComponent,
    AjoutercontactComponent,
    ContactComponent,
    EditaboutComponent,
    HeaderUserComponent,
    UserComponent,
    HomeUserComponent,
    HeaderComponent,
    AboutUsComponent,
    HomeAdminComponent,
    ProductDetailComponent,
    AnnonceComponent,
    ProduitsponsoComponent,
    FooterUserComponent,
    FooterAdminComponent,
  
   
    

    
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

