import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

interface BackgroundSwitcherProps {
  onSkip: () => void;
}

export default function BackgroundSwitcher({ onSkip }: BackgroundSwitcherProps) {
  return (
    <button
      onClick={onSkip}
      className="
        absolute bottom-4 left-4
        bg-white/10 px-4 py-2 rounded-lg shadow hover:bg-white/20
        flex items-center space-x-2
        transition-colors duration-200 z-10
      "
      aria-label="Skip this background"
    >
      <span className="text-white text-sm">Skip this background</span>
      <FontAwesomeIcon icon={faRotateRight} className="text-white" />
    </button>
  );
}
