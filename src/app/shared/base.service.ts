import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseService {
    constructor(private http: HttpClient) { }

    get<T>(url: string, params?: any): Observable<T> {
        return this.http.get<T>(url, {
            params: new HttpParams({ fromObject: params }),
        });
    }

    delete<T>(url: string, model?: any, params?: any): Observable<T> {
        return this.http.delete<T>(url, {
            body: model,
            params: new HttpParams({ fromObject: params }),
        });
    }

    put<T>(url: string, model: any, params?: any): Observable<T> {
        return this.http.put<T>(url, model, {
            params: new HttpParams({ fromObject: params }),
        });
    }

    post<T>(url: string, model: any, params?: any): Observable<T> {
        return this.http.post<T>(url, model, {
            params: new HttpParams({ fromObject: params }),
        });
    }
}
