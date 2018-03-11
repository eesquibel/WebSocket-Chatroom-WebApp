import { Component, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService, WebWrapper, Message } from './chat.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, ChatService]
})
export class AppComponent {
  title: string = 'app';
  message: Message;
  chatLog: Message[] = [];

  constructor(private chatService: ChatService, private chRef: ChangeDetectorRef) {
    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: ", msg);

      switch (msg.Type) {
        case 'ChatMessage':
          this.chatLog.push(msg.Payload);
          break;
        case 'ChatMessageCollection':
          this.chatLog = msg.Payload;
          break;
      }
    });

    this.message = {
      Author: 'Screen',
      Message: '',
      Id: '00000000-0000-0000-0000-000000000000',
      Timestamp: new Date()
    };
  }
  
  sendMsg() {
    console.log('new message from client to websocket: ', this.message);

    let payload: WebWrapper = {
      Type: 'ChatMessage',
      Payload: this.message
    };

    this.chatService.messages.next(payload);
    this.message.Message = '';
  }
}
