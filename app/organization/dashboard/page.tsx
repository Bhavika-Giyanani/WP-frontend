"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { fetchJobs, createJob } from "@/app/utils/jobApi";
import { createEvent, getAllEvents } from "@/app/utils/eventApi";
import { getApplications } from "@/app/utils/appliedJobsApi";
import { getApplicantsForEvent } from "@/app/utils/registeredEventApi";

// Dummy data
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

export default function OrganizationDashboard() {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState(initialEvents);
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    loadJobs();
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
  const handleAddJob = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(e.target);
    const jobData = Object.fromEntries(formData);
    try {
      const newJob = await createJob(jobData);
      setJobs([...jobs, newJob]); // Update the jobs state with the new job
      setShowAddJobForm(false); // Hide the form after successful creation
    } catch (error) {
      console.error("Error creating job:", error);
    }
    setShowAddJobForm(false);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventData = Object.fromEntries(formData);

    try {
      const newEvent = await createEvent(eventData);
      setEvents([...events, { id: events.length + 1, ...newEvent }]);
      setShowAddEventForm(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const openJobModal = async (job) => {
    setSelectedJob(job);
    try {
      const jobApplicants = await getApplications(job._id); // Fetch applicants by job ID
      console.log("applicants are:", jobApplicants);

      // Filter applicants whose jobId matches the selected job, then extract only their names
      const filteredApplicants = jobApplicants
        .filter((applicant) => applicant.jobId._id === job._id) // Ensure jobId._id matches the selected job
        .map((applicant) => applicant.applicantName); // Extract only applicant names

      console.log("Filtered applicants:", filteredApplicants);

      setApplicants(filteredApplicants);
      setShowJobModal(true);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const closeJobModal = () => {
    setShowJobModal(false);
    setSelectedJob(null);
    setApplicants([]);
  };

  const openEventModal = async (event) => {
    setSelectedEvent(event);
    try {
      const eventRegistrations = await getApplicantsForEvent(event._id); // Fetch registrations for the selected event
      setRegistrations(eventRegistrations);
      setShowEventModal(true);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
    setRegistrations([]);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Organization Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Jobs Posted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{jobs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {jobs.filter((job) => job.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Events Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{events.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Quick Actions
        </h2>
        <div className="space-x-4">
          <Button onClick={() => setShowAddJobForm(true)}>Post a Job</Button>
          <Button onClick={() => setShowAddEventForm(true)} variant="outline">
            Create an Event
          </Button>
        </div>
      </div>

      <Button asChild className="mt-4">
        <Link href="/organization/job-posts">View All Job Posts</Link>
      </Button>

      {showAddJobForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddJob} className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required />
              </div>
              <div>
                <Label htmlFor="openings">Number of Openings</Label>
                <Input id="openings" name="openings" type="number" required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <select id="location" name="location" required>
                  <option value="Remote">Remote</option>
                  <option value="In-office">In-office</option>
                </select>
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" name="requirements" required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  defaultValue="active"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button type="submit">Post Job</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {showAddEventForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Name</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="description">Event Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" required />
              </div>
              <Button type="submit">Create Event</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {jobs.slice(0, 3).map((job) => (
                <li
                  key={job.id}
                  className="flex justify-between items-start space-x-4"
                >
                  <div className="w-3/4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {job.description} -{" "}
                      <span className="text-sm font-bold">{job.status}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Category:</strong> {job.category}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Requirements:</strong>{" "}
                      {job.requirements.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>openings:</strong> {job.openings}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Posted On:</strong>{" "}
                      {new Date(job.postedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => openJobModal(job)}
                    variant="outline"
                    size="sm"
                  >
                    View
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="link">
                <Link href="/organization/jobs">View All Jobs</Link>
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
                <li key={event.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </p>
                  </div>
                  <Button onClick={() => openEventModal(event)} variant="outline" size="sm">
                    View
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="link">
                <Link href="/organization/events">View All Events</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Modal for displaying job details and applicants */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>
            <p>
              <strong>Title:</strong> {selectedJob.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <p>
              <strong>Category:</strong> {selectedJob.category}
            </p>
            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>

            <h3 className="mt-4 font-semibold">Applicants</h3>
            <ul className="mt-2">
              {applicants.length > 0 ? (
                applicants.map((name, index) => (
                  <li
                    key={index}
                    className="py-1 text-gray-700 dark:text-gray-300"
                  >
                    {name}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No applicants yet.</p>
              )}
            </ul>

            <Button className="mt-4 w-full" onClick={closeJobModal}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Modal for displaying event details and registrations */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Category:</strong> {selectedEvent.category}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>

            <h3 className="mt-4 font-semibold">Registrations</h3>
            <ul className="mt-2">
              {registrations.length > 0 ? (
                registrations.map((registration) => (
                  <li key={registration.id} className="py-1 text-gray-700 dark:text-gray-300">{registration.name}</li>
                ))
              ) : (
                <p className="text-gray-500">No registrations yet.</p>
              )}
            </ul>

            <Button className="mt-4 w-full" onClick={closeEventModal}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
