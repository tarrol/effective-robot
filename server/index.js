import React, { useState } from "react";
import styles from "./index.module.css";
import Head from "next/head";

export default function runChatGPT() {
  const [choreInput, setChoreInput, themeInput, setThemeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit() {
    try {
      const response = await fetch("/utils/ChatGPT", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ chore: "Doing the dishes" }, { theme: "Pirate" }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.result);
      setChoreInput("");
      setThemeInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setThemeInput(e.target.value); setChoreInput(e.target.value);}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  )
}