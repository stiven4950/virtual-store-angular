import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = "";

  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // Executes no Aync tasks
    // Befire componet be rendered
    // Only one times
    console.log("Constructor");
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    // Can execute any task sincronous or asyncronous
    console.log("ngOnChanges");
    console.log('-'.repeat(10));
    console.log(changes);

    // Search for duration changes
    const duration = changes['duration'];
    if (duration) {
      console.log("¿El valor ha cambiado?", duration.currentValue !== duration.previousValue)
      this.doSomething();
    }
  }

  ngOnInit() {
    // After render
    // only once
    // permit async executions
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration => ', this.duration);
    console.log('message => ', this.message);

    this.counterRef = window.setInterval(() => {
      console.log("Counter thrown")
      this.counter.update(prevState => prevState + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    // After render, after ngOnInit
    // this trigger actions when component has been rendered
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    // If component has been destroyed
    // And is created again, all life cicle is triggered
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));

    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log("Duration has changed its value");
  }
}
