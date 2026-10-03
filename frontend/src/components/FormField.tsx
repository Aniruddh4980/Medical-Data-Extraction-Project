import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        disabled={disabled}
        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium placeholder-gray-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 text-sm"
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    </div>
  );
};
