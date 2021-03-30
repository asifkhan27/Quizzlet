import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormailPipe } from './formail.pipe';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    AboutusComponent,
    ContactusComponent,
    ErrorpageComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    FormailPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent,NavbarComponent]
})
export class AppModule { }
