export interface ExtractionResult {
  eventType: string;
  eventDate: string | null;
  title: string;
  description: string;
  extractedData: Record<string, unknown>;
  reviewStatus: 'VERIFIED' | 'NEEDS_REVIEW' | 'NOT_AVAILABLE';
}

export abstract class ExtractionService {
  abstract extract(input: Record<string, unknown>): Promise<ExtractionResult>;
}
