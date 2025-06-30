"use client"

import { useState } from "react"
import ParentDashboard from "@/components/parent/parent-dashboard"
import ParentAttendance from "@/components/parent/parent-attendance"
import ParentGrades from "@/components/parent/parent-grades"

export default function ParentSystem() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <ParentDashboard onNavigate={setCurrentPage} />
      case "parent-attendance":
        return <ParentAttendance onNavigate={setCurrentPage} />
      case "parent-grades":
        return <ParentGrades onNavigate={setCurrentPage} />
      default:
        return <ParentDashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  )
}
