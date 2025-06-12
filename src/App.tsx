import React, { useState } from "react";
import SequenceInputForm from "./components/SequenceInputForm";
import AlignmentDisplay from "./components/AlignmentDisplay";
import { Container, Typography } from "@mui/material";

function App() {
  const [seq1, setSeq1] = useState("");
  const [seq2, setSeq2] = useState("");

  const handleSubmit = (s1: string, s2: string) => {
    setSeq1(s1);
    setSeq2(s2);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Анализ аминокислот</Typography>
      <SequenceInputForm onSubmit={handleSubmit} />
      {seq1 && seq2 && <AlignmentDisplay seq1={seq1} seq2={seq2} />}
    </Container>
  );
}

export default App;
