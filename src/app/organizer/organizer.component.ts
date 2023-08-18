import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TaskService } from '../shared/tasks.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  public form!: FormGroup;
  public tasks: Task[] = [];
  public editingTitle: string = '';

  constructor(
    public dateService: DateService,
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit() {
    const { title } = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      isEditing: false
    }

    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset()
    }, err => console.log(err));

  }

  removeTask(task: Task) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.log(err));
  }

  editTask(task: Task) {
    task.isEditing = true;
    this.editingTitle = task.title;
  }

  updateTask(task: Task) {
    task.isEditing = false;
    if (this.editingTitle !== task.title) {
      this.taskService.update(task).subscribe((res) => {

        Object.assign(task, res);
        this.cdRef.detectChanges();

      }, err => console.log(err));
    }
  }
}
