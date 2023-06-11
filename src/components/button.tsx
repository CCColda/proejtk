import Link from "next/link";
import styles from "./button.module.scss";

export type ButtonPriority = "primary" | "secondary" | "tetriary";

type SharedButtonProps = {
	priority?: ButtonPriority,
	classes?: string[],
	title?: string,
}

export type ButtonProps = SharedButtonProps & {
	onClick: React.MouseEventHandler<HTMLButtonElement>,
	disabled?: boolean
};

export type LinkButtonProps = SharedButtonProps & {
	href: string
};


const makeStyles = (priority: ButtonPriority, classes?: string[]) =>
	[
		styles.button,
		styles[priority || "primary"],
		...(classes ?? [])
	].join(" ")

export const Button: React.FC<React.PropsWithChildren<ButtonProps>>
	= ({ children, priority, title, classes, disabled, onClick }) =>
		<button
			className={makeStyles(priority ?? "primary", classes)}
			onClick={onClick}
			title={title}
			disabled={disabled}>{children}</button>;

export const LinkButton: React.FC<React.PropsWithChildren<LinkButtonProps>>
	= ({ children, href, title, priority, classes }) =>
		<Link
			className={makeStyles(priority ?? "primary", classes)}
			title={title}
			href={href}>{children}</Link>;
