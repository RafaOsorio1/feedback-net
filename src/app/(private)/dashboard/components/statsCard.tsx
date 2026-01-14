import { ReactNode } from 'react';

interface StatCardProps {
  name: string;
  value: number;
  icon: ReactNode;
  iconColor: string;
  lastValue: number;
  newValue: number;
}

export function StatCard({
  name,
  value,
  icon,
  iconColor,
  lastValue,
  newValue,
}: StatCardProps) {
  // Calculate the difference and percentage
  const difference = newValue - lastValue;
  const percentage = lastValue > 0 ? (difference / lastValue) * 100 : 0;

  // Determine the color and icon based on the change
  const isPositive = difference >= 0;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
  const arrowIcon = isPositive ? '↑' : '↓';

  // Format the value with thousands separator
  const formattedValue = new Intl.NumberFormat('en-US').format(value);

  // Only show percentage if we have a previous value to compare with
  const showPercentage = lastValue > 0;

  return (
    <div
      className="
        flex flex-row justify-between flex-1
        border border-gray-200 rounded-lg p-4 shadow-sm
        transition-all duration-300 ease-out
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]
        hover:bg-gray-50
      "
    >
      <div className="flex flex-col flex-1">
        <h3 className="text-sm text-gray-500 pb-1.5">{name}</h3>
        <p className="text-2xl font-bold">{formattedValue}</p>

        {showPercentage && (
          <div className="mt-2 flex items-center">
            <span
              className={`text-xs font-medium ${colorClass} flex items-center`}
            >
              <span className="mr-1">{arrowIcon}</span>
              {Math.abs(percentage).toFixed(1)}%
              <span className="text-gray-500 text-xs ml-1">
                ({isPositive ? '+' : ''}
                {difference} vs. last month)
              </span>
            </span>
          </div>
        )}

        {!showPercentage && lastValue === 0 && (
          <div className="mt-2">
            <span className="text-xs text-gray-400">No previous data</span>
          </div>
        )}
      </div>

      <div
        className={`${iconColor} w-12 h-12 p-2 rounded-lg flex items-center justify-center text-white ml-4`}
      >
        {icon}
      </div>
    </div>
  );
}
