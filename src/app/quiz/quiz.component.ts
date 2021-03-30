import { Component, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  showFBbutton:boolean=true;
  quizes?: any[]=[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string="";
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 600,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date=new Date();
  endTime: Date=new Date();
  ellapsedTime = '00:00';
  duration = '';

  countA=0;
  countUA=0;
  countC=0;
  countIC=0;
  countIC1=0;

  constructor(private quizService: QuizService) { 
  }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
      
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'Incorrect';
  };

  usersubmit(){
    let confirmation=window.confirm("Are you sure you want to submit the test ?");
    if(confirmation){
      this.onSubmit();
    }
  }
  onSubmit() {
      let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
    this.showFBbutton=false;

    this.AttemptedQues();
    this.CorrectAndIncorrect();
    this.countIC1=Math.abs(this.countUA-this.countIC);

    this.pieChart.dataTable= [
      ['Task', 'Hours per Day'],
      ['Correct',  this.countC],
      ['Incorrect', this.countIC1],
      ['Unattempted',this.countUA]
      
    ]
  }

//get total attempted and unattempted
  AttemptedQues(){
    this.countA=0;
    this.countUA=0;
   this.quiz.questions.forEach(element => {this.countAttempted(this.isAnswered(element))});
  }
  countAttempted(st:string){
    if(st=='Answered') this.countA++;
    else if(st=='Not Answered') this.countUA++;
  }
//get total correct and incorrect
  CorrectAndIncorrect(){
    this.countC=0;
    this.countIC=0;
    this.quiz.questions.forEach(element => {this.countCorrectIncorrect(this.isCorrect(element))});
  }
  countCorrectIncorrect(st:string){
    if(st=='correct') this.countC++;
    else if(st=='Incorrect') this.countIC++;
  }
// Result page
public pieChart: GoogleChartInterface = {
  chartType: 'PieChart',
  dataTable: [],
};
}
