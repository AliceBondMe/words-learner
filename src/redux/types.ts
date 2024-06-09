export interface ErrorResponse {
  message: string;
}

export interface AuthState {
  email: string | null;
  name: string | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  authError: ErrorResponse | null | undefined;
}

export interface UserData {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  _id?: string;
  email: string;
  name: string;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface WordsRequestParams {
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
  page?: number;
}

export interface OwnWordsResponse {
  results: {
    _id: string;
    en: string;
    ua: string;
    category: string;
    isIrregular: boolean;
    owner: string;
    progress: number;
  }[];
  totalPages: number;
}

export interface AllWordsResponse {
  results: {
    _id: string;
    en: string;
    ua: string;
    category: string;
    isIrregular: boolean;
  }[];
  totalPages: number;
}

export interface NewWordData {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
}

export interface AddNewWordResponse {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner: string;
  progress: number;
}

export interface EditedWordData {
  wordId: string;
  editedWord: {
    en: string;
    ua: string;
    category: string;
    isIrregular: boolean;
  };
}

export interface TasksResponse {
  tasks: {
    _id: string;
    ua?: string;
    en?: string;
    task: "ua" | "en";
  }[];
}

export interface AnswerData {
  _id: string;
  en: string;
  ua: string;
  task: "en" | "ua";
}

export interface AnswerResponse {
  _id: string;
  ua: string;
  task: "en" | "ua";
  en: string;
  isDone: boolean;
}

export interface StatisticsResponse {
  totalCount: number;
}

export interface WordsState {
  tasks: {
    _id: string;
    ua?: string;
    en?: string;
    task: "ua" | "en";
  }[];
  wordsToStudy: number;
  checkedAnswers: AnswerResponse[];
  wordToEdit: AddNewWordResponse | null;
  categories: string[];
  dictionary: OwnWordsResponse;
  recommended: AllWordsResponse;
  wordsError: ErrorResponse | null | undefined;
}
