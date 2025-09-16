import { MailIcon, MapPin, Phone, UserRound, WifiIcon } from 'lucide-react';
import { Fragment } from 'react';
import { CardContainer } from './components/cards';
import { InputField } from './components/input';
import { PqrForm } from './components/pqrForm';
import { ViewToggle } from './components/viewToggle';

export default function Home() {
  return (
    <Fragment>
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
        <InputField
          icon={<UserRound />}
          name={'Nombre del usuario'}
          label={'Nombre del Usuario'}
          placeholder={'Su nombre completo'}
        />

        <InputField
          icon={<Phone />}
          name={'Telefono Celular'}
          label={'Telefono Celular'}
          placeholder={'3001234567'}
        />

        <InputField
          icon={<MailIcon />}
          name={'Correo Electronico'}
          label={'Correo Electronico'}
          placeholder={'su.email@ejemplo.com'}
        />

        <InputField
          icon={<MapPin />}
          name={'Direccion'}
          label={'Direccion (opcional)'}
          placeholder={'Calle 123 # 45-67 Barrio, Ciudad'}
        />
      </PqrForm>
    </Fragment>
  );
}
