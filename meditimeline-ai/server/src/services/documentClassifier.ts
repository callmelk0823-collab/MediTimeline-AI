export const documentClassifier = {
  classify(fileName: string, text: string) {
    const normalized = `${fileName} ${text}`.toLowerCase();

    if (normalized.includes('laboratory') || normalized.includes('hemoglobin') || normalized.includes('glucose')) {
      return { documentType: 'Laboratory Report', confidence: 0.97 };
    }
    if (normalized.includes('prescription') || normalized.includes('medication') || normalized.includes('dosage')) {
      return { documentType: 'Prescription', confidence: 0.96 };
    }
    if (normalized.includes('imaging') || normalized.includes('x-ray') || normalized.includes('mri')) {
      return { documentType: 'Imaging Report', confidence: 0.94 };
    }
    if (normalized.includes('discharge')) {
      return { documentType: 'Discharge Summary', confidence: 0.95 };
    }
    if (normalized.includes('follow-up') || normalized.includes('follow up') || normalized.includes('clinical note')) {
      return { documentType: 'Clinical Note', confidence: 0.93 };
    }
    return { documentType: 'Other', confidence: 0.68 };
  },
};
