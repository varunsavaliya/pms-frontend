import { IPlan } from "../plans/plan.interface";

export interface IClient {
    id: number
    plan: IPlan
    name: string;
    startDate: Date
}