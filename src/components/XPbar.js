import React from 'react';

const XPbar = ({ currentXP, maxXP }) => {
  const percentage = Math.min((currentXP / maxXP) * 100, 100);
  const displayPercentage = Math.round(percentage);
  
  // Ensure we show at least a small amount of the bar for visual feedback
  const visualPercentage = Math.max(percentage, 2);

  return (
    <div className="xp-bar-row">
      <div className="xp-bar-header">
        <span className="xp-label-left">{currentXP} / {maxXP} XP</span>
        <span className="xp-label-right">{displayPercentage}% Complete</span>
      </div>
      <div className="xp-bar-wrapper">
        {/* The orange progress bar that shows percentage coverage */}
        <div className="xp-bar" style={{ width: `${visualPercentage}%` }}>
          {/* Only show the inner score if the bar is wide enough */}
          {percentage > 20 && (
            <span className="xp-score-inner">{displayPercentage}%</span>
          )}
        </div>
        {/* Always show the score for clarity */}
        <span className="xp-score">{displayPercentage}%</span>
      </div>
    </div>
  );
};

export default XPbar;
