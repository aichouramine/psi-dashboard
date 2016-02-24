"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var notification_service_1 = require('./services/notification.service');
var common_1 = require('angular2/common');
var data_service_1 = require('./services/data.service');
var Home = (function () {
    function Home(_notificationService, _formBuilder, _dataService) {
        this._notificationService = _notificationService;
        this._formBuilder = _formBuilder;
        this._dataService = _dataService;
    }
    Home.prototype.ngOnInit = function () {
        var _this = this;
        this._dataService.psiHistory$.subscribe(function (testHistory) { return _this.testHistory = testHistory; });
        this._dataService.loadPsiHistory();
        this.urlTestForm = this._formBuilder.group({
            'url': ['', common_1.Validators.required]
        });
    };
    Home.prototype.runTest = function () {
        if (this.urlTestForm.dirty && this.urlTestForm.valid) {
            this._dataService.runTest(this.urlTestForm.value.url);
        }
    };
    Home = __decorate([
        core_1.Component({
            selector: 'psi-home',
            templateUrl: 'app/home.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService, common_1.FormBuilder, data_service_1.DataService])
    ], Home);
    return Home;
}());
exports.Home = Home;
