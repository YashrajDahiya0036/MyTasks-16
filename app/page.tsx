import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const getBaseUrl = () => {
	if (typeof window !== "undefined") return ""; // Use relative URL on client
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
	return "http://localhost:3000";
};

const Page = async () => {
	"use cache";
	cacheLife("hours");

	const baseUrl = getBaseUrl();
	const response = await fetch(`${baseUrl}/api/events`, {
		headers: { accept: "application/json" },
	});
	const { events } = await response.json();
	// const base =
	// 	(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
	// 	process.env.NEXT_PUBLIC_BASE_URL ||
	// 	"http://localhost:3000";

	// const res = await fetch(`${base}/api/events`, {
	// 	headers: { accept: "application/json" },
	// });
	// if (!res.ok) {
	// 	const body = await res.text();
	// 	console.error(
	// 		"Events fetch failed:",
	// 		res.status,
	// 		res.statusText,
	// 		body.slice(0, 200)
	// 	);
	// 	throw new Error(`Events fetch failed: ${res.status}`);
	// }
	// const { events } = await res.json();

	return (
		<section>
			<h1 className="text-center">
				The Hub for Every Dev <br /> Event You Cannot Miss
			</h1>
			<p className="text-center mt-5">
				Hackathons, Meetups, and Conferences, All in One Place
			</p>

			<ExploreBtn />

			<div className="mt-20 space-y-7">
				<h3>Featured Events</h3>

				<ul className="events" id="events">
					{events &&
						events.length > 0 &&
						events.map((event: IEvent) => (
							<li key={event.title} className="list-none">
								<EventCard {...event} />
							</li>
						))}
				</ul>
			</div>
		</section>
	);
};

export default Page;
