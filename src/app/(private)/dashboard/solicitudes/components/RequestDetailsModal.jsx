'use client';

import {
  AlertDialog,
  Badge,
  Button,
  Flex,
  Separator,
  Text,
  TextArea,
} from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
  X,
} from 'lucide-react';
import { DateTime } from 'luxon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RequestStatus } from '../../../../core/constants/requestTypes';
import RequestServices from '../../core/request.services';

// Configuración de estados
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
    icon: <X className="w-3 h-3" />,
  },
};

// Configuración de tipos
const typeConfig = {
  COMPLAINT: { label: 'Queja', color: 'red' },
  REQUEST: { label: 'Petición', color: 'blue' },
  CLAIM: { label: 'Reclamo', color: 'orange' },
  SUGGESTION: { label: 'Sugerencia', color: 'green' },
};

export function RequestDetailsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId');

  // Open modal when requestId is present in URL
  useEffect(() => {
    setIsOpen(!!requestId);
  }, [requestId]);

  const handleOpenChange = (open) => {
    if (!open) {
      // Remove requestId from URL when closing modal
      const params = new URLSearchParams(searchParams);
      params.delete('requestId');
      router.replace(`${pathname}?${params.toString()}`);
    }
    setIsOpen(open);
  };

  const requestQuery = useQuery({
    queryKey: ['request', requestId],
    queryFn: () => RequestServices.getRequestById(requestId),
    enabled: !!requestId,
  });

  console.log(requestQuery.data);

  if (requestQuery.isLoading) {
    return <SolicitudDetailsSkeleton />;
  }

  const request = requestQuery.data?.data || {};
  const hasResponses = request.responses?.length > 0;
  const statusConfigItem =
    statusConfig[request.status] || statusConfig[RequestStatus.PENDING];
  const typeConfigItem = typeConfig[request.type] || {
    label: request.type,
    color: 'gray',
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Content size="3" className="max-w-3xl rounded-xl shadow-2xl">
        {/* Header */}
        <Flex
          align="center"
          justify="between"
          className="p-4 border-b border-gray-200"
        >
          <AlertDialog.Title>Detalles de la Solicitud</AlertDialog.Title>
          <AlertDialog.Cancel>
            <Button variant="ghost" color="gray" size="2" radius="full">
              <X className="w-4 h-4" />
            </Button>
          </AlertDialog.Cancel>
        </Flex>

        <div className="p-6">
          <div className="space-y-6">
            {/* Información del Solicitante */}
            <div className="space-y-4">
              <Text as="div" size="3" weight="bold" className="text-gray-900">
                Información del Solicitante
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <Text as="div" size="1" className="text-gray-500">
                      Nombre completo
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {request.fullName || 'No especificado'}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <Text as="div" size="1" className="text-gray-500">
                      Correo electrónico
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {request.email || 'No especificado'}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <Text as="div" size="1" className="text-gray-500">
                      Teléfono
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {request.phone || 'No especificado'}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <Text as="div" size="1" className="text-gray-500">
                      Dirección
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {request.address || 'No especificada'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de la Solicitud */}
            <div className="space-y-4">
              <Text as="div" size="3" weight="bold" className="text-gray-900">
                Detalles de la Solicitud
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text as="div" size="1" className="text-gray-500 mb-1">
                    Número de Radicado
                  </Text>
                  <Text as="div" size="2" className="font-medium">
                    {request.referenceNumber || `PQR-${requestId}`}
                  </Text>
                </div>
                <div>
                  <Text as="div" size="1" className="text-gray-500 mb-1">
                    Asunto
                  </Text>
                  <Text as="div" size="2" className="font-medium">
                    {request.subject || 'Sin asunto'}
                  </Text>
                </div>
                <div>
                  <Text as="div" size="1" className="text-gray-500 mb-1">
                    Tipo de Solicitud
                  </Text>
                  <Badge color={typeConfigItem.color} size="1" radius="large">
                    {typeConfigItem.label}
                  </Badge>
                </div>
                <div>
                  <Text as="div" size="1" className="text-gray-500 mb-1">
                    Estado
                  </Text>
                  <Badge
                    // @ts-ignore
                    color={statusConfigItem.color}
                    size="1"
                    radius="large"
                    className="flex items-center gap-1 w-fit"
                  >
                    {statusConfigItem.icon}
                    {statusConfigItem.label}
                  </Badge>
                </div>
                <div>
                  <Text as="div" size="1" className="text-gray-500 mb-1">
                    Fecha de Creación
                  </Text>
                  <Text as="div" size="2" className="font-medium">
                    {DateTime.fromISO(request.createdAt)
                      .setLocale('es')
                      .toFormat('dd/MM/yyyy HH:mm')}
                  </Text>
                </div>
                {request.updatedAt && (
                  <div>
                    <Text as="div" size="1" className="text-gray-500 mb-1">
                      Última actualización
                    </Text>
                    <Text as="div" size="2" className="font-medium">
                      {DateTime.fromISO(request.updatedAt)
                        .setLocale('es')
                        .toFormat('dd/MM/yyyy HH:mm')}
                    </Text>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Text as="div" size="1" className="text-gray-500">
                  Descripción detallada
                </Text>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <Text as="p" size="2" className="whitespace-pre-line">
                    {request.details || 'No se proporcionó una descripción.'}
                  </Text>
                </div>
              </div>
            </div>

            {/* Sección de Respuestas */}
            <Separator size="4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text as="div" size="3" weight="bold" className="text-gray-900">
                  Historial de Respuestas
                </Text>
                <Badge variant="soft" color="gray">
                  {hasResponses
                    ? `${request.responses.length} respuesta(s)`
                    : 'Sin respuestas'}
                </Badge>
              </div>

              <div className="space-y-4">
                {hasResponses ? (
                  request.responses.map((response) => (
                    <div
                      key={response.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <Text
                            as="div"
                            size="2"
                            weight="medium"
                            className="text-gray-900"
                          >
                            {response.isp?.name ||
                              response.employee?.name ||
                              'Soporte'}
                          </Text>
                          <Text as="div" size="1" className="text-gray-500">
                            {DateTime.fromISO(response.createdAt)
                              .setLocale('es')
                              .toFormat("dd 'de' MMMM 'de' yyyy 'a las' HH:mm")}
                            {response.updatedAt !== response.createdAt &&
                              ' (editado)'}
                          </Text>
                        </div>
                        {response.isp?.logo && (
                          <img
                            src={response.isp.logo}
                            alt={response.isp.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                      </div>
                      <div className="mt-3 p-3 bg-white rounded-md border border-gray-200">
                        <Text as="p" size="2" className="whitespace-pre-line">
                          {response.content}
                        </Text>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="text-center">
                      <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <Text as="p" size="2" className="text-gray-500">
                        No hay respuestas para esta solicitud. Sé el primero en
                        responder.
                      </Text>
                    </div>
                  </div>
                )}
              </div>

              {/* Formulario de respuesta */}
              <div className="space-y-3 mt-6">
                <Text as="div" size="3" weight="bold" className="text-gray-900">
                  Responder a esta solicitud
                </Text>
                <TextArea
                  placeholder="Escribe tu respuesta aquí..."
                  className="min-h-[120px] w-full"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="soft"
                    color="gray"
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancelar
                  </Button>
                  <Button>Enviar respuesta</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default function SolicitudDetailsSkeleton() {
  return (
    <div className="max-w-3xl w-full rounded-xl shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      <div className="p-6 space-y-6">
        {/* Información de la Solicitud */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-56" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Respuestas */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Agregar Respuesta */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-24 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// components/ui/skeleton.tsx
export function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
    />
  );
}
