import { Component, OnInit } from '@angular/core';
import { DecisionTreeService } from 'src/app/services/decisionTreeService';
import { DecisionTree } from 'src/app/domain/decisiontree';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DecisionTreeService]
})
export class HomeComponent implements OnInit {

  trees: DecisionTree[];
  displayedColumns: string[] = ['sentence', 'actions'];

  constructor(private decisionTreeService: DecisionTreeService) { }

  ngOnInit() {
    this.getDecisionTrees();
  }

  getDecisionTrees(): void {
    this.decisionTreeService.getDecisionTrees().subscribe(trees => this.trees = trees);
 }
}