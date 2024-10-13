
import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from "next/link";
import styles from '../Header/styles.module.css';

import Image from 'next/image';


export function Header() {

  const { data: session, status } = useSession();

  return (
    <header className={styles.container}>
      <section className={styles.content}>

        <Link href={'/'}>
          {/* <h1 className={styles.logo}>
            Tarefas <span>Plus</span>
          </h1> */}
          {/* <img src="../../../public/assets/hero.png" alt="logo"/> */}
          <Image src="/assets/hero.png" alt="logo" width={100} height={50} />
        </Link>

        <nav className={styles.nav}>

          {session?.user && (
            <Link href={'/dashboard'} className={styles.linkPainel}>
              Meu painel
            </Link>
          )}

          {status === "loading" ? (
            <></>
          ) : session ? (
            <button className={styles.loginButton} onClick={() => signOut()}>
              Olá: {session?.user?.name}
            </button>
          ) : (
            <button className={styles.loginButton} onClick={() => signIn('google')}>
              Acessar
            </button>
          )}

        </nav>

      </section>
    </header>
  )
}


{/* <header className={styles.container}>
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
</header> */}