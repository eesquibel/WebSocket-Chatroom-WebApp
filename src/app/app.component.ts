import { Component, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService, Message } from './chat.service';
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
      console.log(msg.Author + ': ' + msg.Message);
      this.chatLog.push(msg);
      console.log(this.chatLog);
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
    this.chatService.messages.next(this.message);
    this.message.Message = '';
  }
}
