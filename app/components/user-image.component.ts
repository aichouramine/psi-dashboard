import {Component} from 'angular2/core';

@Component({
    selector: 'user-image',
    templateUrl: 'app/components/user-image.component.html',
	inputs: ['authUser']
})
export class UserImageComponent {
    authUser: any;
}
