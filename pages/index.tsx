import useSWR from "swr";
import React, { useRef, useState } from "react";
import { ResponseData } from "../types";

const fetcher = async (url: string): Promise<ResponseData> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  return res.json();
};

const Home = () => {
  const [contentUrl, setContentUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current.value) setContentUrl(inputRef.current.value);
  };
  return (
    <main>
      <h1>Font Family Checker</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="url">Enter URL for site you would </label>
        <input
          type={"url"}
          name="url"
          id="url"
          ref={inputRef}
          placeholder="https://www.google.com/"
        />
        <button type={"submit"}>check</button>
      </form>
      {contentUrl && <ResultArea url={contentUrl} />}
    </main>
  );
};

type ResultAreaProps = {
  url: string;
};

const ResultArea: React.FC<ResultAreaProps> = ({ url }) => {
  const { data, error } = useSWR(`/api/font?url=${url as string}`, fetcher, {
    revalidateIfStale: false,
  });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <textarea
        value={`body {
  font-family: ${data.fontFamily};
}`}
        name="resultArea"
        id="resultArea"
        cols={50}
        rows={5}
      />
      {data.styleSheets.length == 0 ?? (
        <textarea
          value={data.styleSheets
            .map((sheet) => `<link rel="stylesheet" href=${sheet}>`)
            .join("¥n")}
          cols={30}
          rows={5}
        ></textarea>
      )}
      <div className="preview" style={{ fontFamily: data.fontFamily }}>
        <article>
          <h2 contentEditable>font-family</h2>
          <div contentEditable>
            The font-family CSS property specifies a prioritized list of one or
            more font family names and/or generic family names for the selected
            element.
          </div>
        </article>
      </div>
    </div>
  );
};

export default Home;
