import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email:string="support@quizzlet.com";
  phno:string="+123-456789";
  constructor() { }

  ngOnInit(): void {
  }

}
