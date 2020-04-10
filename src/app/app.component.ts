import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Autocounselor';
  questions: any[];
  chosenOption: string;
  options: string[] = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  constructor(db: AngularFireDatabase) {
    db.list('/questions').valueChanges().subscribe(questions => {
      this.questions = questions;
      console.log(this.questions);
    });

  }

}
