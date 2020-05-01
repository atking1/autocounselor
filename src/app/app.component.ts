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
  hidden = true;
  weights: [];
  questions: any[];
  majorGroups: any[];
  major: any[];
  jobs: any[];
  largestIndex: number;
  scores: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  constructor(db: AngularFireDatabase) {
    db.list('/questions').valueChanges().subscribe(questions => {
      this.questions = questions;
      console.log(this.questions);
    });
    db.list('/majorGroups').valueChanges().subscribe(majorGroups => {
      this.majorGroups = majorGroups;
      console.log(this.majorGroups);
    });
  }
  decrementCounter() {
    if (this.counter >= 5) {
      this.counter -= 5;
    } else {
      (document.getElementById('PrevButton') as HTMLInputElement).disabled = true;
    }
    if (this.counter === 0) {
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
    if (this.counter >= this.questions.length || this.counter === this.questions.length) {
      (document.getElementById('NextButton') as HTMLInputElement).disabled = true;
      (document.getElementById('FinishButton') as HTMLInputElement).disabled = false;
    }
    (document.getElementById('PrevButton') as HTMLInputElement).disabled = false;
    console.log(this.counter);
  }
  computeScores() {
    for (const question of this.questions) {
      if (question.chosenOption === 0) {
        console.log('Questions incomplete');
        return;
      }
    }
    document.getElementById('questionList').style.visibility = 'hidden';
    document.getElementById('PrevButton').style.visibility = 'hidden';
    document.getElementById('NextButton').style.visibility = 'hidden';
    document.getElementById('FinishButton').style.visibility = 'hidden';
    let i: number;
    console.log(this.questions.length);
    for (const question of this.questions) {
      this.weights = question.weight.split(',');
      console.log(this.weights);
      console.log(question.chosenOption);
      for (i = 0; i < this.weights.length; i++) {
        if (this.weights[i] !== 0) {
          if (question.chosenOption === 1) {
            this.scores[i] -= (2 * this.weights[i]);
          } else if (question.chosenOption === 2) {
            this.scores[i] -= this.weights[i];
          } else if (question.chosenOption === 4) {
            this.scores[i] += this.weights[i];
          } else if (question.chosenOption === 5) {
            this.scores[i] += (2 * this.weights[i]);
          } else {
            continue;
          }
        }
      }
    }
    let largestScore = 0;
    this.largestIndex = 0;
    let largest = this.majorGroups[0];
    for (i = 0; i <= this.scores.length; i++) {
      if (this.scores[i] > largestScore) {
        largestScore = this.scores[i];
        this.largestIndex = i;
        largest = this.majorGroups[i];
      }
    }
    this.major = largest.majors;
   // this.jobs = this.major.jobs;
    console.log(this.scores);
    this.hidden = false;
  }
}
