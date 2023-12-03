import Key from "@/components/Key";
import HeroText from "@/components/HeroText";

export default function Home() {
	return (
		<>
			{/* HERO */}
			<section className="relative w-full h-[500px]">
				<div className="absolute w-full h-full top-0 left-0 polka" />

				<div className="text-white title absolute w-full h-[500px] top-0 left-0">
					<HeroText
						ogText="SIMPLE"
						className="top-[10%] left-[12%]"
						delay={1}
					/>
					<HeroText
						ogText="SAFE"
						className="top-[40%] lg:top-[30%] left-[50%] lg:left-[60%]"
						delay={1.2}
					/>
					<HeroText
						ogText="SECURE"
						className="top-[70%] lg:top-[60%] left-[20%]"
						delay={1.4}
					/>
				</div>

				<Key />
			</section>

			{/* DETAILS */}
			<section className="w-full border-t border-white flex flex-col md:flex-row text-white">
				<div className="w-full md:w-1/3 border-b border-r-0 md:border-r md:border-b-0 border-white p">
					<h1 className="heading">WHY PAS?</h1>
				</div>
				<div className="w-full md:w-2/3 p paragraph">
					<p>
						A password manager is an essential tool in today&apos;s digital age,
						providing a reliable solution to the ever-growing challenge of
						managing multiple passwords. By securely storing all your passwords
						in an encrypted database, it offers peace of mind knowing that your
						sensitive information remains protected from prying eyes and
						potential cyber threats.
					</p>
				</div>
			</section>
		</>
	);
}
