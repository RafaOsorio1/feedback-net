import { Badge } from '@radix-ui/themes';
import { MessageSquare, UserIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';

export function Pqrs({ title, userName, status, priority, date }) {
  return (
    <Fragment>
      <div className="flex flex-row gap-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
        <div className="flex items-center w-7 h-7 rounded-full bg-blue-200 justify-center">
          <MessageSquare className="w-4 h-4 text-blue-500" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium">{title}</p>
          <div>
            <div className="flex flex-row items-center gap-4">
              <UserIcon className="w-4 h-4 text-gray-500" />
              <p className="m-0 p-0 text-gray-500 text-sm">{userName}</p>
              <StatusBadge state={status} />
              <PriorityBadge priority={priority} />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              {DateTime.fromISO(date).setLocale('es').toRelative()}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export function StatusBadge({ state }) {
  let color = 'blue';

  switch (state) {
    case 'Recibido':
      color = 'blue';
      break;
    case 'Respondido':
      color = 'green';
      break;
    case 'En Proceso':
      color = 'yellow';
      break;
    default:
      color = 'blue';
  }

  return (
    // @ts-ignore
    <Badge color={color} size="1" radius="large">
      {state}
    </Badge>
  );
}

export function PriorityBadge({ priority }) {
  let color = 'blue';

  switch (priority) {
    case 'Alta':
      color = 'orange';
      break;
    case 'Media':
      color = 'yellow';
      break;
    case 'Critica':
      color = 'red';
      break;
    case 'Baja':
      color = 'green';
      break;
    default:
      color = 'blue';
  }

  return (
    // @ts-ignore
    <Badge color={color} size="1" radius="large">
      {priority}
    </Badge>
  );
}
