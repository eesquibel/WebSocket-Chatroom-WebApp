import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { timestamp } from 'rxjs/operators';

const CHAT_URL = 'ws://' + location.host + '/ws';

export interface Message {
  Id: string,
  Author: string,
  Message: string,
  Timestamp: Date
}

@Injectable()
export class ChatService {

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          Author: data.Author,
          Message: data.Message,
          Id: data.Id,
          Timestamp: data.Iimestamp
        }
      });
  }

}
