import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DecisionTreeComponent } from './decision-tree.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DecisionTreeService } from 'src/app/services/decisiontreeservice';
import { ComponentFactory } from '@angular/core';
import { DecisionTree } from 'src/app/domain/decisiontree';
import { Observable, of } from 'rxjs';

describe('DecisionTreeComponent', () => {
  let comp: DecisionTreeComponent;
  let fixture: ComponentFixture<DecisionTreeComponent>;
  let getTreeSpy: jasmine.Spy;
  let testTree: DecisionTree = { id: "1", statement: "Do you want a doughnut?", isRoot: true, positive: null, negative: null };
  let treeElement: HTMLElement;

  beforeEach(() => {

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
    platformBrowserDynamicTesting());

    const decisionTreeService  = jasmine.createSpyObj('DecisionTreeService', ['getDecisionTreeById']);
    getTreeSpy = decisionTreeService.getDecisionTreeById.and.returnValue(of(testTree));

    TestBed.configureTestingModule({
      declarations: [DecisionTreeComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        {provide: DecisionTreeService, useValue: decisionTreeService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DecisionTreeComponent);
    comp = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });

  it('Back to list component should be rendered', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('button').textContent).toEqual("Back to List");
  });
  

});
