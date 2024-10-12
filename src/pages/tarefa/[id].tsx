
// usar o server side para buscar os dados - GetServerSideProps

import { GetServerSideProps } from 'next';
import React from 'react';
import Head from 'next/head';
import styles from './styles.module.css';
import { TextArea } from '@/components/textArea';

import { db } from '../../services/firebaseConnection';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';


interface TarefaProps{
  propObjTarefa:{
    tarefaId: string,
    user: string,
    tarefa: string,
    public: boolean,
    created: string
  }
}


export default function Tarefa({ propObjTarefa }: TarefaProps) {  // preciso passar o quem tem dentro da propriedade
  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da Tarefa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/assets/favi.png" />
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.tarefa}>
          <p>{propObjTarefa?.tarefa}</p>
        </article>
      </main>

      <section className={styles.comentariosContent}>
        <h2>Fazer Comentário</h2>

        <form className={styles.form}>
          <TextArea
            placeholder='Digite seu Comentário!'
          />

          <button className={styles.btn}>
            Enviar Comentário
          </button>
        </form>
      </section>
    </div>
  )
}


// server side
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const id = params?.id as string;

  const docRef = doc(db, 'tarefas', id);      // referencia - acessando o caminho - id da tarefa
  const snapshot = await getDoc(docRef);      // buscando o documento la no banco de dados

  // para verificar se a tarefa existe
  if (snapshot.data() === undefined) {        // se nao achar a tarefa direciona para a home
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  if (!snapshot.data()?.public) {   // verificando se a tarefa NAO for publica - manda para o home
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // convertendo a data
  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const objetoTarefa = {                                        // objeto 
    tarefaId: id,                                               // passar esse obj para o component
    user: snapshot.data()?.user,
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString()
  }

  console.log(objetoTarefa);

  return {                      // passando o obj como propriedades para o component
    props: {
      propObjTarefa: objetoTarefa,
    }
  }
}

// dentro de {} pego o params = id
// recebo o params do servidor
// pegar do bd os detalhes da tarefa
// : traz a tipagem 
