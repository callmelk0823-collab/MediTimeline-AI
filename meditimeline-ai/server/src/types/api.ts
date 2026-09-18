export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type EventType =
  | 'LABORATORY_TEST'
  | 'PRESCRIPTION'
  | 'IMAGING'
  | 'PROCEDURE'
  | 'DIAGNOSIS_MENTIONED'
  | 'FOLLOW_UP'
  | 'DISCHARGE'
  | 'CLINICAL_NOTE'
  | 'OTHER';

export type ReviewStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'NOT_AVAILABLE';
