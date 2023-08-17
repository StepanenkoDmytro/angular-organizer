import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, map, pipe } from "rxjs";
import * as moment from "moment";


export interface Task {
    id?: string,
    title: string,
    date?: string
}

interface CreateResponse {
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    static url = 'https://angular-first-calendar-default-rtdb.europe-west1.firebasedatabase.app/tasks';

    constructor(
        private http: HttpClient
    ) { }

    create(task: Task): Observable<Task> {
        return this.http
            .post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
            .pipe(
                map(res => {
                    console.log('Response ', res);
                    return { ...task, id: res.name }
                })
            )
    }

    load(date: moment.Moment): Observable<Task[]> {
        return this.http
            .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(
                map((tasks: Task[]) => {
                    if (!tasks) {
                        return [];
                    }
                    // console.log(tasks);
                    // const mock: Task[] = []
                    // return mock;
                    const tasksArray: Task[] = [];

                    for (const key in tasks) {
                        if (tasks.hasOwnProperty(key)) {
                            const task: Task = {
                                id: key,
                                ...tasks[key]
                            };
                            tasksArray.push(task);
                        }
                    }
                    return tasksArray;
                    // return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
                })
            )
    }

    remove(task: Task): Observable<void> {
        console.log('Try to delete ', task.id, `${TaskService.url}/${task.date}/${task.id}.json`);
        return this.http
            .delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`);
    }
}