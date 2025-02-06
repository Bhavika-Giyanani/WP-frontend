"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Trash2 } from "lucide-react"

// Dummy data
const initialUsers = [
  { id: 1, name: "Jane Doe", role: "Woman", registrationDate: "2023-06-01" },
  { id: 2, name: "FashionCo", role: "Organization", registrationDate: "2023-06-02" },
  { id: 3, name: "Alice Smith", role: "Woman", registrationDate: "2023-06-03" },
]

const initialJobs = [
  { id: 1, title: "Stitching Expert", company: "FashionCo", category: "Stitching Work" },
  { id: 2, title: "Boutique Manager", company: "ChicStyles", category: "Boutique Management" },
  { id: 3, title: "Bag Designer", company: "BagMasters", category: "Bag Making" },
]

const initialEvents = [
  { id: 1, title: "Women in Crafts Workshop", date: "2023-07-15" },
  { id: 2, title: "Entrepreneurship Seminar", date: "2023-08-01" },
]

export default function AdminDashboard() {
  const [users, setUsers] = useState(initialUsers)
  const [jobs, setJobs] = useState(initialJobs)
  const [events, setEvents] = useState(initialEvents)

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
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
            <CardTitle>Active Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{events.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {
                users.filter((user) => new Date(user.registrationDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                  .length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Registration Date</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="py-4">{user.name}</td>
                    <td className="py-4">{user.role}</td>
                    <td className="py-4">{user.registrationDate}</td>
                    <td className="py-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/users/${user.id}`}>
                          View <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Button asChild variant="link">
              <Link href="/admin/users">View All Users</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job & Event Moderation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...jobs, ...events].map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.company || item.date}</p>
                </div>
                <div className="space-x-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/${item.company ? "jobs" : "events"}/${item.id}`}>View</Link>
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-x-4">
            <Button asChild variant="link">
              <Link href="/admin/jobs">View All Jobs</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/admin/events">View All Events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

