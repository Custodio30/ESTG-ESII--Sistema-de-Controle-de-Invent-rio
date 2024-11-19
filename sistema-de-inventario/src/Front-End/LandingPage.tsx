// src/LandingPage.tsx
import React from 'react';
import '../../style.css';

const LandingPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Sistema de Controle Inventário de Carros</h1>
      </header>
      <main style={styles.main}>
        <div style={styles.modelSection}>
        </div>
        <section style={styles.infoSection}>
          <h2>Bem-vindo ao Sistema de Inventário</h2>
          <p>
            Gerencie seu inventário de veículos de forma eficaz e moderna.
          </p>
          <button className="button">Acessar Inventário</button>
        </section>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: 'var(--dark-gray)',
    color: 'var(--white)',
    textAlign: 'center',
  },
  header: {
    padding: '2rem',
    backgroundColor: 'var(--red)',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  modelSection: {
    flex: 1,
    padding: '1rem',
  },
  infoSection: {
    flex: 1,
    padding: '1rem',
  },
};

export default LandingPage;
