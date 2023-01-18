import { Component } from '@angular/core';
import { Manager } from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private nsOrders: any;

  constructor() {
    const ws = new Manager('http://localhost:3000');
    this.nsOrders = ws.socket('/orders')
      .on('connect', () => {
        console.log(`connected on: orders`);
      }).on('disconnect', () => {
        console.log(`disconnected on: orders`);
      });

    this.join();
  }

  join() {
    this.nsOrders.on('domain1', (data: any) => console.table(data));
  }

  send(domain: string) {
    this.nsOrders.emit('status', this.buildMessage(domain, 'new status'));
  }

  buildMessage(domain: string, status: string) {
    return {
      domain,
      order: 100,
      status
    };
  }
}

export interface Message {
  domain: string;
  order: number;
  status: string;
}
