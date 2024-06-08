export interface TrainingRoomProps {
  handleNumberOfDoneTasks: () => void;
}

export interface Answer {
  _id: string;
  en: string;
  ua: string;
  task: "en" | "ua";
}

export interface Task {
  _id: string;
  en?: string;
  ua?: string;
  task: "en" | "ua";
}

export interface Input {
  translation: string;
}
