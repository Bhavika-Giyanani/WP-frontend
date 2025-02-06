"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, BuildingIcon } from "lucide-react";

// Mock data for events
const initialEvents = [
  {
    id: 1,
    name: "Women in Tech Conference",
    organization: "TechCorp",
    date: "2023-08-15",
    location: "Virtual",
    description:
      "Join us for a day of inspiring talks and networking opportunities in the tech industry.",
  },
  {
    id: 2,
    name: "Fashion Design Workshop",
    organization: "StyleHouse",
    date: "2023-09-01",
    location: "New York City",
    description:
      "Learn the latest trends and techniques in fashion design from industry experts.",
  },
  {
    id: 3,
    name: "Women's Leadership Summit",
    organization: "LeadHER",
    date: "2023-09-15",
    location: "Chicago",
    description:
      "Develop your leadership skills and connect with successful women leaders across industries.",
  },
  {
    id: 4,
    name: "Entrepreneurship Bootcamp",
    organization: "StartupWomen",
    date: "2023-10-01",
    location: "San Francisco",
    description:
      "An intensive program to help women entrepreneurs launch and grow their businesses.",
  },
];

export default function WomenEventsPage() {
  const [events, setEvents] = useState(initialEvents);

  const handleRSVP = (eventId: number) => {
    // Here you would typically handle the RSVP logic
    console.log(`RSVP for event ${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{event.name}</CardTitle>
              <CardDescription className="flex items-center">
                <BuildingIcon className="w-4 h-4 mr-2" />
                {event.organization}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {event.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {event.location}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button onClick={() => handleRSVP(event.id)} className="w-full">
                RSVP
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
