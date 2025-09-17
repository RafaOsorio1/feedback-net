import clsx from 'clsx';

export function Card({ checkboxName, title, description, className }) {
  return (
    <div
      className={clsx(
        'p-4 flex flex-row items-center gap-2 border-2 border-solid border-gray-300 rounded-md',
        className,
      )}
    >
      <input type="checkbox" name={checkboxName} className="rounded-full" />
      <div>
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-gray-600 font-semibold">{description}</p>
      </div>
    </div>
  );
}

export function CardContainer() {
  return (
    <section className="p-5">
      <h4 className="font-medium mb-4 text-2xl">Tipo de Solicitud *</h4>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <Card
          title="Petición"
          description="Solicitud de informacíon, servicios o tramites"
          checkboxName="Petición"
          className="col-span-1"
        />
        <Card
          title="Quejas"
          description="Manifestación de insatisfacción por un servicio"
          checkboxName="Quejas"
          className="col-span-1"
        />
        <Card
          title="Reclamo"
          description="Solicitud de correción o compensación"
          checkboxName="Reclamo"
          className="col-span-1 row-span-1"
        />
        <Card
          title="Sugerencia"
          description="Propuesta de mejora o recomendación"
          checkboxName="Sugerencia"
          className="col-span-1 row-span-1"
        />
      </div>
    </section>
  );
}
