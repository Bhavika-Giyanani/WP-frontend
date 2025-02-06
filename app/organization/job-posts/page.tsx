"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for job posts
const initialJobPosts = [
  { id: 1, jobNo: "JOB001", name: "Senior Stitching Expert", appliedCandidates: 15 },
  { id: 2, jobNo: "JOB002", name: "Boutique Manager", appliedCandidates: 8 },
  { id: 3, jobNo: "JOB003", name: "Fashion Designer", appliedCandidates: 22 },
  { id: 4, jobNo: "JOB004", name: "Textile Quality Analyst", appliedCandidates: 5 },
  { id: 5, jobNo: "JOB005", name: "Embroidery Specialist", appliedCandidates: 12 },
]

export default function OrganizationJobPosts() {
  const [jobPosts, setJobPosts] = useState(initialJobPosts)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Your Job Posts</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of your job posts and applications received</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Job No.</TableHead>
              <TableHead>Job Name</TableHead>
              <TableHead className="text-right">Applied Candidates</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobPosts.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.jobNo}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell className="text-right">{job.appliedCandidates}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/organization/job-posts/${job.id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

