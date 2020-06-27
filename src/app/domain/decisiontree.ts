export interface DecisionTree {
    id: string;
    statement: string;
    isRoot: boolean;
    positive: DecisionTree;
    negative: DecisionTree;
}


export interface NodeDecision {
    [index:string]: boolean;
}
