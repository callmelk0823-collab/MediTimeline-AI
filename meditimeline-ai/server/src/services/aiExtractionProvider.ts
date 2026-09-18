export interface ExtractionInput {
  documentType: string;
  text: string;
  filePath: string;
  documentId: string;
  patientId: string;
  originalName: string;
}

export abstract class AIExtractionProvider {
  abstract extract(input: ExtractionInput): Promise<Record<string, unknown>>;
}

export class AIExtractionProviderImpl extends AIExtractionProvider {
  async extract(_input: ExtractionInput) {
    return {
      status: 'not_configured',
      message: 'External AI provider not configured; using demo mode.',
    };
  }
}
