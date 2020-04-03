import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  //Don't need to do @Input since it matches data coming in
  @Input() title: string;
  @Input() body: string;

  @ViewChild('truncator', {static: false}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: false}) bodyText: ElementRef<HTMLElement>;
    
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    //work out if there is a text overflow or not
    //if there is, show truncator
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);

    let viewableHeight = parseInt(style.getPropertyValue("height"), 10); //base 10

    if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
      //if there is a text over flow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }else{
      //else (there is a text overflow), hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

}
