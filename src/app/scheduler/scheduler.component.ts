import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface ISchedulerFormData {
  id?: string,
  title: string | null,
  startTime: string | null,
  endTime: string | null,
  desc: string | null
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @Input()
  public formData!: ISchedulerFormData;

  public taskFormGroup!: FormGroup;
  public titleCtrl!: FormControl<string | null>;
  public startTimeCtrl!: FormControl<string | null>;
  public endTimeCtrl!: FormControl<string | null>;
  public descCtrl!: FormControl<string | null>;

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.taskFormGroup = this.buildForm();
  }

  private buildForm(): FormGroup {
    this.titleCtrl = new FormControl<string | null>(this.formData.title, [Validators.required]);
    this.startTimeCtrl = new FormControl<string | null>(this.formData.startTime, [Validators.required]);
    this.endTimeCtrl = new FormControl<string | null>(this.formData.endTime, [Validators.required]);
    this.descCtrl = new FormControl<string | null>(this.formData.endTime, [Validators.required]);

    const group = this.formBuilder.group({
      title: this.titleCtrl,
      startTime: this.startTimeCtrl,
      endTime: this.endTimeCtrl,
      desc: this.descCtrl
    });

    return group;
  }

  checkForm() {
    console.log(this.taskFormGroup);
    console.log(this.titleCtrl.value);
  }
}
