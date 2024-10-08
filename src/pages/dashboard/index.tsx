import React from "react";
import Head from "next/head";

import styles from './styles.module.css';

export default function Dashboard() {
  return (
    <div  className={styles.container}>
      <Head>
        <title>Tarefas plus | Painel Tarefas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/assets/favi.png" />
      </Head>

      <h1>Pagina painel</h1>

    </div>
  )
}