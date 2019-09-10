/**
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */

import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <div className={styles.left} />
      <div className={styles.top}>
        <p className={styles.slideShine}>您的三天假期已到账，请注意查收!</p>
      </div>
      <div className={styles.bottom} />
    </div>
  );
}
