import { Component, OnInit } from '@angular/core';
import { Note } from '../../shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      //Animation entry
      transition('void => *',[ //not existing (void) to any state (*)
        //Initial State
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)', 
          'margin-bottom':0,
          //we have to expand out the padding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        //we first want to animate the spacing (which includes height and margin)
        animate('50ms', style({
          height:'*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(100)
      ]),
      transition('* => void', [ //anything to nothing
        //first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        //then scale down to normal size while beginning to fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        // scale down and face out completely
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        //then animate teh spacing (which includes height, margin and padding)
        animate('150ms ease-out', style({
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': 0,
        })),
      ]) 
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [ //psuedo selector for entering in
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [ //delay in animation 
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    //we want to retrieve all the notes from NotesService
    this.notes = this.notesService.getAll();
  }

  deleteNote(id: number){
    this.notesService.delete(id);
  }

}
