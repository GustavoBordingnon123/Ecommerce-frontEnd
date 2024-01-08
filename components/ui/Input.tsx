
interface InputProps {
    placeholder: string;
    label: string;
    icon?: React.ReactNode;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, label, icon, type, value, onChange }) => {
    return (
        <div className="flex flex-col gap-y-1">
            <label className="text-sm font-gray">{label}</label>
            <div className="border flex gap-x-2 justify-center items-center p-1 focus-none">
                {icon}
                <input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="w-[250px] bg-transparent focus-none"
                />
            </div>
        </div>
    );
};

export default Input;
