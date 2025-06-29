"use client"

import { useState } from "react"
import TeacherDashboard from "@/components/teacher/teacher-dashboard"
import TeacherGrades from "@/components/teacher/teacher-grades"
import TeacherAttendance from "@/components/teacher/teacher-attendance"
import TeacherIncidents from "@/components/teacher/teacher-incidents"
import TeacherSchedule from "@/components/teacher/teacher-schedule"
import TeacherHelp from "@/components/teacher/teacher-help"

export default function TeacherSystem() {
    const [currentPage, setCurrentPage] = useState("dashboard")

    const renderPage = () => {
        switch (currentPage) {
            case "dashboard":
                return <TeacherDashboard onNavigate={setCurrentPage} />
            case "grades":
                return <TeacherGrades onNavigate={setCurrentPage} />
            case "attendance":
                return <TeacherAttendance onNavigate={setCurrentPage} />
            case "incidents":
                return <TeacherIncidents onNavigate={setCurrentPage} />
            case "schedule":
                return <TeacherSchedule onNavigate={setCurrentPage} />
            case "help":
                return <TeacherHelp onNavigate={setCurrentPage} />
            default:
                return <TeacherDashboard onNavigate={setCurrentPage} />
        }
    }
    
return (
    <div>
      {/* Navigation for demo purposes */}
      <div className="fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-lg border">
        <div className="flex space-x-2">

          <button
            onClick={() => setCurrentPage("help")}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded"
          >
            Ayuda
          </button>
        </div>
      </div>

      {renderPage()}
    </div>
)
}
