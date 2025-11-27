export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: 'automotive' | 'lifestyle' | 'tech' | 'military';
}

export enum WeaveType {
  Plain = 'Plain Weave (1x1)',
  Twill = 'Twill Weave (2x2)',
  Forged = 'Forged Carbon',
  Honeycomb = 'Honeycomb Pattern'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface CustomizationRequest {
  name: string;
  email: string;
  partType: string;
  weave: WeaveType;
  details: string;
}

export type Language = 'zh' | 'en' | 'es';