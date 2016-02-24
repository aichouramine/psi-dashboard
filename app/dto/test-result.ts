import {PSIResponse} from './psi-response';

export interface TestResult {
    url: string;
    dateCreated: Date;
    result: PSIResponse;
}