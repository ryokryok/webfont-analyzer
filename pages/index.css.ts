import { style } from "@vanilla-extract/css";

export const siteTitle = style({
  fontSize: "2rem",
});

export const contentContainer = style({
  padding: "1rem",
  maxWidth: "50rem",
  display: "flex",
  flexDirection: "column",
  rowGap: "1rem",

  margin: "0 auto",
});

export const formWrapper = style({
  display: "flex",
  flexDirection: "column",
  rowGap: "0.5rem",
});

export const formLabel = style({
  fontSize: "1.25rem",
  fontWeight: "bold",
  paddingBottom: "0.5rem",
});

export const formTextInput = style({
  border: "1px solid #AAA",
  borderRadius: "0.25rem",
  fontSize: "1rem",
  padding: "0.5rem",
  width: "100%",
});

export const formGroup = style({
  paddingBottom: "0.5rem",
  display: "flex",
  flexDirection: "column",
});

export const formButton = style({
  border: "2px solid black",
  borderRadius: "0.25rem",
  backgroundColor: "#EEE",
  padding: "0.25rem",
  width: "100%",
  fontSize: "1.25rem",
});

export const resultTextArea = style({
  border: "1px solid #AAA",
  borderRadius: "0.25rem",
  fontSize: "1rem",
  padding: "0.5rem",
  width: "100%",
  fontFamily: "monospace",
});

export const preview = style({
  fontSize: "1rem",
});

export const previewTitle = style({
  fontSize: "1.75rem",
});

export const previewSubTitle = style({
  fontSize: "1.5rem",
});

export const previewBody = style({
  paddingTop: "0.5rem",
  fontSize: "1rem",
});
