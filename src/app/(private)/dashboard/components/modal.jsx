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
      <AlertDialog.Content maxWidth="500px">
        <AlertDialog.Title>Nueva Solicitud PQR/S</AlertDialog.Title>

        <div className="border-b-1 border-gray-400 w-full my-4 -mx-5 "></div>

        <div className="flex flex-col">
          <label className="text-base font-medium">Tipo de Solicitud *</label>
          <Select.Root size="3" defaultValue="Tipo de Solcitud">
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Petición">Petición</Select.Item>
              <Select.Item value="orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div className="flex flex-col">
          <label className="text-base font-medium">Canal de Recepción </label>
          <Select.Root size="3" defaultValue="Canal de Recepción">
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Formulario Web">Formulario Web</Select.Item>
              <Select.Item value="orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div className="flex flex-col">
          <label className="text-base font-medium">Prioridad </label>
          <Select.Root size="3" defaultValue="Peticion">
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Media">Media</Select.Item>
              <Select.Item value="orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <h2 className=" font-medium text-xl mt-5 mb-4">
          Información del Usuario
        </h2>

        <InputField
          label="Nombre Completo *"
          placeholder="Nombre Completo del usuario"
          containerClassName="mb-5"
          classLabel="font-medium"
          id="Nombre Completo"
        />

        <InputField
          label="Email *"
          placeholder="correo@ejemplo.com"
          containerClassName="mb-5"
          id="Email"
        />

        <InputField
          label="Teléfono *"
          placeholder="3001234567"
          containerClassName=" mb-5"
          id="Telefono"
        />

        <InputField
          label="Dirección"
          placeholder="Dirección completa"
          containerClassName="mb-5"
          classLabel="font-medium text-base"
          id="Dirección"
        />

        <h2 className="font-medium text-xl mt-7 mb-4 ">
          Detalles de la Solicitud
        </h2>

        <InputField
          label="Asunto *"
          placeholder="Resumen breve del problema o solicitud"
          className="col-span-1"
          id="Asunto"
        />

        <label className="block mb-1 mt-5 text-base font-medium">
          Descripción Detallada *
        </label>
        <textarea
          placeholder="Describa detalladamente su solicitud, queja, reclamo o sugerencia..."
          className="border border-gray-400 rounded-lg p-3 w-full mb-4"
        ></textarea>

        {/* Botones de acción */}
        <Flex gap="3" justify="end">
          <AlertDialog.Cancel>
            <CustomButton
              size="3"
              radius="large"
              text="Cancelar"
              Icon={undefined}
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
