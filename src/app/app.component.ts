import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Autocounselor';
  items: Observable<any[]>;
  quest: Observable<any[]>;
  chosenOption: string;
  options: string[] = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.quest = this.db.list('/quest').valueChanges();
  }
}
