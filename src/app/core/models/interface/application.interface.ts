export type ApplicationStatus =
  | 'APPLIED'
  | 'PROCESSING'
  | 'SCREENING'
  | 'ASSESSMENT'
  | 'INTERVIEW'
  | 'OFFERED'
  | 'HIRED'
  | 'REJECTED'
  | 'WITHDRAWN';

export interface ApplicationStage {
  id: string;
  name: string;
  status: 'PENDING' | 'STARTED' | 'COMPLETED' | 'SKIPPED';
  dueAt?: string;
  completedAt?: string;
  decision?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  workMode?: string;
  city?: string;
  status: ApplicationStatus;
  currentStage?: ApplicationStage;
  stages?: ApplicationStage[];
  matchScore?: number;
  appliedAt: string;
  updatedAt?: string;
}

export interface ApplyRequest {
  resumeId?: string;
  sourceCode: 'MANUAL' | 'SWIPE' | 'AUTO_APPLY';
  coverLetter?: string;
  consentAiProcessing: boolean;
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  channel: string;
  referenceType?: string;
  referenceId?: string;
  isRead: boolean;
  sentAt: string;
  createdAt: string;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  headline?: string;
  summary?: string;
  city?: string;
  province?: string;
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  preferredWorkMode?: { id: number; code: string; name: string };
  yearsExperience?: number;
  profileVisibility: string;
  profileCompletion?: number;
  updatedAt: string;
  skills?: { skillId: number; skillName: string; proficiencyLevel: string }[];
  experiences?: {
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
  }[];
  educations?: {
    id: string;
    institution: string;
    degree?: string;
    fieldOfStudy?: string;
    startYear?: number;
    endYear?: number;
  }[];
}
