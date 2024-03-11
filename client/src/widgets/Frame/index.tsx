import React from "react";
import styles from './styles.module.css';

const Frame = ({children}: {children: React.ReactNode}) => {
  return (
  <div className={styles.container}>
    {children}
  </div>)
}

export default Frame;