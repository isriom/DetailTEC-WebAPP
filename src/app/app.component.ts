import {Component, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private santizer: DomSanitizer) {
  }

  transform(url: string): any {
    return this.santizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
}


