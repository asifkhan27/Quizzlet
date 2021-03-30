import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "src/app/home/home.component";
import {AboutusComponent} from "src/app/aboutus/aboutus.component";
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ContactusComponent } from './contactus/contactus.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
{path:"aboutus", component:AboutusComponent},
{path:"contactus", component:ContactusComponent},
{path:"home", component:HomeComponent},
{path:"quiz", component:QuizComponent},
{path:"errorpage", component:ErrorpageComponent},
{path: "", component:HomeComponent, pathMatch:'full'},
{path:"**", component:ErrorpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
