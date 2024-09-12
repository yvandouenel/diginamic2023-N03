import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Offlinequeue {
  private readonly QUEUE_KEY = 'offline_queue';
  private isOnline: boolean = navigator.onLine;

  constructor(private http: HttpClient) {
    window.addEventListener('online', () => this.processQueue());
    window.addEventListener('offline', () => (this.isOnline = false));
  }

  addToQueue(url: string, method: string, body: any): void {
    console.log(`Dans addToQueue`);
    const queue = this.getQueue();
    queue.push({ url, method, body });
    this.saveQueue(queue);
    console.log(`Etat de la queue :`, queue);
  }

  processQueue(): void {
    if (!this.isOnline) return;
    console.log(`Dans processQueue`);
    const queue = this.getQueue();
    if (queue.length === 0) return;
    from(queue)
      .pipe(
        mergeMap((item) =>
          this.sendRequest(item).pipe(
            catchError((error) => {
              console.error('Error processing queued item:', error);
              return of(null);
            })
          )
        )
      )
      .subscribe(() => {
        this.clearQueue();
        this.isOnline = true;
      });
  }
  private sendRequest(item: any): Observable<any> {
    return this.http.request(item.method, item.url, { body: item.body }).pipe(
      tap(() => {
        const queue = this.getQueue();
        const index = queue.findIndex(
          (q) => q.url === item.url && q.method === item.method
        );
        if (index > -1) {
          queue.splice(index, 1);
          this.saveQueue(queue);
        }
      })
    );
  }

  private getQueue(): any[] {
    const queue = localStorage.getItem(this.QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  }

  private saveQueue(queue: any[]): void {
    localStorage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
  }

  private clearQueue(): void {
    localStorage.removeItem(this.QUEUE_KEY);
  }
}
