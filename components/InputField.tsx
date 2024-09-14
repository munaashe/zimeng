import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    id: string;
    name: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
    inputMode?: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, name, value, onChange, error, type = 'text', inputMode = null }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="text-md font-medium text-start text-[12px]">
                {label}:
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                inputMode={inputMode}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default InputField;