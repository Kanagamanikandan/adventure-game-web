import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { DecisionTree } from '../domain/decisiontree';
import { environment } from '../../environments/environment';

@Injectable()
export class DecisionTreeService {

    readonly API_URL: string;
    constructor(private http: HttpClient) {
        this.API_URL = environment.apiUrl;
    }

    getDecisionTrees():Observable<DecisionTree[]> {
        return  this.http.get<DecisionTree[]>(`${this.API_URL}/decisiontree`);
    }

    getDecisionTreeById(id: string):Observable<DecisionTree> {
        return  this.http.get<DecisionTree>(`${this.API_URL}/decisiontree/${id}`);
    }
}
