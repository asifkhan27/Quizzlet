import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/Python.json', name: 'Python' },
      { id: 'data/Angular.json', name: 'Angular' },
      { id: 'data/Java.json', name: 'Java' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ];
  }

}
