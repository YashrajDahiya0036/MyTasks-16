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
    try {
        const response = await fetch(`${baseUrl}/api/events`, {
            headers: { 
                'Content-Type': 'application/json' 
            },
            cache: 'no-store' // Ensure fresh data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { events } = await response.json();

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
                        {events.length > 0 ? (
                            events.map((event: IEvent) => (
                                <li key={event.title} className="list-none">
                                    <EventCard {...event} />
                                </li>
                            ))
                        ) : (
                            <li>No events found</li>
                        )}
                    </ul>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return (
            <section>
                <h1>Error</h1>
                <p>Failed to load events. Please try again later.</p>
            </section>
        );
    }
};

export default Page;
