import { GetServerSideProps } from 'next';    // usar o server side para buscar os dados - GetServerSideProps
import { useSession } from 'next-auth/react';        // para saber qual usuário esta logado
import { db } from '../../services/firebaseConnection';
import {
  doc,
  getDoc,                             // pegando o doc - collection no db
  getDocs,                            // pegando todos
  addDoc,                             // addDoc cria um id aleatório na collection do db
  collection,
  query,
  where,
} from 'firebase/firestore';

import Head from 'next/head';
import styles from './styles.module.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextArea } from '@/components/textArea';
import { FaTrash } from 'react-icons/fa'


interface TarefaProps {
  item: {
    tarefaId: string,
    user: string,
    tarefa: string,
    public: boolean,
    created: string
  },
  allComments: CommentProps[]  // array com comentários
}

interface CommentProps {
  id: string,
  comment: string,
  tarefaId: string,
  user: string,
  name: string
}


export default function Tarefa({ item, allComments }: TarefaProps) {  // preciso passar o quem tem dentro da propriedade

  const { data: session } = useSession();

  const [input, setInput] = useState('');

  const [comments, setComments] = useState<CommentProps[]>(allComments || []);  // traz os comentários ou array vazio

  async function handleComment(event: FormEvent) {   // como é uma ação (onSubmit) de um formulário, preciso enviar um evento
    event.preventDefault();

    if (input === '') return;
    if (!session?.user?.email || !session?.user?.name) return;

    try { // criando o documento comentários - fazer a requisição ao bd e criar uma nova coleção de comentários
      
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        tarefaId: item?.tarefaId
      });

      const data = {                  // adicionando novo comentário a lista de array

        id: docRef.id,
        comment: input,
        user: session?.user?.email,
        name: session?.user?.name,
        tarefaId: item?.tarefaId
      };                              // colocando novo objeto dentro da useState

      setComments((itensExistem) => [...itensExistem, data]);   // add novo obg data ao array existente
      setInput('')

    } catch (err) {
      console.log(err)
    }
  }

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
          <p>{item?.tarefa}</p>
        </article>
      </main>

      <section className={styles.comentariosContent}>
        <h2>Fazer Comentário</h2>

        <form className={styles.form} onSubmit={handleComment}>
          <TextArea
            placeholder='Digite seu Comentário!'
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
          // dentro da função anonima recebo um event
          // passando o valor digitado para o useState
          />

          <button
            disabled={!session?.user}  // se ele nao tiver logado - btn fica off
            className={styles.btn}>
            Enviar Comentário
          </button>
        </form>
      </section>


      {/* COMENTARIOS */}
      <section className={styles.commentsContainer}>
        <h2>Todos os Comentários</h2>

        {comments.length === 0 && (
          <span>Nenhum Comentário</span>
        )}

        {comments.map((item) => (
          <article key={item.id} className={styles.comments}>

            <div className={styles.headComment}>
              <label className={styles.commentsLabelName}>User: <span>{item.name}</span></label>

              {item.user === session?.user?.email && (
                <button className={styles.buttonTrash}>
                  <FaTrash
                    size={21}
                    color='#FF0000'
                  />
                </button>
              )}

            </div>

            <p>{item.comment}</p>

          </article>
        ))}

      </section>

    </div>
  )
}


// server side

export const getServerSideProps: GetServerSideProps = async ({ params }) => {  // buscando a tarefa

  const id = params?.id as string;
  const docRef = doc(db, 'tarefas', id);      // referencia - acessando o caminho - id da tarefa


  // buscando a collection comentário
  const q = query(collection(db, "comments"), where('tarefaId', '==', id));


  const snapshotsComments = await getDocs(q)  // fazendo a busca
  let allComments: CommentProps[] = []        // montando o array vazio, com os comentários - criar tipagem

  snapshotsComments.forEach((doc) => {        // doc é cada item q ele encontrou

    allComments.push({                        // colocando dentro do array allComments
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      tarefaId: doc.data().tarefaId
    })
  })





  // buscando o documento "tarefas"
  const snapshot = await getDoc(docRef);      // buscando o documento "tarefas" la no banco de dados

  if (snapshot.data() === undefined) {        // para verificar se a tarefa existe
    return {
      redirect: {
        destination: '/',                     // se nao achar a tarefa direciona para a home
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
  // console.log(objetoTarefa);


  // enviando as propreidpropriedadesades para o componente
  return {
    props: {
      item: objetoTarefa,     // passando o obj como propriedades para o component
      allComments: allComments
    }
  }
}

// dentro de {} pego o params = id
// recebo o params do servidor
// pegar do bd os detalhes da tarefa
// : traz a tipagem 