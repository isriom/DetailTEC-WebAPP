import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  token = sessionStorage.getItem("Token");
  rol = sessionStorage.getItem("Rol");
  http: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true',
    })
  };

  constructor(http: HttpClient) {
    this.http = http;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  async logout() {
    let res = await this.http.put("https://localhost:7143/logout", JSON.stringify({}), {
      headers: this.httpOptions.headers,
      withCredentials: true,
      observe: "response"
    })
    res.subscribe(result => {
      console.log(result);
      sessionStorage.clear();
      window.location.reload()
      window.location.assign("");
    }, error => console.error(error));
  }
}
