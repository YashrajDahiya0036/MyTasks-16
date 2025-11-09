import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
	return (
		<header>
			<nav>
				<Link href="/" className="logo">
					<Image
						src="/icons/logo.png"
						alt="DevEventsHub Logo"
						width={24}
						height={24}
					/>
					<p>DevEventsHub</p>
				</Link>
				<ul>
					<Link href="/">Home</Link>
					<Link href="#about">Events</Link>
					<Link href="#contact">Create</Link>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
