'use client';

import clsx from 'clsx';

export function Card({ title, description, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'p-4 flex flex-row items-center gap-4 border-2 rounded-lg text-left',
        'transition-colors hover:border-blue-500',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white',
      )}
    >
      <div
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
          isSelected ? 'border-blue-500' : 'border-gray-400',
        )}
      >
        {isSelected && <div className="w-3 h-3 rounded-full bg-blue-500" />}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
}
