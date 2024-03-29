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
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
var auth_service_1 = require('./auth.service');
var DataService = (function () {
    function DataService(_authService, _http) {
        var _this = this;
        this._authService = _authService;
        this._http = _http;
        this._PSI_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed';
        this._API_KEY = 'AIzaSyCEuHSeoUR2wQ86Qr8lSEAs6ykitWIts3s';
        this.psiHistory$ = new Observable_1.Observable(function (observer) { return _this._psiHistoryObserver = observer; }).share();
        this.psiHistory$.subscribe();
        this._firebaseRef = new Firebase('https://psi-api.firebaseio.com/');
        this._authService.authUser$.subscribe(function (authUser) {
            _this._authUser = authUser;
            _this.loadPsiHistory();
        });
        this._authService.loadAuthUser();
    }
    DataService.prototype.loadPsiHistory = function () {
        var _this = this;
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child("users/" + this._authUser.uid + "/tests").on('value', function (snapshot) {
                _this._psiHistoryObserver.next(_this._firebaseArrayToArray(snapshot.val()));
            }, function (errorObject) {
                console.log('The read failed: ' + errorObject.code);
            });
        }
        else {
            this._psiHistoryObserver.next([]);
        }
    };
    DataService.prototype.runTest = function (url) {
        var _this = this;
        var strategy = 'mobile';
        var urlPath = this._PSI_URL + "?url=" + url + "&strategy=" + strategy;
        if (!(window.location.href.indexOf('localhost') > -1)) {
            urlPath += "&key=" + this._API_KEY;
        }
        this._http.get(urlPath)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var test = {
                url: url,
                dateCreated: Firebase.ServerValue.TIMESTAMP,
                data: res
            };
            if (_this._authService.isLoggedIn()) {
                _this._firebaseRef.child("users/" + _this._authUser.uid + "/tests").push(test);
            }
        });
    };
    DataService.prototype._firebaseArrayToArray = function (fbArray) {
        var convertedArray = [];
        for (var property in fbArray) {
            if (fbArray.hasOwnProperty(property)) {
                convertedArray.push(fbArray[property]);
            }
        }
        return convertedArray;
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
