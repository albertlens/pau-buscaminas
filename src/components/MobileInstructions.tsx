import React from 'react';

export const MobileInstructions: React.FC = () => {
  return (
    <div className="md:hidden mb-4 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-blue-300 dark:border-blue-700">
      <p className="text-sm text-blue-900 dark:text-blue-100 text-center font-medium">
        <span className="inline-block mr-2">👆</span>
        <span className="font-bold">Toca rápido</span> para revelar
      </p>
      <p className="text-sm text-blue-900 dark:text-blue-100 text-center font-medium mt-1">
        <span className="inline-block mr-2">⏱️</span>
        <span className="font-bold">Mantén 0.5s</span> para poner bandera 🚩
      </p>
    </div>
  );
};
