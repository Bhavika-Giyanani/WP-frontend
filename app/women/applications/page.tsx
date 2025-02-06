"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for job applications
const initialApplications = [
  { id: 1, companyName: "FashionCo", jobName: "Senior Stitching Expert", status: "Applied" },
  { id: 2, companyName: "StyleBoutique", jobName: "Boutique Manager", status: "Under Review" },
  { id: 3, companyName: "DesignHouse", jobName: "Fashion Designer", status: "Hired" },
  { id: 4, companyName: "TextileTech", jobName: "Textile Quality Analyst", status: "Rejected" },
  { id: 5, companyName: "CraftWorks", jobName: "Embroidery Specialist", status: "Interview Scheduled" },
]

export default function WomenJobApplications() {
  const [applications, setApplications] = useState(initialApplications)

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Hired":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Your Job Applications</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of your job applications and their current status</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Applied Job</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.companyName}</TableCell>
                <TableCell>{application.jobName}</TableCell>
                <TableCell className="text-right">
                  <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

