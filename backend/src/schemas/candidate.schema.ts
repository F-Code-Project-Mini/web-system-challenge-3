import { v4 as uuidv4 } from 'uuid';

interface CandidateType {
  id?: string;
  studentCode: string;
  phone: string;
  major: string;
  semester: string;
  teamId?: string;
  mentorNote?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

class Candidate {
  id: string;
  studentCode: string;
  phone: string;
  major: string;
  semester: string;
  teamId?: string | null;
  mentorNote: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(candidate: CandidateType) {
    this.id = candidate.id || uuidv4();
    this.studentCode = candidate.studentCode;
    this.phone = candidate.phone;
    this.major = candidate.major;
    this.semester = candidate.semester;
    this.teamId = candidate.teamId || null;
    this.mentorNote = candidate.mentorNote || null;
    this.createdAt = candidate.createdAt || new Date();
    this.updatedAt = candidate.updatedAt || new Date();
  }
}

export default Candidate;
