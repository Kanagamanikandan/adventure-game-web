import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DecisionTreeService } from 'src/app/services/decisiontreeservice';
import { ComponentFactory } from '@angular/core';
import { DecisionTree } from 'src/app/domain/decisiontree';
import { Observable, of } from 'rxjs';

describe('HomeComponent', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let getTreesSpy: jasmine.Spy;
  let testTrees: DecisionTree[] = [
    { id: "1", statement: "Do you want a doughnut?", isRoot: true, positive: null, negative: null },
    { id: "2", statement: "Do you want in lobster ink?", isRoot: true, positive: null, negative: null },
  ];

  beforeEach(() => {

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
    platformBrowserDynamicTesting());

    const decisionTreeService  = jasmine.createSpyObj('DecisionTreeService', ['getDecisionTrees']);
    getTreesSpy = decisionTreeService.getDecisionTrees.and.returnValue(of(testTrees));

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        {provide: DecisionTreeService, useValue: decisionTreeService}
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });

  it('Should render the product list table', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('table')).toBeTruthy();
  });
  

});
