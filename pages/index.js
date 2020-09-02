import Head from "next/head";
import Todo from "../src/templates/Todo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Todo />
      </main>
    </div>
  );
}
