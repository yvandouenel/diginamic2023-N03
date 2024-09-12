import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Title } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// Décorateur avec ses annotations. Ce décorateur fait appel à une directive qui est une classe qui va
// déterminer (via les annotations) le comportement du composant
@Component({
  selector: 'digi-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'TODOLIST';
  constructor(headTitle: Title) {
    headTitle.setTitle('Test de titre');
  }
}
