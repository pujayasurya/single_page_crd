import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() users: User[] = [];
  @Output() deleteUser = new EventEmitter<number>();
  filterText: string = '';
  filteredUsers: User[] = [];

  ngOnChanges(): void {
    this.filteredUsers = this.users;
  }

  onDelete(userId: number): void {
    this.deleteUser.emit(userId);
  }

  onFilter(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
