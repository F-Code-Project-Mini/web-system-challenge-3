import { v4 as uuidv4 } from "uuid";

interface SubmissionType {
    id?: string;
    teamId: string;
    userId: string;
    presentationLink: string;
    productLink: string;
    note?: string;
    submittedAt?: Date;
}

class Submission {
    id: string;
    teamId: string;
    userId: string;
    presentationLink: string;
    productLink: string;
    note: string;
    submittedAt: Date;

    constructor(submission: SubmissionType) {
        this.id = submission.id || uuidv4();
        this.teamId = submission.teamId;
        this.userId = submission.userId;
        this.presentationLink = submission.presentationLink;
        this.productLink = submission.productLink;
        this.note = submission.note || "";
        this.submittedAt = submission.submittedAt || new Date();
    }
}

export default Submission;
