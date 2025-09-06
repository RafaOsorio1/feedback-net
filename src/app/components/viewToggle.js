'use client';

import { FilePen, Search } from 'lucide-react';
import { useStore } from '../core/store';

export function ViewToggle() {
  const { initialView, setInitialView } = useStore();
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setInitialView('form')}
            className={`flex-1 flex flex-row gap-2 justify-center items-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              initialView === 'form'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FilePen />
            Enviar Nueva Solicitud
          </button>
          <button
            onClick={() => setInitialView('tracker')}
            className={`flex-1 flex flex-row gap-2 justify-center items-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              initialView === 'tracker'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search />
            Consultar Estado
          </button>
        </div>
      </div>
    </div>
  );
}
