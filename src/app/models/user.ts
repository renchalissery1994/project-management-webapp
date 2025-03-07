import { ActivityAllocation } from './activity-allocation';

export class User {
    public id: number;
    public userName: string;
    public email: string;
    public role: string;
    public userSkills: any[] = [];
    public activityAllocations: ActivityAllocation[] = [];
}