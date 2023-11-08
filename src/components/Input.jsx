const fixedInputClass="text-sm text-gray-base w-full mr-3 py-5 px-3 h-10 border border-gray-900 rounded mb-2"

export default function Input({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    placeholder,
    customClass
}){
    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <input
                onChange={handleChange}
                value={value}
                id={id}
                name={name}
                type={type}
                required={isRequired}
                className={fixedInputClass+customClass}
                placeholder={placeholder}
            />
        </div>
    )
}