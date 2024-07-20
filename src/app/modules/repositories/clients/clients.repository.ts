import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { BaseService } from '../../../shared/base.service';
import { environment } from '../../../../environments/environment.dev';
import { EndPointUrl } from '../../../core/constants/endpoints.constants';
import { IPlan } from '../../models/interfaces/plans/plan.interface';
import { IClient } from '../../models/interfaces/clients/clients.interface';
import { IAPIResponse } from '../../../core/constants/response.constants';

@Injectable({ providedIn: 'root' })
export class ClientsRepository {
    #url: string;

    constructor(private baseService: BaseService) {
        this.#url = `${environment.baseUrl}/${EndPointUrl.CLIENTS.PATH}`;
    }

    getAllSubmission(): Observable<IAPIResponse<IClient[]>> {
        return this.baseService.get(this.#url);
    }

    createSubmission(model: any): Observable<any> {
        return this.baseService.post(this.#url, {});
    }
}
