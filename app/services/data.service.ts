import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {AuthUser} from '../interfaces/interfaces';
import {PSIResponse} from '../dto/psi-response';

declare let Firebase;

@Injectable()
export class DataService {
    psiHistory$: Observable<Array<any>>;
    private _psiHistoryObserver: any;
    private _firebaseRef: any;
    private _authUser: AuthUser;
    private _PSI_URL: string;
    private _API_KEY: string;
    
    constructor(private _authService: AuthService, private _http: Http) {
        this._PSI_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed';
        this._API_KEY = 'AIzaSyCEuHSeoUR2wQ86Qr8lSEAs6ykitWIts3s';
        
        this.psiHistory$ = new Observable(observer => this._psiHistoryObserver = observer).share();
        this.psiHistory$.subscribe();
        
        this._firebaseRef = new Firebase('https://psi-api.firebaseio.com/');
        this._authService.authUser$.subscribe(authUser => {
            this._authUser = authUser;
            this.loadPsiHistory();
        });

        this._authService.loadAuthUser();
    }

    loadPsiHistory() {
        if (this._authService.isLoggedIn()) {
            this._firebaseRef.child(`users/${this._authUser.uid}/tests`).on('value', snapshot => {
                this._psiHistoryObserver.next(this._firebaseArrayToArray(snapshot.val()));
            }, errorObject => {
                console.log('The read failed: ' + errorObject.code);
            });
        } else {
            this._psiHistoryObserver.next([]);
        }
    }
    
    runTest(url: string) {
        let strategy = 'mobile';
        let urlPath = `${this._PSI_URL}?url=${url}&strategy=${strategy}`;

        if (!(window.location.href.indexOf('localhost') > -1)) {
            urlPath += `&key=${this._API_KEY}`;
        }

        this._http.get(urlPath)
            .map(res => res.json())
            .subscribe(res => {
                let test = {
                    url: url,
                    dateCreated: Firebase.ServerValue.TIMESTAMP,
                    data: res
                };
                
                if (this._authService.isLoggedIn()) {
                    this._firebaseRef.child(`users/${this._authUser.uid}/tests`).push(test);
                }
            });
    }

    private _firebaseArrayToArray(fbArray) {
        let convertedArray = [];

        for (let property in fbArray) {
            if (fbArray.hasOwnProperty(property)) {
                convertedArray.push(fbArray[property]);
            }
        }

        return convertedArray;
    }
}