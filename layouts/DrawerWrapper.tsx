"use client";

import { Dispatch, SetStateAction } from "react";
import { Drawer } from "vaul";

interface Props {
	content: React.ReactNode;
	trigger: React.ReactNode;
	title: string;
	openState: {
		open: boolean;
		setOpen: Dispatch<SetStateAction<boolean>>;
	};
}

export default function DrawerWrapper({
	content,
	trigger,
	title,
	openState: { open, setOpen },
}: Props) {
	return (
		<Drawer.Root shouldScaleBackground open={open} onOpenChange={setOpen}>
			<Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content className="bg-stone-800 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
					<div className="p-4 bg-stone-800 rounded-t-[10px] flex-1">
						<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
						<div className="max-w-xl w-full mx-auto text-white">
							<Drawer.Title className="font-normal mb-4 text-2xl uppercase">
								{title}
							</Drawer.Title>
						</div>
						<div className="text-white overflow-y-auto no-scrollbar max-h-[75vh] w-full">
							{content}
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
