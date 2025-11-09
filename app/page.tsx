import ExploreBtn from "@/components/ExploreBtn";

export default function Home() {
	return (
		<section>
			<h1 className="text-center">The Hub for every Dev<br/>Event You Cannot miss</h1>
			<p className="text-center mt-5">Hackathons , Meetups and Conferences. <br/> All in one Place</p>
			<ExploreBtn />
			<div className="mt-20 space-y-7">
				<h3>Featured Events</h3>
				<ul className="events">{[1,2,3,4,5].map((event)=>(<li key={event}>Event {event}</li>))}</ul>
			</div>
		</section>
	);
}
