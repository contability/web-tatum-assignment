import { LabelValuePair } from '@DataTypes/pair';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';

interface RadioGroupProps<T extends FieldValues = FieldValues> {
  optionList: LabelValuePair[];
  name: Path<T>;
  control?: Control<T>;
  className?: string;
}

const RadioGroup = <T extends FieldValues = FieldValues>({
  optionList,
  name,
  control,
  className,
}: RadioGroupProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleClick = (optionValue: string | number) => {
    if (value === optionValue) onChange(undefined);
    else onChange(optionValue);
  };

  return (
    <div className={`flex w-full flex-wrap gap-4 ${className}`}>
      {optionList.map(option => {
        const isSelected = value === option.value;
        return (
          <label
            key={`radio-key__${name}-${option.value}`}
            htmlFor={`radio-id__${name}-${option.value}`}
            className="flex cursor-pointer items-center gap-2 text-base text-gray-800 transition-colors duration-200 hover:text-gray-900 md:text-lg lg:text-xl"
          >
            <input
              id={`radio-id__${name}-${option.value}`}
              type="radio"
              name={name}
              value={String(option.value)}
              checked={isSelected}
              onChange={() => handleClick(option.value)}
              className="h-4 w-4 border-2 border-gray-300 text-primary-blue transition-colors duration-200 checked:border-primary-blue checked:bg-primary-blue hover:border-gray-400 focus:ring-2 focus:ring-primary-blue-light focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="select-none">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
