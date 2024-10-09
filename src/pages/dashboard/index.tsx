
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import { TextArea } from "@/components/textArea";

import React from "react";
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
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

      <main className={styles.main}>

        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua Tarefa?</h1>

            <form>
              <TextArea
                placeholder="Digite qual sua tarefa!"
              />
              <div className={styles.checkBoxArea}>
                <input
                  type={"checkbox"}
                  className={styles.checkBox}
                />
                <label>Deixar Tarefa Pública</label>
              </div>
              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>

          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2
                  size={22}
                  color="#3183ff"
                />
              </button>
            </div>
            
            <div className={styles.taskContent}>
              <p>Criando app de tarefas usando next.js.</p>
              <button className={styles.trashButton}>
                <FaTrash
                  size={24}
                  color="#FF0000"
                />
              </button>
            </div>
          </article>
          
          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2
                  size={22}
                  color="#3183ff"
                />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Criando app de tarefas usando next.js.</p>
              <button className={styles.trashButton}>
                <FaTrash
                  size={24}
                  color="#FF0000"
                />
              </button>
            </div>
          </article>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2
                  size={22}
                  color="#3183ff"
                />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Criando app de tarefas usando next.js.</p>
              <button className={styles.trashButton}>
                <FaTrash
                  size={24}
                  color="#FF0000"
                />
              </button>
            </div>
          </article>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2
                  size={22}
                  color="#3183ff"
                />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Criando app de tarefas usando next.js.</p>
              <button className={styles.trashButton}>
                <FaTrash
                  size={24}
                  color="#FF0000"
                />
              </button>
            </div>
          </article>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2
                  size={22}
                  color="#3183ff"
                />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Criando app de tarefas usando next.js.</p>
              <button className={styles.trashButton}>
                <FaTrash
                  size={24}
                  color="#FF0000"
                />
              </button>
            </div>
          </article>

        </section>

      </main>
    </div>
  )
}




// bloquear a toda de dashboard sem estar logado
// server side

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//   const session = await getSession({ req });
//   // verifica se tem usuário
//   if(!session?.user){       // se nao tem session - usuário - vamos redirecionar
//     return{
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: {},
//   };
// };