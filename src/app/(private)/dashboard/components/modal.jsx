import { AlertDialog, Flex, Select } from '@radix-ui/themes';
import { Send } from 'lucide-react';
import { InputField } from '../../../components/input';
import { CustomButton } from '../../../components/trackerForm';

export function Modal({ button }) {
  return (
    <AlertDialog.Root>
      {/* Botón que abre el modal */}
      <AlertDialog.Trigger>{button}</AlertDialog.Trigger>

      {/* Contenido del modal */}
      <AlertDialog.Content
        style={{
          maxWidth: '650px',
          maxHeight: '700px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          padding: '0',
        }}
      >
        <AlertDialog.Title
          style={{
            borderBottom: '2px solid #ccc',
            padding: '20px',
          }}
        >
          Nueva Solicitud PQR/S
        </AlertDialog.Title>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col flex-1">
              <label className="text-base font-medium">
                Tipo de Solicitud *
              </label>
              <Select.Root size="3">
                <Select.Trigger placeholder="Tipo de Solcitud" />
                <Select.Content>
                  <Select.Item value="Petición">Petición</Select.Item>
                  <Select.Item value="Queja">Queja</Select.Item>
                  <Select.Item value="Reclamo">Reclamo</Select.Item>
                  <Select.Item value="Sugerencia">Sugerencia</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-base font-medium">
                Canal de Recepción{' '}
              </label>
              <Select.Root size="3">
                <Select.Trigger placeholder="Canal de Recepción" />
                <Select.Content>
                  <Select.Item value="Formulario Web">
                    Formulario Web
                  </Select.Item>
                  <Select.Item value="Email">Email</Select.Item>
                  <Select.Item value="Telefono">Telefono</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium">Prioridad </label>
            <Select.Root size="3">
              <Select.Trigger placeholder="Prioridad" />
              <Select.Content>
                <Select.Item value="Baja">Baja</Select.Item>
                <Select.Item value="Media">Media</Select.Item>
                <Select.Item value="Alta">Alta</Select.Item>
                <Select.Item value="Critica">Critica</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <h2 className=" font-medium text-xl">Información del Usuario</h2>

          <InputField
            label="Nombre Completo *"
            placeholder="Nombre Completo del usuario"
            classLabel="font-medium"
            id="Nombre Completo"
          />

          <InputField
            label="Email *"
            placeholder="correo@ejemplo.com"
            id="Email"
          />

          <InputField
            label="Teléfono *"
            placeholder="3001234567"
            id="Telefono"
          />

          <InputField
            label="Dirección"
            placeholder="Dirección completa"
            classLabel="font-medium text-base"
            id="Dirección"
          />

          <h2 className="font-medium text-xl">Detalles de la Solicitud</h2>

          <InputField
            label="Asunto *"
            placeholder="Resumen breve del problema o solicitud"
            id="Asunto"
          />

          <label className="block mb-1 text-base font-medium">
            Descripción Detallada *
          </label>
          <textarea
            placeholder="Describa detalladamente su solicitud, queja, reclamo o sugerencia..."
            className="border border-gray-400 rounded-lg p-3 w-full"
          ></textarea>
        </div>

        {/* Botones de acción */}
        <Flex
          gap="3"
          justify="end"
          style={{ paddingInline: '20px', paddingBlock: '20px' }}
        >
          <AlertDialog.Cancel>
            <CustomButton
              size="3"
              radius="large"
              text="Cancelar"
              Icon={undefined}
              variant="outline"
              color="white"
            />
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <CustomButton
              size="3"
              radius="large"
              Icon={<Send />}
              text="Enviar Solicitud"
            />
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
