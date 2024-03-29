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
var common_1 = require('angular2/common');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var data_service_1 = require('./services/data.service');
var auth_service_1 = require('./services/auth.service');
var notification_service_1 = require('./services/notification.service');
var about_1 = require('./about');
var home_1 = require('./home');
var stats_1 = require('./stats');
var user_image_component_1 = require('./components/user-image.component');
// Temp import all operators see issues, https://github.com/ReactiveX/RxJS/issues/1010, https://github.com/escardin/angular2-community-faq/blob/master/rxjs_operators.md
require('rxjs/Rx');
//import 'rxjs/add/operator/share'; 
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/retry';
var App = (function () {
    function App(_authService) {
        this._authService = _authService;
    }
    App.prototype.ngOnInit = function () {
        var _this = this;
        this._authService.authUser$.subscribe(function (user) { return _this.authUser = user; });
        this._authService.loadAuthUser();
        this.navOpen = false;
    };
    App.prototype.logout = function () {
        this._authService.logout();
    };
    App = __decorate([
        core_1.Component({
            selector: 'psi-app',
            templateUrl: 'app/app.html',
            directives: [router_1.RouterOutlet, router_1.RouterLink, user_image_component_1.UserImageComponent]
        }),
        router_1.RouteConfig([
            { path: '/', component: home_1.Home, as: 'Home' },
            { path: '/about', component: about_1.About, as: 'About' },
            { path: '/stats', component: stats_1.Stats, as: 'Stats' }
        ]), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], App);
    return App;
}());
browser_1.bootstrap(App, [
    router_1.ROUTER_BINDINGS,
    common_1.FORM_BINDINGS,
    http_1.HTTP_BINDINGS,
    core_1.bind(router_1.ROUTER_PRIMARY_COMPONENT).toValue(App),
    core_1.bind(router_1.LocationStrategy).toClass(router_1.HashLocationStrategy),
    [
        data_service_1.DataService,
        auth_service_1.AuthService,
        notification_service_1.NotificationService
    ]
]);
