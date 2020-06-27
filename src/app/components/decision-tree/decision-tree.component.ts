import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecisionTreeService } from 'src/app/services/decisionTreeService';
import { DecisionTree, NodeDecision } from 'src/app/domain/decisiontree';
import { ActivatedRoute } from '@angular/router';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'decision-tree',
  templateUrl: './decision-tree.component.html',
  styleUrls: ['./decision-tree.component.css'],
  providers: [DecisionTreeService],
  encapsulation: ViewEncapsulation.None
})
export class DecisionTreeComponent implements OnInit {

  public readonly id: string;
  tree: DecisionTree;
  nodeDecisions: NodeDecision = {};
  currentDecision: DecisionTree;
  treeForChart: TreeNode[] = [];
  endOfGame: boolean = false;


  constructor(private decisionTreeService: DecisionTreeService, private route:ActivatedRoute) { 
    this.id =  this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getDecisionTree();
  }

  public handleDecision(decision: boolean) {
    let currentDecision: DecisionTree = this.currentDecision;
    this.nodeDecisions[currentDecision.id] = decision;
    this.setCssClassForSelectedNode(this.treeForChart[0], currentDecision.id);
    this.currentDecision = decision ? currentDecision.positive : currentDecision.negative;

    let newDecision: DecisionTree = this.currentDecision;
    if(!(newDecision.positive || newDecision.negative)) {
      this.nodeDecisions[newDecision.id] = decision;
      this.setCssClassForSelectedNode(this.treeForChart[0], newDecision.id);
      this.endOfGame = true;
    }
  }

  public playAgain(){
    this.currentDecision = this.tree;
    Object.keys(this.nodeDecisions).forEach(key => this.nodeDecisions[key] = null);
    this.resetCssClassForNodes(this.treeForChart[0]);
    this.endOfGame = false;
  }

  private getDecisionTree(): void {
    this.decisionTreeService.getDecisionTreeById(this.id).subscribe(tree => {
      this.tree = tree;
      this.currentDecision = tree;
      this.buildNodeDecision(tree);
      this.buildTreeForChart(tree, null);
    });
 }

 private buildNodeDecision(tree: DecisionTree): void {
    this.nodeDecisions[tree.id] = null;
    if(tree.positive) this.buildNodeDecision(tree.positive);
    if(tree.negative) this.buildNodeDecision(tree.negative);
 }

 private buildTreeForChart(tree:DecisionTree, parentNode: TreeNode): void {
    let currentNodeForChart: TreeNode = {
      label: tree.statement,
      data: {id: tree.id},
      children: [],
      expanded: true,
      selectable: false
    };
    if(!parentNode) this.treeForChart.push(currentNodeForChart);
    else parentNode.children.push(currentNodeForChart);
    if(tree.positive) this.buildTreeForChart(tree.positive,currentNodeForChart);
    if(tree.negative) this.buildTreeForChart(tree.negative,currentNodeForChart);
 }

 private setCssClassForSelectedNode(tree: TreeNode, nodeId: string){
   if(tree.data && tree.data.id && tree.data.id === nodeId){
    tree.styleClass = "decisionPath";
    return;
   } else {
     tree.children.forEach(child => this.setCssClassForSelectedNode(child, nodeId));
   }
 }

 private resetCssClassForNodes(tree: TreeNode) {
   tree.styleClass = "";
   tree.children.forEach(child => this.resetCssClassForNodes(child));
 }

}