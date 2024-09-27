import { Component } from '@angular/core';
import { ISchedulerFormData } from './scheduler/scheduler.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public formData: ISchedulerFormData = {
    title: '',
    startTime: '',
    endTime: '',
    desc: ''
  }
}
