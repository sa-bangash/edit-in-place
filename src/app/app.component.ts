import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

interface Account {
  name: string;
  role: string;
  isActive: boolean;
}

type Accounts = Array<Account>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public openBindingEvent = 'dblclick';

  // Sample input example
  public inputText = 'foo';
  public inputControl: FormControl = new FormControl(this.inputText);

  // Sample input example with focus
  public inputFocusText = 'foo';
  public inputFocusControl: FormControl = new FormControl(this.inputFocusText);

  // Sample input example with action buttons
  public inputButtonsText = 'foo';
  public inputButtonsControl: FormControl = new FormControl(this.inputButtonsText);

  // Sample select example
  public selectText = 'Canada';
  public selectControl: FormControl = new FormControl(this.selectText);
  public selectOptions = ['Belgium', 'Italy', 'Canada'];

  // Sample checkbox example
  public checkboxText = true;
  public checkboxControl: FormControl = new FormControl(this.checkboxText);

  // Sample range example
  public rangeText = 8;
  public rangeControl: FormControl = new FormControl(this.rangeText);

  // Sample radio example
  public radioText = 'blue';
  public radioControl: FormControl = new FormControl(this.radioText);
  public radioOptions = ['blue', 'green'];

  // Sample table example
  public formArray: FormArray;
  public accounts: Accounts = [
    { name: 'John', role: 'Product Owner', isActive: false },
    { name: 'Sarah', role: 'Developer', isActive: true },
  ];
  public roles: string[] = ['Developer', 'Product Owner', 'UX Designer'];

  // multiple form
  public mode: 'view' | 'edit' = 'view';
  public groupedForm: FormGroup;
  public identity = {
    name: 'John Doe',
    city: 'London',
    country: 'England',
  };

  ngOnInit(): void {
    this.formArray = new FormArray(this.toGroups());
    this.initGroupedForm();
  }

  getControl(index: number, field: string): FormControl {
    return this.formArray.at(index).get(field) as FormControl;
  }

  toGroups(): AbstractControl[] {
    return this.accounts.map((account) => {
      return new FormGroup({
        name: new FormControl(account.name),
        role: new FormControl(account.role),
        isActive: new FormControl(account.isActive),
      });
    });
  }

  initGroupedForm(): void {
    this.groupedForm = new FormGroup({
      name: new FormControl(this.identity.name),
      city: new FormControl(this.identity.city),
      country: new FormControl(this.identity.country),
    });
  }

  updateSingleField(prop: any, control: any): void {
    this[prop] = this[control].value;
  }

  updateField(index: number, field: string): void {
    const control = this.getControl(index, field);

    if (control.valid) {
      this.accounts[index][field] = control.value;
    }
  }

  cancelSingleField(prop: string, control: any): void {
    (this[control] as AbstractControl).setValue(this[prop]);
  }

  cancel(index: number, field: string): void {
    const control = this.getControl(index, field);
    control.setValue(this.accounts[index][field]);
  }

  updateGroupedEdition(): void {
    this.identity = this.groupedForm.value;
  }

  cancelGroupedEdition(): void {
    this.groupedForm.setValue(this.identity);
  }

  handleModeChange(mode: 'view' | 'edit'): void {
    this.mode = mode;
  }
}
