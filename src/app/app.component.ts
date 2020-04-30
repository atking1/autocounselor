import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Autocounselor';
  counter = 0;
  stronglyDisagree: boolean;
  disagree: boolean;
  neutral: boolean;
  agree: boolean;
  stronglyAgree: boolean;
  questions: any[];
  collectedAnswers = [];
  scores: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  options: string[] = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  constructor(db: AngularFireDatabase) {
    db.list('/questions').valueChanges().subscribe(questions => {
      this.questions = questions;
      console.log(this.questions);
      this.collectedAnswers.fill(this.questions.length);
      console.log(this.collectedAnswers);
      // while (this.collectedAnswers.length !== this.questions.length) {
//
     // }
    });
  }
  decrementCounter() {
    if (this.counter >= 5) {
      this.counter -= 5;
    } else {
      (document.getElementById('PrevButton') as HTMLInputElement).disabled = true;
    }
    (document.getElementById('NextButton') as HTMLInputElement).disabled = false;
    console.log(this.counter);
  }
  incrementCounter() {
    if (this.counter <= this.questions.length) {
      this.counter += 5;
    } else {
      (document.getElementById('NextButton') as HTMLInputElement).disabled = true;
      (document.getElementById('FinishButton') as HTMLInputElement).disabled = false;
    }
    (document.getElementById('PrevButton') as HTMLInputElement).disabled = false;
    console.log(this.counter);
  }
  computeScores() {
    document.getElementById('questionList').style.visibility = 'hidden';
    document.getElementById('PrevButton').style.visibility = 'hidden';
    document.getElementById('NextButton').style.visibility = 'hidden';
    document.getElementById('FinishButton').style.visibility = 'hidden';
    for (const question of this.questions) {
      console.log(question.chosenOption);
      if (question.chosenOption === 1) {
      } else if (question.chosenOption === 2) {

      } else if (question.chosenOption === 3) {
      } else if (question.chosenOption === 4) {
      } else {
        break;
      }
    }
  }
  onChanges(val) {
    console.log(val);
  }
}
