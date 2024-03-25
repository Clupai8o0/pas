"use client";

import { Dispatch, SetStateAction } from "react";

import useMediaQuery from "@/hooks/use-media-query";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";


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
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
	  return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent className="bg-neutral-900 flex flex-col max-w-2xl">
					<div className="p-4 bg-neutral-900 rounded-t-[10px] flex-1">
						<div className="max-w-xl w-full mx-auto text-white">
							<DialogTitle className="font-normal mb-4 text-2xl uppercase">
								{title}
							</DialogTitle>
						</div>
						<ScrollArea className="text-white h-[60vh] w-full border p-4">
							{content}
						</ScrollArea>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<DrawerContent className="bg-neutral-900 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
				<div className="p-4 bg-neutral-900 rounded-t-[10px] flex-1">
					<div className="max-w-xl w-full mx-auto text-white">
						<DrawerTitle className="font-normal mb-4 text-2xl uppercase">
							{title}
						</DrawerTitle>
					</div>
					<ScrollArea className="text-white h-[80vh] w-full border p-4">
						{content}
					</ScrollArea>
				</div>
			</DrawerContent>
		</Drawer>
	);

	// return (
	// <Drawer.Root shouldScaleBackground open={open} onOpenChange={setOpen}>
	// 	<Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
	// 	<Drawer.Portal>
	// 		<Drawer.Overlay className="fixed inset-0 bg-black/40" />

	// 	</Drawer.Portal>
	// </Drawer.Root>
	// );
}
