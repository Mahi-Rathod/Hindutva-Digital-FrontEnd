const InputField = ({ id, name, type, value, onChange, icon: Icon, placeholder }) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-sm font-medium text-gray-300">
            {placeholder}
        </label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
            />
        </div>
    </div>
);

export default InputField;