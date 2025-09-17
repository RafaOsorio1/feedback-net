import {
  FileText,
  MailIcon,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
  WifiIcon,
} from 'lucide-react';
import { CardContainer } from './components/cards';
import { InputField } from './components/input';
import { PqrForm } from './components/pqrForm';
import { ViewToggle } from './components/viewToggle';

export default function Home() {
  return (
    <section className="w-full">
      <ViewToggle />
      <section className="shadow-sm border-b border-gray-200 py-2">
        <div className="max-w-4xl p-4 mx-auto">
          <div className="flex flex-row items-center gap-3 space-x-1">
            <div className="bg-blue-600 text-white rounded-lg  p-2 flex justify-center items-center">
              <WifiIcon className="w-9 h-9" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">FeedbackNet</h2>
              <p className="text-gray-600 font-semibold">
                {' '}
                Portal de Peticiones, Quejas, Reclamos y Sugerencias
              </p>
            </div>
          </div>
        </div>
      </section>
      <PqrForm>
        <CardContainer />

        <div className="px-5 ">
          <h4 className="font-semibold text-2xl p-2">Sus Datos de Contacto</h4>
          <div className="border-b-1 mb-3 border-b-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-0.5">
          <div className="col-span-1">
            <InputField
              icon={<UserRound />}
              name={'Nombre del usuario'}
              label={'Nombre del Usuario'}
              placeholder={'Su nombre completo'}
            />
          </div>

          <div className="col-span-1 ">
            <InputField
              icon={<MailIcon />}
              name={'Correo Electronico'}
              label={'Correo Electronico'}
              placeholder={'su.email@ejemplo.com'}
            />
          </div>

          <div className="col-span-1">
            <InputField
              icon={<Phone />}
              name={'Telefono Celular'}
              label={'Telefono Celular'}
              placeholder={'3001234567'}
            />
          </div>

          <div className="col-span-1">
            <InputField
              icon={<MapPin />}
              name={'Direccion'}
              label={'Direccion (opcional)'}
              placeholder={'Calle 123 # 45-67 Barrio, Ciudad'}
            />
          </div>
        </div>

        <section className="px-5 ">
          <h4 className="font-semibold text-2xl p-2">
            Detalles de su Solicitud
          </h4>
          <div className="border-b-1 mb-6 border-b-gray-200"></div>

          <div className=" items-center">
            <div className=" flex flex-row gap-2 mb-2">
              <FileText />
              <label>Asunto *</label>
            </div>
            <textarea
              placeholder="Resumen breve de su solicitud"
              className="border-solid border-1 border-gray-400 gap-4 rounded-lg p-2 w-full"
            ></textarea>

            <div className=" flex flex-row gap-2 mt-4 mb-2">
              <MessageCircle />
              <label>Descripción Detallada *</label>
            </div>
            <textarea
              placeholder="Describa detalladamente su solicitud, problema o sugerencia. Incluya fechas, numeros de contacto, y cualquier informacion relevante..."
              className="border-solid border-1 border-gray-400 gap-3 rounded-lg p-3 w-full mb-4"
            ></textarea>
          </div>

          <p className="text-gray-500">
            Minimo 20 caracteres. Sea especifico para una mejor atención.
          </p>
        </section>
      </PqrForm>
    </section>
  );
}
