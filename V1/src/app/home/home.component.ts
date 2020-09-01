import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.loadScripts();
  }

  loadScripts() { 
  
    // This array contains all the files/CDNs 
    const dynamicScripts = [ 
        'assets/js/aos.js',
        'assets/js/main.js'
       //Load all your script files here'
    ]; 
    for (let i = 0; i < dynamicScripts.length; i++) { 
      const node = document.createElement('script'); 
      node.src = dynamicScripts[i]; 
      node.type = 'text/javascript'; 
      node.async = false; 
      document.getElementsByTagName('head')[0].appendChild(node); 
    } } 

}
