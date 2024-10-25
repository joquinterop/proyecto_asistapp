import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {

  constructor(private router: Router) { }

  volver(){
    this.router.navigate(['/professor-profile'])
  }

  ngOnInit() {
  }

}
