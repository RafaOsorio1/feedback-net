export function StatCard({
  name,
  value,
  icon,
  iconColor,
  lastValue,
  newValue,
}) {
  const percentage = ((newValue - lastValue) / lastValue) * 100;
  const colorPercentage = percentage > 0 ? 'text-green-500' : 'text-red-500';

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
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h3 className="text-sm text-gray-500 pb-1.5">{name}</h3>
          <p className="text-2xl font-bold mb-6">{value}</p>
        </div>
        <p className={`text-xs ${colorPercentage}`}>
          {percentage.toFixed(1)}% vs. el mes anterior
        </p>
      </div>
      <div
        className={`${iconColor} w-12 h-12 p-2 rounded-lg flex items-center justify-center text-white`}
      >
        {icon}
      </div>
    </div>
  );
}
