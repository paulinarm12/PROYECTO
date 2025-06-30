"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, ClipboardList, UserCheck, BookOpen, LogOut, ChevronRight } from "lucide-react"

interface TeacherDashboardProps {
  onNavigate: (page: string) => void
}

export default function ParentDashboard({ onNavigate }: TeacherDashboardProps) {
  const [currentTime] = useState(new Date())

  // Datos simulados del padre/tutor y estudiante
  const parentInfo = {
    name: "María Elena Rodríguez Pérez",
    relationship: "Madre",
    email: "maria.rodriguez@email.com",
    phone: "+52 55 1234-5678",
  }

  const studentInfo = {
    name: "Carlos Martínez Silva",
    studentId: "B20241235",
    group: "1°A",
    grade: "Primer Grado",
    status: "Activo",
    photo: "/placeholder.svg?height=80&width=80",
  }

  const quickStats = [
    { title: "Promedio General", value: "8.5", icon: BookOpen, color: "bg-blue-500", description: "Muy Bueno" },
    { title: "Asistencia", value: "95%", icon: UserCheck, color: "bg-green-500", description: "Excelente" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">Portal de Padres</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {parentInfo.relationship}
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
            ¡Bienvenido/a, {parentInfo.name.split(" ")[0]} {parentInfo.name.split(" ")[1]}!
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Estudiante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{studentInfo.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                      <div>
                        <strong>Boleta:</strong> {studentInfo.studentId}
                      </div>
                      <div>
                        <strong>Grupo:</strong> {studentInfo.group}
                      </div>
                      <div>
                        <strong>Grado:</strong> {studentInfo.grade}
                      </div>
                      <div>
                        <strong>Estado:</strong>{" "}
                        <Badge className="bg-green-100 text-green-800">{studentInfo.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.description}</p>
                      </div>
                      <div className={`p-2 rounded-full ${stat.color}`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Accede rápidamente a la información de tu hijo/a</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 flex-col items-start space-y-2 bg-transparent"
                    onClick={() => onNavigate("parent-grades")}
                  >
                    <div className="flex items-center space-x-2 self-stretch">
                      <ClipboardList className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Ver Calificaciones</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </div>
                    <p className="text-xs text-gray-500 text-left">Consultar calificaciones por materia</p>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4 flex-col items-start space-y-2 bg-transparent"
                    onClick={() => onNavigate("parent-attendance")}
                  >
                    <div className="flex items-center space-x-2 self-stretch">
                      <UserCheck className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Ver Asistencias</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </div>
                    <p className="text-xs text-gray-500 text-left">Consultar registro de asistencias</p>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Parent Info */}
            <Card>
              <CardHeader>
                <CardTitle>Mi Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-medium">{parentInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Parentesco</p>
                  <p className="font-medium">{parentInfo.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-sm">{parentInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium">{parentInfo.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}