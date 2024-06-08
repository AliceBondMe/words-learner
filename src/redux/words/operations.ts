import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  AddNewWordResponse,
  AllWordsResponse,
  EditedWordData,
  ErrorResponse,
  NewWordData,
  OwnWordsResponse,
  WordsRequestParams,
} from "../types";

export const getCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: ErrorResponse }
>("words/getCategories", async (_, thunkAPI) => {
  try {
    const response = await axios.get<string[]>("/words/categories");
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const getRecommendedWords = createAsyncThunk<
  AllWordsResponse,
  WordsRequestParams,
  { rejectValue: ErrorResponse }
>(
  "words/getRecommended",
  async (wordsRequestData: WordsRequestParams, thunkAPI) => {
    try {
      const response = await axios.get<AllWordsResponse>("/words/all", {
        params: wordsRequestData,
      });
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOwnWords = createAsyncThunk<
  OwnWordsResponse,
  WordsRequestParams,
  { rejectValue: ErrorResponse }
>(
  "words/getOwnWords",
  async (wordsRequestData: WordsRequestParams, thunkAPI) => {
    try {
      const response = await axios.get<OwnWordsResponse>("/words/own", {
        params: wordsRequestData,
      });
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

export const addNewWord = createAsyncThunk<
  AddNewWordResponse,
  NewWordData,
  { rejectValue: ErrorResponse }
>("words/addNewWord", async (newWord: NewWordData, thunkAPI) => {
  try {
    const response = await axios.post<AddNewWordResponse>(
      "/words/create",
      newWord
    );
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const addOthersWord = createAsyncThunk<
  AddNewWordResponse,
  string,
  { rejectValue: ErrorResponse }
>("words/addOthersWord", async (wordId: string, thunkAPI) => {
  try {
    const response = await axios.post<AddNewWordResponse>(
      `/words/add/${wordId}`
    );
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const editWord = createAsyncThunk<
  AddNewWordResponse,
  EditedWordData,
  { rejectValue: ErrorResponse }
>("words/editWord", async (wordData: EditedWordData, thunkAPI) => {
  try {
    const { wordId, editedWord } = wordData;
    const response = await axios.patch<AddNewWordResponse>(
      `/words/edit/${wordId}`,
      editedWord
    );
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const deleteWord = createAsyncThunk<
  string,
  string,
  { rejectValue: ErrorResponse }
>("words/deleteWord", async (wordId: string, thunkAPI) => {
  try {
    await axios.delete<AddNewWordResponse>(`/words/delete/${wordId}`);
    return wordId;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
