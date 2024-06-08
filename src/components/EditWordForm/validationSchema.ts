import * as yup from "yup";

export const validationSchemaEditWord = yup.object().shape({
  en: yup
    .string()
    .matches(
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      "The word must contain only English letters"
    )
    .required("A word is required"),
  ua: yup
    .string()
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      "The translation must contain only Ukrainian letters"
    )
    .required("A translation is required"),
});
