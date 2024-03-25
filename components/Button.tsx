"use client";

interface Props {
	primary?: boolean;
	border: "right" | "left" | "full" | "none";
	size: "large" | "normal" | "small";
	content: string | React.ReactNode;
	className?: string;
	type?: "submit" | "button";
	disabled?: boolean;
	onClick?: () => void;
}

const Button = ({
	primary,
	border,
	content,
	size,
	className,
	type,
	onClick,
	disabled
}: Props) => {
	return (
		<>
			<div hidden className="hidden small-btn normal-btn large-btn b-right b-left b-full b-none" />
			<button
				className={`btn ${
					primary && "primary-btn"
				} b-${border} ${size}-btn ${className}`}
				type={type ? type : "button"}
				onClick={() => {
					if (onClick) onClick();
				}}
				disabled={disabled}
			>
				{content}
			</button>
		</>
	);
};

export default Button;