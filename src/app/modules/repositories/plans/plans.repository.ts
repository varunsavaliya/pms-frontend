import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { BaseService } from '../../../shared/base.service';
import { environment } from '../../../../environments/environment.dev';
import { EndPointUrl } from '../../../core/constants/endpoints.constants';
import { IPlan } from '../../models/interfaces/plans/plan.interface';
import { IAPIResponse } from '../../../core/constants/response.constants';

@Injectable({ providedIn: 'root' })
export class PlansRepository {
    #url: string;

    constructor(private baseService: BaseService) {
        this.#url = `${environment.baseUrl}/${EndPointUrl.PLANS.PATH}`;
    }

    getAllPlans(): Observable<IAPIResponse<IPlan[]>> {
        return this.baseService.get(this.#url);
    }

    createPlan(model: any): Observable<any> {
        return this.baseService.post(this.#url, {});
    }
}
