import React, { useState } from "react";
import { aminoAcidColors } from "../utils/aminoColors";
import { Snackbar } from "@mui/material";

type Props = {
  seq1: string;
  seq2: string;
};

export default function AlignmentDisplay({ seq1, seq2 }: Props) {
  const [snackOpen, setSnackOpen] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackOpen(true);
    });
  };

  const chunkSize = 30; // или меньше, если хочешь более частый перенос

  const chunkSequence = (seq: string, size: number): string[] => {
    const chunks = [];
    for (let i = 0; i < seq.length; i += size) {
      chunks.push(seq.slice(i, i + size));
    }
    return chunks;
  };

  const chunks1 = chunkSequence(seq1, chunkSize);
  const chunks2 = chunkSequence(seq2, chunkSize);

  return (
    <div style={{ maxWidth: "100%" }}>
      {chunks1.map((chunk, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <div
            onClick={() => handleCopy(chunk)}
            style={{
              fontFamily: "monospace",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {chunk.split("").map((char, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: aminoAcidColors[char] || "#fff",
                  padding: "2px 4px",
                  color: "#000"
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div
            onClick={() => handleCopy(chunks2[index])}
            style={{
              fontFamily: "monospace",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {chunks2[index].split("").map((char, i) => {
              const isDiff = char !== chunk[i];
              return (
                <span
                  key={i}
                  style={{
                    backgroundColor: isDiff ? aminoAcidColors[char] || "#ccc" : "transparent",
                    padding: "2px 4px",
                    color: "#000"
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <Snackbar
        open={snackOpen}
        message="Скопировано!"
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
      />
    </div>
  );
}