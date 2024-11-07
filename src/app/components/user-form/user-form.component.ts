import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Output() saveUser = new EventEmitter<User>();
  userForm!: FormGroup;
  private userIdCounter: number = 1;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      //hobbies: this.fb.array([this.fb.control('', Validators.required)]), // Initialize with one control
    });
  }

  // Getter for hobbies FormArray
  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  // Add a new hobby control to the FormArray
  addHobby(): void {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  // Remove a hobby control from the FormArray by index
  removeHobby(index: number): void {
    if (this.hobbies.length > 1) { // Ensure there's always at least one hobby input
      this.hobbies.removeAt(index);
    }
  }

  // Handle form submission
  onSave(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        id: this.userIdCounter++,  // Auto-increment ID for simplicity
        ...this.userForm.value,
      };
      this.saveUser.emit(newUser);
      this.onReset(); // Reset form after emitting
    }
  }

  // Reset form and initialize hobbies with one control
  onReset(): void {
    this.userForm.reset();
    this.hobbies.clear(); // Clear all hobby controls
    this.hobbies.push(this.fb.control('', Validators.required)); // Add a default empty hobby control
  }
}
