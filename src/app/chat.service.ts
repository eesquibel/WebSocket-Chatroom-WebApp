import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { timestamp } from 'rxjs/operators';

const CHAT_URL = 'ws://' + location.host + '/ws';

export interface WebWrapper {
  Type: string,
  Payload: any
}

export interface Message {
  Id: string,
  Author: string,
  Message: string,
  Timestamp: Date
}

@Injectable()
export class ChatService {

  public messages: Subject<WebWrapper>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<WebWrapper>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): WebWrapper => {
        let data: WebWrapper = JSON.parse(response.data);
        return data;
      });
  }

}
