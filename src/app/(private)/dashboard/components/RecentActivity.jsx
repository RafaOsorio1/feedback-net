import { Badge } from '@radix-ui/themes';
import { CheckCircle, Clock, MessageSquare, User, XCircle } from 'lucide-react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { RequestStatus } from '../../../core/constants/requestTypes';

export function Pqrs({ subject, fullName, status, type, createdAt, isp }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'SUGGESTION':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'COMPLAINT':
        return <MessageSquare className="w-4 h-4 text-orange-500" />;
      case 'CLAIM':
        return <MessageSquare className="w-4 h-4 text-red-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Fragment>
      <div className="flex flex-row gap-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
        <div className="flex items-center w-7 h-7 rounded-full bg-blue-50 justify-center">
          {getTypeIcon(type)}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-start">
            <p className="text-base font-medium">{subject}</p>
            <StatusBadge status={status} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <User className="w-4 h-4" />
              <span>{fullName}</span>
              {isp?.name && (
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  {isp.name}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm">
              {DateTime.fromISO(createdAt).setLocale('es').toRelative()}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const statusConfig = {
  [RequestStatus.PENDING]: {
    label: 'Pendiente',
    color: 'blue',
    icon: <Clock className="w-3 h-3" />,
  },
  [RequestStatus.IN_PROGRESS]: {
    label: 'En Progreso',
    color: 'yellow',
    icon: <Clock className="w-3 h-3" />,
  },
  [RequestStatus.RESOLVED]: {
    label: 'Resuelto',
    color: 'green',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  [RequestStatus.CANCELED]: {
    label: 'Cancelado',
    color: 'red',
    icon: <XCircle className="w-3 h-3" />,
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig[RequestStatus.PENDING];

  return (
    <Badge
      // @ts-ignore
      color={config.color}
      size="1"
      radius="large"
      className="flex items-center gap-1"
    >
      {config.icon}
      {config.label}
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
