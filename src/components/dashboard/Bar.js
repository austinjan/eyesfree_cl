import React from 'react';
import styles from './bar.module.less';

const bar = ({
  targetLabel,
  target,
  color = 'rgb(19,194,194)',
  strokeWidth,
  percent,
}) => {
  return (
    <div className={styles.bar}>
      <div className={styles.barWrap}>
        <div
          className={styles.barDraw}
          style={{
            backgroundColor: color || null,
            width: percent ? `${percent}%` : null,
            height: strokeWidth || null,
          }}
        />
      </div>
    </div>
  );
};

export default bar;
