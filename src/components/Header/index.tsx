
import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from "next/link";
import styles from '../Header/styles.module.css';

export function Header() {

  const { data: session, status } = useSession();

  return (
    <header className={styles.container}>
      <section className={styles.content}>

        <nav className={styles.nav}>
          <Link href={'/'}>
            <h1 className={styles.logo}>
              Tarefas <span>Plus</span>
            </h1>
          </Link>

          {session?.user && (
            <Link href={'/dashboard'} className={styles.linkPainel}>
              Meu painel
            </Link>
          )}
       
        </nav>

        {status === "loading" ? (
          <></>
        ) : session ? (
          <button className={styles.loginButton} onClick={() => signOut()}>
            {session?.user?.name}
          </button>
        ) : (
          <button className={styles.loginButton} onClick={() => signIn('google')}>
            Acessar
          </button>
        )}

      </section>
    </header>
  )
}