export interface AddWordFormProps {
  closeModal: () => void;
}

export interface WordData {
  en: string;
  ua: string;
  isIrregular?: string | null;
}
