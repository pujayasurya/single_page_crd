import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  users: User[] = [];

  onUserSave(newUser: User): void {
    this.users.push(newUser);
  }

  onUserDelete(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
