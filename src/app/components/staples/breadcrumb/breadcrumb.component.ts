import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ListChaptersResponse } from '../../../models/listchapters';
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  currentUrl: string = '';
  novelName: string = '';
  capNro: string = '';
  partesmin: string[] = [];
  partes: string[] = [];
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.partesmin = this.currentUrl?.split('/');
        this.partes = this.partesmin.map((str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }); // Divide a string em partes usando '/'
        if (this.partes.length >= 2) {
          this.novelName = this.partes[2]?.replace(/-/g, ' ');
          this.novelName = this.capitalizeWords(this.novelName);
        }

        this.capNro = this.partes[4];
      }
    });
  }
  capitalizeWords(input: string): string {
    const words = input?.split(' '); // Divide a string em palavras
    const capitalizedWords = words?.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords?.join(' '); // Junta as palavras novamente
  }
}
