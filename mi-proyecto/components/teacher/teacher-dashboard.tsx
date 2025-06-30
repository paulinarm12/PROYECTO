"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  ClipboardList,
  UserCheck,
  AlertTriangle,
  Calendar,
  BookOpen,
  LogOut,
  ChevronRight,
} from "lucide-react"

interface TeacherDashboardProps {
  onNavigate: (page: string) => void
}

export default function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  const currentTime = new Date()

  // Datos simulados del docente
  const teacherInfo = {
    name: "Prof. María Elena García López",
    employeeId: "CA-GALM850315-A7B",
    type: "Titular",
    subjects: ["Matemáticas", "Geometría", "Álgebra"],
    groups: ["1°A", "2°B", "3°A"],
    totalStudents: 87,
  }

  const todaySchedule = [
    { time: "08:00 - 08:50", subject: "Matemáticas", group: "1°A", room: "Aula 101" },
    { time: "08:50 - 09:40", subject: "Álgebra", group: "3°A", room: "Aula 203" },
    { time: "10:00 - 10:50", subject: "Geometría", group: "2°B", room: "Aula 105" },
    { time: "10:50 - 11:40", subject: "Matemáticas", group: "1°A", room: "Aula 101" },
  ]

  const quickStats = [
    { title: "Estudiantes Totales", value: "87", icon: Users, color: "bg-blue-500" },
    { title: "Grupos Asignados", value: "3", icon: GraduationCap, color: "bg-green-500" },
    { title: "Materias", value: "3", icon: BookOpen, color: "bg-purple-500" },
    { title: "Incidencias Pendientes", value: "2", icon: AlertTriangle, color: "bg-orange-500" },
  ]

  const recentNotifications = [
    {
      id: 1,
      message: "Período de captura de calificaciones finaliza en 2 días",
      type: "warning",
      time: "Hace 1 hora",
    },
    {
      id: 2,
      message: "Nueva incidencia registrada - Alumno: Juan Pérez",
      type: "info",
      time: "Hace 3 horas",
    },
  ]

  const navigateTo = (path: string) => {
    window.location.href = path
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Portal Docente</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {teacherInfo.type}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Bienvenido, {teacherInfo.name.split(" ")[1]} {teacherInfo.name.split(" ")[2]}!
          </h1>
          <p className="text-gray-600 mt-2">
            {currentTime.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Accede rápidamente a las funciones principales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 flex-col items-start space-y-2 bg-transparent"
                    onClick={() => onNavigate("grades")} 
                  >
                    <div className="flex items-center space-x-2 self-stretch">
                      <ClipboardList className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Registrar Calificaciones</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </div>
                    <p className="text-xs text-gray-500 text-left">Captura de calificaciones finales por materia</p>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 flex-col items-start space-y-2 bg-transparent"
                    onClick={() => onNavigate("attendance")} 
                  >
                    <div className="flex items-center space-x-2 self-stretch">
                      <UserCheck className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Registrar Asistencia</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </div>
                    <p className="text-xs text-gray-500 text-left">Control de asistencia por clase</p>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 flex-col items-start space-y-2 bg-transparent"
                    onClick={() => onNavigate("incidents")} 
                  >
                    <div className="flex items-center space-x-2 self-stretch">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <span className="font-medium">Registrar Incidencia</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </div>
                    <p className="text-xs text-gray-500 text-left">Reportar comportamiento de estudiantes</p>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 flex-col items-start space-y-2 bg-transparent"
                    onClick={() => onNavigate("schedule")} 
                  >
                    <div className="flex items-center space-x-2 self-stretch">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Ver Horarios</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </div>
                    <p className="text-xs text-gray-500 text-left">Consultar horarios y materias asignadas</p>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subjects and Groups */}
            <Card>
              <CardHeader>
                <CardTitle>Mis Asignaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Materias</h4>
                  <div className="space-y-1">
                    {teacherInfo.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 mr-1">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Grupos</h4>
                  <div className="space-y-1">
                    {teacherInfo.groups.map((group, index) => (
                      <Badge key={index} variant="secondary" className="mr-1">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}