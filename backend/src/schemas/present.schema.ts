import { v4 as uuidv4 } from "uuid";

interface PresentType {
    id?: string;
    teamId: string;
    tentativeSchedule: string;
    finalSchedule: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Present {
    id: string;
    teamId: string;
    tentativeSchedule: string;
    finalSchedule: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(present: PresentType) {
        this.id = present.id || uuidv4();
        this.teamId = present.teamId;
        this.tentativeSchedule = present.tentativeSchedule;
        this.finalSchedule = present.finalSchedule;
        this.createdAt = present.createdAt || new Date();
        this.updatedAt = present.updatedAt || new Date();
    }
}

export default Present;
