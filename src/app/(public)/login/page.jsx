import { KeyRound, LogOut, MailIcon, Wifi } from 'lucide-react';
import { InputField } from '../../components/input';
import { CustomButton } from '../../components/trackerForm';

export default function LoginPage() {
  return (
    <section className="w-lg">
      <div className="text-white flex flex-col justify-center items-center gap-3 ">
        <div className="bg-white flex justify-center items-center w-24 h-24 p-4 rounded-full shadow-xl mb-2">
          <Wifi className="text-blue-500 w-full h-full" />
        </div>
        <h1 className="text-4xl font-extrabold text-center">FeedbackNet</h1>
        <p className="text-center text-sm font-medium">
          Sistema de Gestion PQR/S para ISPs
        </p>
      </div>

      <div className="bg-white rounded-lg px-9 py-5 shadow-xl mt-9">
        <div>
          <h2 className="font-semibold text-2xl flex justify-center mb-6 mt-4">
            Iniciar Sesión
          </h2>

          <InputField
            type="email"
            icon={<MailIcon />}
            label="Correo Electrónico"
            placeholder="admin@isp.com"
            containerClassName="mb-4"
          />

          <InputField
            type="password"
            icon={<KeyRound />}
            label="Contraseña"
            placeholder="........."
          />
        </div>

        <CustomButton
          size="3"
          radius="large"
          Icon={<LogOut />}
          text="Iniciar sesion"
          style={{
            margin: '20px 0px',
            width: '100%',
          }}
        />

        {/* <button
          radius="large"
          className="border-solid border-1 flex flex-row justify-center gap-3 p-3 bg-blue-600 border-blue-600 mb-9 text-white font-semibold mt-6 w-full"
        >
          <LogOut />
          Iniciar Sesión
        </button> */}
        <div className="bg-gray-100 rounded-lg py-4 p-5 gap-5 mb-7 font-medium text-sm">
          <p className="font-semibold text-base mb-2">
            Credenciales de demostración:
          </p>
          <p>Email: admin@isp.com</p>
          <p>Contraseña: password</p>
        </div>
        <div className="flex flex-row gap-2 font-medium mb-4 justify-center">
          <p>¿No tienes cuenta? </p>
          <p className="text-blue-600 font-medium">Registrar mi ISP</p>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-white mt-10">
          Cumplimiento Resolución CRC 6242 de 2021{' '}
        </p>
      </div>
    </section>
  );
}
