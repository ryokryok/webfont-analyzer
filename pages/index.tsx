import React, { useRef, useState } from "react";
import { useContentStyle } from "../lib/hooks";
import {
  preview,
  siteTitle,
  formWrapper,
  previewTitle,
  previewSubTitle,
  previewBody,
  contentContainer,
  formTextInput,
  formLabel,
  formButton,
  formGroup,
  resultTextArea,
} from "./index.css";

type ResultAreaProps = {
  contentUrl: string;
};

const ResultArea: React.FC<ResultAreaProps> = ({ contentUrl }) => {
  const { styles, isLoading, isError } = useContentStyle(contentUrl);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load</div>;

  return (
    <>
      <form className={formWrapper}>
        <div className={formGroup}>
          <label className={formLabel} htmlFor="contentFontFamily">
            Font Family
          </label>
          <textarea
            className={resultTextArea}
            id="contentFontFamily"
            value={`body {
  font-family: ${styles.fontFamily};
}`}
            name="resultArea"
            rows={4}
            readOnly
          />
        </div>
        <div className={formGroup}>
          <label className={formLabel} htmlFor="contentStyleLink">
            Stylesheet Links
          </label>
          <textarea
            className={resultTextArea}
            id="contentStyleLink"
            value={styles.styleSheets
              .map(
                (sheet) => sheet && `<link rel="stylesheet" href="${sheet}"> `
              )
              .join("\n")}
            rows={5}
            readOnly
          />
        </div>
      </form>
      <hr />
      <article className={preview} style={{ fontFamily: styles.fontFamily }}>
        <h2 className={previewTitle}>preview</h2>
        <h3 className={previewSubTitle}>
          Note: Preview does not work accurately if your site uses web fonts
        </h3>
        <div className={previewBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut
          purus ac nibh interdum tristique. Integer quis gravida risus. Mauris
          nec erat non ipsum blandit dictum. Etiam nec neque at neque malesuada
          vehicula. Proin et malesuada sapien. Aenean aliquam, dolor quis
          sagittis maximus, mi sem tristique felis, et tempor augue velit eget
          augue. Vivamus vestibulum, eros sit amet dignissim dapibus, purus est
          gravida ex, id auctor orci ante pharetra magna. Ut varius tincidunt
          efficitur. Vivamus maximus purus et risus tincidunt, in lacinia dui
          ullamcorper. Maecenas ut fermentum ligula.
        </div>
      </article>
    </>
  );
};

const Home = () => {
  const [contentUrl, setContentUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current.value) setContentUrl(inputRef.current.value);
  };
  return (
    <main className={contentContainer}>
      <h1 className={siteTitle}>Font Family Checker</h1>
      <form className={formWrapper} onSubmit={submitHandler}>
        <div className={formGroup}>
          <label className={formLabel} htmlFor="url">
            Enter the URL of the site you want to check
          </label>
          <input
            className={formTextInput}
            type={"url"}
            name="url"
            id="url"
            ref={inputRef}
            placeholder="https://www.google.com/"
          />
        </div>
        <button className={formButton} type={"submit"}>
          check
        </button>
      </form>
      {contentUrl && <ResultArea contentUrl={contentUrl} />}
    </main>
  );
};

export default Home;
