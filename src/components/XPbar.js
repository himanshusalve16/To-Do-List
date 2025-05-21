import React from 'react';

const XPbar = ({ currentXP, maxXP }) => {
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className="xp-bar-row">
      <span className="xp-label-left">{currentXP} / {maxXP} XP</span>
      <div className="xp-bar-wrapper">
        <div className="xp-bar" style={{ width: `${percentage}%` }}></div>
        <span className="xp-score">{`${Math.round(percentage)}%`}</span>
      </div>
    </div>
  );
};

export default XPbar;
