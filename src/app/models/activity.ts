import { Skill } from './skill';

export class Activity {
    activityId: number;
    activityName: string;
    dependencyActivityId: number;
    endWeek: number;
    startWeek: number;
    requiredSkills: Skill[];
}