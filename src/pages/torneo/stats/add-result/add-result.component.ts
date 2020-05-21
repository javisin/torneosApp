import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit {
  @Input() equipo1: string;
  @Input() equipo2: string;
  public resultForm: FormGroup;

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resultForm = this.formBuilder.group({
      result1: '',
      result2: ''
    });
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }
  onSubmit(form) {
    console.log(form);
  }

}
