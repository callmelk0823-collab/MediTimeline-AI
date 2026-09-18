export interface OCRService {
  extractText(filePath: string): Promise<{ text: string; confidence: number; success: boolean }>; 
}

export class MockOCRService implements OCRService {
  async extractText(filePath: string) {
    const fileName = filePath.split(/[\\/]/).pop() || 'document';
    const sampleText = `SYNTHETIC DEMO DATA\nDocument: ${fileName}\nLaboratory Report\nDate: 10 January 2026\nHemoglobin result: 12.4 g/dL\nPrescription\nMedication: Levothyroxine 50 mcg once daily`; 

    return {
      text: sampleText,
      confidence: 0.96,
      success: true,
    };
  }
}

export class OCRServiceImpl implements OCRService {
  async extractText(_filePath: string) {
    return {
      text: 'Text could not be reliably extracted. Needs Review.',
      confidence: 0.2,
      success: false,
    };
  }
}

export const mockOCRService = new MockOCRService();
export const ocrService = new OCRServiceImpl();
