export function InputField({ icon, label, name, placeholder }) {
  return (
    <div className="w-full max-w-4xl p-4 mx-auto flex flex-col pb-3 gap-2 bg-white ">
      <div className="flex-row">
        <div className="flex flex-row gap-2  ">
          {icon}
          <label className="text-left">{label}</label>
        </div>
        <input
          name={name}
          placeholder={placeholder}
          className="gap-2 border-gray-400 border-solid border-2 w-96 p-2 rounded-sm "
        />
      </div>
    </div>
  );
}
