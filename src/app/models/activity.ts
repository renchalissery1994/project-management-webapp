import { Skill } from './skill';

export class Activity {
    activityId: number;
    activityName: string;
    daysRequired: number;
    dependencyActivityId: number;
    endWeek: number;
    startWeek: number;
    requiredSkills: { skillLevel: number, skill: Skill }[];
}