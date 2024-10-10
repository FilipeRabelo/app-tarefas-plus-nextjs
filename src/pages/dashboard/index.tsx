import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';

import { db } from '@/services/firebaseConnection';                    // banco de dados
import { addDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';                 // métodos
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

import { TextArea } from "@/components/textArea";
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

import Head from "next/head";
import styles from './styles.module.css';
import { lstat } from "fs";

interface HomeProps {
  user: {
    email: string;
  }
}

interface TarefasProps {
  id: string,
  created: Date,
  public: boolean,
  tarefa: string,
  user: string
}

export default function Dashboard({ user }: HomeProps) {      // recebe a propriedade usar do getServerSideProps

  const [input, setInput] = useState('');                     // armazenando o q foi digitado
  const [publicTarefa, setPublicTarefa] = useState(false);    // para armazenar se o check Box de tarefa publica

  const [tarefas, setTarefas] = useState<TarefasProps[]>([]); // estado para armazenar a lista de item;


  useEffect(() => {                                           // qndo abrir o componente ele buscar as tarefas no bd

    async function loadTarefas() {

      const tarefasRef = collection(db, 'tarefas');           // buscando no bd - referencia
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),                           // ordenando por ordem de criacao
        where('user', '==', user?.email)                      // buscando == email logado 
      );

      onSnapshot(q, (snapshot) => {                      // snapshot tenho acesso a todos os dados da query

        let lista = [] as TarefasProps[];

        snapshot.forEach((documento) => {
          lista.push({                                   // itens da tipagem TarefasProps
            id: documento.id,
            created: documento.data().created,
            public: documento.data().public,
            tarefa: documento.data().tarefa,
            user: documento.data().user
          })
        })

        // console.log(lista);
        setTarefas(lista);                  // passando a lista com os itens salvos no bd para a useState

      })
    }

    loadTarefas();

  }, [user?.email]);


  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {  // button checkbox - deixar tarefa publica
    setPublicTarefa(event.target.checked);
  };


  async function handleRegisterTask(event: FormEvent) {     // comunicar com o bando de dados - async
    event.preventDefault();

    if (input === '') {
      alert("Digite sua tarefa")
      return;
    };

    try {

      await addDoc(collection(db, 'tarefas'), {  // addDoc para criar um documento com um id aleatório
        created: new Date(),                     // enviando as props para BD
        public: publicTarefa,
        tarefa: input,                           // propriedade q vai receber o q digitar no input - textArea
        user: user?.email
      });

      setInput('');
      setPublicTarefa(false);

    } catch (error) {
      console.log(error);
    };

  };

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
            <h1 className={styles.title}>Vamos Começar! Qual é a sua Tarefa?</h1>
            <form onSubmit={handleRegisterTask}>

              <TextArea
                placeholder="Digite sua Tarefa!"
                value={input}     // useState - estado
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
              // cada vez q digite um text onChange pega e passa para a state - input
              />

              <div className={styles.checkBoxArea}>
                <input
                  type={"checkbox"}
                  className={styles.checkBox}
                  checked={publicTarefa}
                  onChange={handleChangePublic}
                />
                <label>Deixar Tarefa Pública</label>
              </div>

              <button className={styles.button} type="submit">
                Registrar
              </button>

            </form>
          </div>
        </section>

        <hr className={styles.hr}/>

        <section className={styles.tarefaContainer}>
          <h1>Minhas Tarefas</h1>

          {tarefas.map((item) => (

            <article key={item.id} className={styles.tarefa}>

              {item.public && (                                   // && se ela tiver publica mostra a div
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PÚBLICO</label>
                  <button className={styles.shareButton}>
                    <FiShare2
                      size={22}
                      color="#3183ff"
                    />
                  </button>
                </div>
              )}

              <div className={styles.tarefaContent}>
                <p>{item.tarefa}</p>
                <button className={styles.trashButton}>
                  <FaTrash
                    size={24}
                    color="#FF0000"
                  />
                </button>
              </div>
            </article>

          ))}

        </section>

      </main>
    </div>
  )
}




// bloquear a toda de dashboard sem estar logado
// server side

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  // verifica se tem usuário logado -- se nao tem session - usuário - vamos redirecionar

  if (!session?.user) {         // (!session?.user) -- Verifica session de forma segura
    return {                    // ?. garante que código só tentará acessar user se session existir.
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {                            // se tem user logado retorna: 
    props: {
      user: {
        email: session?.user?.email   // retorna o email se tiver user logado
      }
    },
  };
};