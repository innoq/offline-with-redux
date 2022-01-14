import { HttpRequest } from '@angular/common/http';

export class OfflineError extends Error {
    req!: HttpRequest<any>;
}
