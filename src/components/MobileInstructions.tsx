import React from 'react';

export const MobileInstructions: React.FC = () => {
  return (
    <div className="md:hidden mb-4 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
      <p className="text-sm text-blue-800 dark:text-blue-200">
        <span className="font-semibold">Toca</span> para revelar • <span className="font-semibold">Mantén presionado</span> para marcar 🚩
      </p>
    </div>
  );
};
