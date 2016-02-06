import {Component} from 'angular2/core';
import {NotificationService} from './services/notification.service';
import {NotificationPermission} from './interfaces/interfaces';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import {DataService} from './services/data.service';

declare let Firebase;

@Component({
    selector: 'psi-home',
    templateUrl: 'app/home.html',
    directives: []
})
export class Home {
    urlTestForm: any;
    constructor(
        private _notificationService: NotificationService, 
        private _formBuilder: FormBuilder,
        private _dataService: DataService) { }
    
    ngOnInit() {
        this.urlTestForm = this._formBuilder.group({
            'url': ['', Validators.required]
        });
    }
    
    runTest() {
        if (this.urlTestForm.dirty && this.urlTestForm.valid) {
            this._dataService.runTest(this.urlTestForm.value.url);
        }
    }
}
