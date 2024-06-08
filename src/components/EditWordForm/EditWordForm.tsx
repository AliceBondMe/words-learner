import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { MdError } from "react-icons/md";

import { AppDispatch } from "../../redux/store";
import { Icon } from "../common";
import { validationSchemaEditWord } from "./validationSchema";
import { EditWordFormProps, WordData } from "./types";

import styles from "../AddWordForm/AddWordForm.module.css";
import { useSelector } from "react-redux";
import { selectWordsToEdit } from "../../redux/words/selectors";
import { editWord } from "../../redux/words/operations";

const EditWordForm: FC<EditWordFormProps> = ({ closeModal }) => {
  const wordToEdit = useSelector(selectWordsToEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WordData>({
    resolver: yupResolver(validationSchemaEditWord),
  });
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<WordData> = async ({ en, ua }: WordData) => {
    const editedData = {
      wordId: wordToEdit!._id,
      editedWord: {
        en,
        ua,
        category: wordToEdit!.category,
        isIrregular: wordToEdit!.isIrregular,
      },
    };

    dispatch(editWord(editedData)).then((action) => {
      if (action.type === "words/editWord/fulfilled") {
        closeModal();
      } else {
        alert("Some error occured");
      }
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.languageLabel}>
          <Icon name="icon-ukraine" width={28} height={28} />
          <span>Ukrainian</span>
        </p>

        <div className={styles.inputWrap}>
          <input
            {...register("ua")}
            defaultValue={wordToEdit!.ua}
            className={styles.input}
          />
          <p className={styles.errorMessage}>
            {errors.ua && <MdError size={16} />} {errors.ua?.message}
          </p>
        </div>

        <p className={styles.languageLabel}>
          <Icon name="icon-uk" width={28} height={28} />
          <span>English</span>
        </p>

        <div className={styles.inputWrap}>
          <input
            {...register("en")}
            defaultValue={wordToEdit!.en}
            className={styles.input}
          />
          <p className={styles.errorMessage}>
            {errors.en && <MdError size={16} />} {errors.en?.message}
          </p>
        </div>

        <div className={styles.buttonsWrap}>
          <button type="submit" className={styles.buttonAdd}>
            Save
          </button>
          <button
            type="button"
            className={styles.buttonCancel}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWordForm;
