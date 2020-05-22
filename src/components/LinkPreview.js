import React, { useState } from "react";

export default function LinkPreview() {
  const [data, setData] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const handleChange = async (e) => {
    setInput(e.target.value);

    if (input.split(" ").includes("https://www.amazon.in") && !dataFetched) {
      setLoading(true);
      await fetch("http://localhost:4000")
        .then((data) => data.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          setDataFetched(true);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="text-preview">
        <textarea
          onChange={(e) => handleChange(e)}
          value={input}
          placeholder="Type https://www.amazon.in to get Preview"
        ></textarea>
        {loading && <h2>Loading Data ...</h2>}
        {data && (
          <div className="preview-image">
            <a href={data.url}>
              <img src={data.srctText} alt={data.rawText} />
            </a>
            <p>{data.rawText}</p>
          </div>
        )}
      </div>
    </>
  );
}
