'use client';

import {
  FileText,
  MailIcon,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
  WifiIcon,
} from 'lucide-react';
import { Controller } from 'react-hook-form';
import { CardContainer } from './components/cards';
import { InputField } from './components/input';
import { PqrForm } from './components/pqrForm';
import { TrackerForm } from './components/trackerForm';
import { ViewToggle } from './components/viewToggle';
import { usePqrForm } from './core/hooks/usePqrForm';
import { useStore } from './core/store';

export default function Home() {
  const { form } = usePqrForm();
  const { initialView } = useStore();

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
      {initialView === 'form' ? (
        <PqrForm>
          <CardContainer />
          <div className="px-5 ">
            <h4 className="font-semibold text-2xl p-2">
              Sus Datos de Contacto
            </h4>
            <div className="border-b-1 mb-3 border-b-gray-200"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 m-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <InputField
                  {...field}
                  icon={<UserRound />}
                  label="Nombre del Usuario"
                  required={true}
                  placeholder="Su nombre completo"
                  className="col-span-1"
                  onChange={(e) => console.log(e.target.value)}
                />
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <InputField
                  icon={<MailIcon />}
                  label="Correo Electronico"
                  required={true}
                  placeholder="su.email@ejemplo.com"
                  className="col-span-1"
                  {...field}
                />
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <InputField
                  icon={<Phone />}
                  label="Telefono Celular"
                  required={true}
                  placeholder="3001234567"
                  className="col-span-1"
                  {...field}
                />
              )}
            />

            <Controller
              name="address"
              control={form.control}
              render={({ field }) => (
                <InputField
                  icon={<MapPin />}
                  label="Direccion (opcional)"
                  placeholder="Calle 123 # 45-67 Barrio, Ciudad"
                  className="col-span-1"
                  {...field}
                />
              )}
            />
          </div>

          <section className="px-5 ">
            <h4 className="font-semibold text-2xl p-2">
              Detalles de su Solicitud
            </h4>
            <div className="border-b-1 mb-6 border-b-gray-200"></div>

            <div className=" items-center">
              <Controller
                name="subject"
                control={form.control}
                render={({ field }) => (
                  <InputField
                    icon={<FileText />}
                    label="Asunto"
                    required={true}
                    placeholder="Resumen breve de su solicitud"
                    {...field}
                  />
                )}
              />

              <div className=" flex flex-row gap-2 mt-4 mb-2">
                <MessageCircle />
                <label>Descripción Detallada *</label>
              </div>
              <textarea
                placeholder="Describa detalladamente su solicitud, problema o sugerencia. Incluya fechas, numeros de contacto, y cualquier informacion relevante..."
                className="border-solid border-1 border-gray-400 gap-4 rounded-lg p-3 w-full mb-2"
              ></textarea>
            </div>

            <p className="text-gray-600 mb-4">
              Sea especifico para una mejor atención.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">
                Información Importante
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>
                  • Su solicitud será radicada automáticamente y recibirá un
                  Código Único de Notificación (CUN)
                </li>
                <li>
                  • El tiempo máximo de respuesta es de 15 días hábiles según la
                  Resolución CRC 6242 de 2021
                </li>
                <li>
                  • Recibirá notificaciones por email sobre el estado de su
                  solicitud
                </li>
                <li>
                  • Sus datos personales serán tratados conforme a la Ley 1581
                  de 2012
                </li>
              </ul>
            </div>
          </section>
        </PqrForm>
      ) : (
        <TrackerForm>dfsdfgs</TrackerForm>
      )}
    </section>
  );
}
