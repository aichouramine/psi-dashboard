import {Component} from 'angular2/core';
import {DataService} from './services/data.service';
import {AuthUser, AuthType, NotificationPermission} from './interfaces/interfaces';
import {AuthService} from './services/auth.service';

declare let Firebase;

@Component({
    selector: 'psi-stats',
    templateUrl: 'app/stats.html',
    directives: []
})
export class Stats {
    authUser: AuthUser;
    testHistory: any;
    
    constructor(
        private _authService: AuthService,
        private _dataService: DataService) { }
    
    ngOnInit() {
        this._dataService.psiHistory$.subscribe(testHistory => this.testHistory = testHistory);
        this._dataService.loadPsiHistory();

        this._authService.authUser$.subscribe(authUser => this.authUser = authUser);
        this._authService.loadAuthUser();
    }

    loginTwitter() {
        this._authService.login(AuthType.TWITTER);
    }

    loginGithub() {
        this._authService.login(AuthType.GITHUB);
    }
}
