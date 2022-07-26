import { HttpRequest } from '@angular/common/http';

export class OfflineError extends Error {
    req: HttpRequest<any>;

    constructor(name: string, req: HttpRequest<any>) {
        super(name);
        this.req = req;
    }
}
