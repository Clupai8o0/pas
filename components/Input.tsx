import { font } from "@/lib/utils";

interface Props {
	// input values
	label: string;
	type: string;
	placeholder: string;
	className?: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;

	// Extra content
	children?: React.ReactNode;

	// error status
	error?: string;
}

const Input = ({
	label,
	children,
	placeholder,
	type,
	className,
	value,
	setValue,
	error,
}: Props) => {
	return (
		<div className="w-full relative">
			<label
				htmlFor={label}
				className={`block mb-2 text-lg font-normal text-white uppercase ${
					error && "text-red-500"
				}`}
			>
				{label}
			</label>
			<input
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={`border text-2xl block w-full p-2.5 bg-transparent border-stone-600 placeholder-gray-400 text-white focus:ring-white ${className} ${
					error && "border-red-500 placeholder-red-700 text-red-500"
				} ${className} ${
					(label === "password" || label === "re-type password" || label === "password (required)") &&
					type === "text" &&
					`${font.className} text-lg`
				}`}
				placeholder={placeholder}
			/>
			{error && (
				<span className="block text-lg font-normal text-red-500">{error}</span>
			)}
			{children}
		</div>
	);
};
export default Input;
