import { v4 as uuidv4 } from 'uuid';

interface ReportType {
  id?: string;
  mentorId: string;
  teamId: string;
  reportContent: string;
  reportedAt: Date;
}

class Report {
  id: string;
  mentorId: string;
  teamId: string;
  reportContent: string;
  reportedAt: Date;

  constructor(report: ReportType) {
    this.id = report.id || uuidv4();
    this.mentorId = report.mentorId;
    this.teamId = report.teamId;
    this.reportContent = report.reportContent;
    this.reportedAt = report.reportedAt;
  }
}

export default Report;
