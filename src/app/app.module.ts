import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullComponent } from './layoutes/full/full.component';
import { ContentComponent } from './layoutes/content/content.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { RecherchePipe } from './pipes/recherche.pipe';



@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RecherchePipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
