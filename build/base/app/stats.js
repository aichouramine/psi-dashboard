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
var data_service_1 = require('./services/data.service');
var interfaces_1 = require('./interfaces/interfaces');
var auth_service_1 = require('./services/auth.service');
var Stats = (function () {
    function Stats(_authService, _dataService) {
        this._authService = _authService;
        this._dataService = _dataService;
    }
    Stats.prototype.ngOnInit = function () {
        var _this = this;
        this._dataService.psiHistory$.subscribe(function (testHistory) { return _this.testHistory = testHistory; });
        this._dataService.loadPsiHistory();
        this._authService.authUser$.subscribe(function (authUser) { return _this.authUser = authUser; });
        this._authService.loadAuthUser();
    };
    Stats.prototype.loginTwitter = function () {
        this._authService.login(interfaces_1.AuthType.TWITTER);
    };
    Stats.prototype.loginGithub = function () {
        this._authService.login(interfaces_1.AuthType.GITHUB);
    };
    Stats = __decorate([
        core_1.Component({
            selector: 'psi-stats',
            templateUrl: 'app/stats.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, data_service_1.DataService])
    ], Stats);
    return Stats;
}());
exports.Stats = Stats;
