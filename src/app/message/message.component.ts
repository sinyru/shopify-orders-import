import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  public goCsvImport() {
    this.router.navigate(['']);
  }

}
