import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";

type FormData = {
  sequence1: string;
  sequence2: string;
};

type Props = {
  onSubmit: (seq1: string, seq2: string) => void;
};

export default function SequenceInputForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const validateSequence = (seq: string) => /^[ARNDCEQGHILKMFPSTWYV-]+$/.test(seq);

  const onFormSubmit = (data: FormData) => {
    if (data.sequence1.length !== data.sequence2.length) {
      alert("Последовательности должны быть одинаковой длины");
      return;
    }
    onSubmit(data.sequence1.toUpperCase(), data.sequence2.toUpperCase());
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Последовательность 1"
        {...register("sequence1", {
          required: "Обязательное поле",
          validate: validateSequence || "Недопустимые символы"
        })}
        error={!!errors.sequence1}
        helperText={errors.sequence1?.message}
      />
      <TextField
        label="Последовательность 2"
        {...register("sequence2", {
          required: "Обязательное поле",
          validate: validateSequence || "Недопустимые символы"
        })}
        error={!!errors.sequence2}
        helperText={errors.sequence2?.message}
      />
      <Button type="submit" variant="contained">Визуализировать</Button>
    </Box>
  );
}
