import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, map, pipe, tap } from "rxjs";
import * as moment from "moment";


export interface Task {
    id?: string,
    title: string,
    date?: string,
    isEditing?: boolean
}

interface CreateResponse {
    name: string
}

interface FirebaseRequest {
    title: string,
    date?: string
}

interface FirebaseMapResponse {
    [key: string]: FirebaseRequest;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    static URL: string = 'https://angular-first-calendar-default-rtdb.europe-west1.firebasedatabase.app/tasks';

    constructor(
        private http: HttpClient
    ) { }

    public create(task: Task): Observable<Task> {
        const request: FirebaseRequest = {
            title: task.title,
            date: task.date
        };
        return this.http
            .post<CreateResponse>(`${TaskService.URL}/${task.date}.json`, request)
            .pipe(
                map(res => {
                    return { ...task, id: res.name }
                })
            )
    }

    public load(date: moment.Moment): Observable<Task[]> {
        return this.http
            .get<FirebaseMapResponse>(`${TaskService.URL}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(
                map((tasks: FirebaseMapResponse) => {
                    if (!tasks) {
                        return [];
                    }
                    return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
                })
            )
    }

    public update(task: Task): Observable<Task> {
        const request: FirebaseRequest = {
            title: task.title,
            date: task.date
        };
        return this.http
            .put<Task>(`${TaskService.URL}/${task.date}/${task.id}.json`, request);
    }

    public remove(task: Task): Observable<void> {
        return this.http
            .delete<void>(`${TaskService.URL}/${task.date}/${task.id}.json`);
    }
}