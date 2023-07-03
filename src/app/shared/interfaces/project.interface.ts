import { CustomerInterface } from "./customer.interface";

export interface ProjectInterface {
    isHouseOwner: boolean;
    numberOfPeopleHousehold: number;
    householdIncome: number;
    area: number;
    cost: number;
    effyAidAmount: number
    customer: CustomerInterface
}