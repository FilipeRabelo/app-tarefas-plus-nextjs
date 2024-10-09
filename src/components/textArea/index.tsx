
import React, { HTMLProps } from "react";
import styles from './styles.module.css';

// componente dimamico
//  ... rest para pegar todas as propriedades

export function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      className={styles.textArea}
      {...rest}          // passando as propriedades para o textarea
    />
  )
}