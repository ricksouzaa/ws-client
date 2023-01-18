import { Component } from '@angular/core';
import { Manager } from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private ns: any;

  constructor() {
    const ws = new Manager('http://localhost:3000');
    this.ns = ws.socket('/domain1')
      .on('connect', () => {
        console.log(`connected on: /domain1`);
      }).on('disconnect', () => {
        console.log(`disconnected on: /domain1`);
      });

    this.join();
  }

  join() {
    this.ns.on('/domain1', (data: any) => console.table(data));
  }

  send(status: string) {
    this.ns.emit('notify', status || 'new status');
  }
}
