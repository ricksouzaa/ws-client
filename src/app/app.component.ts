import { Component } from '@angular/core';
import { Manager } from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private nsp1: any;
  private nsp2: any;

  constructor() {
    const ws = new Manager('http://localhost:3000');
    this.nsp1 = ws.socket('/nsp1')
      .on('connect', () => {
        console.log(`connected on: nsp1`);
      }).on('disconnect', () => {
        console.log(`disconnected on: nsp2`);
      });

    this.nsp2 = ws.socket('/nsp2');
    this.nsp2.on('connect', () => {
      console.log(`connected on: nsp2`);
    });
    this.nsp2.on('disconnect', () => {
      console.log(`disconnected on: nsp2`);
    });
    this.join();
  }

  join() {
    // const message = this.buildMessage('datweb', 'teste');
    // this.ws.nsp = '/delivery';
    // this.ws.on('connect', () => {
    // this.ws.emit('join', message);
    // });
    this.nsp1.on('datweb', (data: any) => console.table(data));
    this.nsp2.on('datwebx', (data: any) => console.table(data));
  }

  sendNsp1() {
    this.nsp1.emit('status', this.buildMessage('datweb', 'mudou o status'));
  }

  sendNsp2() {
    this.nsp2.emit('status', this.buildMessage('datweb', 'mudou o status'));
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
