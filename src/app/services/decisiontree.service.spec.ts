import { TestBed, getTestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DecisionTreeService } from "./decisiontreeservice";
import { DecisionTree } from '../domain/decisiontree';

describe('DecisionTreeService', () => {

  let injector: TestBed;
  let service: DecisionTreeService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DecisionTreeService]
    });

    injector = getTestBed();
    service = injector.get(DecisionTreeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  
  });

  it('should be created', () => {
    const decisionTreeService: DecisionTreeService = TestBed.inject(DecisionTreeService);
    expect(decisionTreeService).toBeTruthy();
  });

  it('should get decision trees', () => {
    const trees: DecisionTree[] = [
      { id: "1", statement: "Do you want a doughnut?", isRoot: true, positive: null, negative: null },
      { id: "2", statement: "Do you want in lobster ink?", isRoot: true, positive: null, negative: null },
    ];

    service.getDecisionTrees().subscribe(trees => {
      expect(trees.length).toBe(2);
      expect(trees).toEqual(trees);
    });

    const req = httpMock.expectOne(`${service.API_URL}/decisiontree`);
    expect(req.request.method).toBe("GET");
    req.flush(trees);
  });


  it('should get decision tree by id', () => {
    const tree: DecisionTree = {
      id: "1", 
      statement: "Do you want a doughnut?",
      isRoot: true,
      positive: null,
      negative: null
    };

    service.getDecisionTreeById(tree.id).subscribe(trees => {
      expect(tree).toEqual(tree);
    });

    const req = httpMock.expectOne(`${service.API_URL}/decisiontree/${tree.id}`);
    expect(req.request.method).toBe("GET");
    req.flush(tree);
  });
})