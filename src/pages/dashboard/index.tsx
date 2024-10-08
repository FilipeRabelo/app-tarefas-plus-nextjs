
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import React from "react";
import Head from "next/head";

import styles from './styles.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefas plus | Painel Tarefas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/assets/favi.png" />
      </Head>

      <h1>Pagina painel</h1>

    </div>
  )
}

// server side para barrar rota  -- LADO DO SERVIDOR

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session = await getSession({ req });

  // verifica se tem usuário
  if(!session?.user){       // se nao tem session - usuário - vamos redirecionar
    return{
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {},
  };
};