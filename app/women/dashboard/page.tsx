"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchJobs } from "@/app/utils/jobApi";
import { getAllEvents } from "@/app/utils/eventApi"

// Dummy data
const initialJobs = [
  {
    id: 1,
    title: "Stitching Expert",
    company: "FashionCo",
    category: "Stitching Work",
    type: "Remote",
  },
  {
    id: 2,
    title: "Boutique Manager",
    company: "ChicStyles",
    category: "Boutique Management",
    type: "In-office",
  },
  {
    id: 3,
    title: "Bag Designer",
    company: "BagMasters",
    category: "Bag Making",
    type: "Hybrid",
  },
];

const initialEvents = [
  {
    id: 1,
    title: "Women in Crafts Workshop",
    date: "2023-07-15",
    location: "Online",
  },
  {
    id: 2,
    title: "Entrepreneurship Seminar",
    date: "2023-08-01",
    location: "City Convention Center",
  },
];

export default function WomenDashboard() {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch jobs from the backend
  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobData = await fetchJobs();
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getJobs();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleApplyJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const applicationData = Object.fromEntries(formData);
    setAppliedJobs([...appliedJobs, { ...selectedJob, ...applicationData }]);
    setSelectedJob(null);
  };

  const handleRSVP = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rsvpData = Object.fromEntries(formData);
    console.log("RSVP submitted:", { ...selectedEvent, ...rsvpData });
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Women Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {jobs.map((job) => (
                <li key={job.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {job.company} - {job.category}
                    </p>
                  </div>
                  <Button onClick={() =>
                     setSelectedJob(job)
                  } size="sm">
                    Apply
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="link">
                <Link href="/women/jobs">View All Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event._id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedEvent(event)}
                    variant="outline"
                    size="sm"
                  >
                    RSVP
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="link">
                <Link href="/women/events">View All Events</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedJob && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Apply for {selectedJob.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleApplyJob} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" required />
              </div>
              <div>
                <Label htmlFor="resume">Resume</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  required
                />
              </div>
              <Button type="submit">Submit Application</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {selectedEvent && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>RSVP for {selectedEvent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRSVP} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <Button type="submit">Submit RSVP</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Applied Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {appliedJobs.length > 0 ? (
            <ul className="space-y-4">
              {appliedJobs.map((job, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {job.company} - {job.category}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Applied
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              You haven't applied to any jobs yet.
            </p>
          )}
          <div className="mt-4">
            <Button asChild variant="link">
              <Link href="/women/applications">View All Applications</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
