"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, ClipboardList, User, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // Student data directly available without login
  const studentData = {
    boleta: "B20241234",
    nombre: "Juan Pérez Martínez",
    grado: "2°",
    grupo: "A",
    cicloEscolar: "2024-2025",
  }

  const menuItems = [
    {
      title: "Calificaciones",
      description: "Consulta tus calificaciones por materia",
      icon: BookOpen,
      href: "/alumnos/calificaciones", // ← Ruta corregida
      color: "bg-blue-500",
    },
    {
      title: "Asistencias",
      description: "Revisa tu historial de asistencias",
      icon: Calendar,
      href: "/alumnos/asistencias", // ← Ruta corregida
      color: "bg-green-500",
    },
    {
      title: "Horario",
      description: "Consulta tu horario semanal",
      icon: ClipboardList,
      href: "/alumnos/horario", // ← Ruta corregida
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Sistema Académico</h1>
                <p className="text-sm text-gray-500">Portal del Estudiante</p>
              </div>
            </div>
            <Badge variant="outline">{studentData.boleta}</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">¡Bienvenido, {studentData.nombre}!</h2>
                  <p className="text-blue-100 mt-1">
                    Grado: {studentData.grado}{studentData.grupo} • Ciclo Escolar: {studentData.cicloEscolar}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Promedio General</p>
                  <p className="text-2xl font-bold text-green-600">8.5</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Asistencia</p>
                  <p className="text-2xl font-bold text-blue-600">95%</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Materias</p>
                  <p className="text-2xl font-bold text-purple-600">6</p>
                </div>
                <ClipboardList className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}