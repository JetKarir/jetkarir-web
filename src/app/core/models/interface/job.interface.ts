export interface MasterItem {
  id: number;
  code: string;
  name: string;
}

export interface JobCompany {
  id: string;
  name: string;
  logoUrl?: string;
  verificationStatus?: string;
}

export interface JobListItem {
  id: string;
  title: string;
  companyName?: string;
  company?: JobCompany;
  postingType: 'COMPANY' | 'PERSONAL_HIRING';
  city?: string;
  province?: string;
  salaryMin?: number;
  salaryMax?: number;
  isSalaryVisible: boolean;
  employmentType?: string;
  workMode?: string;
  primaryCategory?: string;
  primaryField?: string;
  careerLevel?: string;
  matchScore?: number;
  publishedAt: string;
  applicationDeadline?: string;
  status: string;
  tags?: string[];
  responsibilities?: string;
}

export interface JobDetail extends JobListItem {
  description: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
  minimumExperienceYears?: number;
  minimumEducationLevel?: string;
  salaryPeriod?: string;
  vacancyCount: number;
  skills?: { skillId: number; skillName: string; requirementLevel: string }[];
  postedByUser?: { displayName: string; headline?: string };
}

export interface JobSearchParams {
  q?: string;
  categoryId?: number;
  fieldIds?: number[];
  skillIds?: number[];
  careerLevelIds?: number[];
  employmentTypeIds?: number[];
  workModeIds?: number[];
  city?: string;
  province?: string;
  salaryMin?: number;
  salaryMax?: number;
  sort?: 'relevance' | 'newest' | 'salary' | 'match_score';
  page?: number;
  limit?: number;
}

export interface SavedJob {
  jobId: string;
  savedAt: string;
  job: JobListItem;
}
