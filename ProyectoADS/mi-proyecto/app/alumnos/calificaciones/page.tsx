"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react"
import Link from "next/link"

interface Calificacion {
  materia: string
  docente: string
  calificacionFinal: number
  periodo: string
  status: "Aprobado" | "Reprobado"
}

export default function CalificacionesPage() {
  const studentData = {
    boleta: "B20241234",
    nombre: "Juan Pérez Martínez",
    grado: "2°",
    grupo: "A",
    cicloEscolar: "2024-2025",
  }

  const calificaciones: Calificacion[] = [
    {
      materia: "Matemáticas",
      docente: "Prof. García López",
      calificacionFinal: 8.5,
      periodo: "2024-2025",
      status: "Aprobado",
    },
    {
      materia: "Español",
      docente: "Prof. Martínez Ruiz",
      calificacionFinal: 9.2,
      periodo: "2024-2025",
      status: "Aprobado",
    },
    {
      materia: "Historia",
      docente: "Prof. Hernández Silva",
      calificacionFinal: 7.8,
      periodo: "2024-2025",
      status: "Aprobado",
    },
    {
      materia: "Ciencias Naturales",
      docente: "Prof. Rodríguez Pérez",
      calificacionFinal: 8.9,
      periodo: "2024-2025",
      status: "Aprobado",
    },
    {
      materia: "Inglés",
      docente: "Prof. Johnson Smith",
      calificacionFinal: 8.1,
      periodo: "2024-2025",
      status: "Aprobado",
    },
    {
      materia: "Educación Física",
      docente: "Prof. López Torres",
      calificacionFinal: 9.5,
      periodo: "2024-2025",
      status: "Aprobado",
    },
  ]

  const promedioGeneral = calificaciones.reduce((sum, cal) => sum + cal.calificacionFinal, 0) / calificaciones.length

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-green-600 bg-green-50"
    if (grade >= 8) return "text-blue-600 bg-blue-50"
    if (grade >= 7) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/alumnos/dashboard" className="flex items-center">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Regresar
                </Button>
              </Link>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Calificaciones</h1>
                <p className="text-sm text-gray-500">{studentData.nombre}</p>
              </div>
            </div>
            <Badge variant="outline">{studentData.boleta}</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Resumen Académico</span>
            </CardTitle>
            <CardDescription>
              Ciclo Escolar: {calificaciones[0]?.periodo} • Grado: {studentData.grado}
              {studentData.grupo}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-3xl font-bold text-blue-600">{promedioGeneral.toFixed(1)}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Materias Aprobadas</p>
                <p className="text-3xl font-bold text-green-600">
                  {calificaciones.filter((c) => c.status === "Aprobado").length}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total de Materias</p>
                <p className="text-3xl font-bold text-gray-600">{calificaciones.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Calificaciones por Materia</CardTitle>
            <CardDescription>Calificaciones finales del periodo actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Materia</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Docente</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Calificación</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {calificaciones.map((calificacion, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{calificacion.materia}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{calificacion.docente}</td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(calificacion.calificacionFinal)}`}
                        >
                          {calificacion.calificacionFinal.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge
                          variant={calificacion.status === "Aprobado" ? "default" : "destructive"}
                          className={calificacion.status === "Aprobado" ? "bg-green-100 text-green-800" : ""}
                        >
                          {calificacion.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}