"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

interface Asistencia {
  fecha: string
  estado: "Presente" | "Falta" | "Retardo" | "Justificada"
  materia: string
  docente: string
}

export default function AsistenciasPage() {
  const studentData = {
    boleta: "B20241234",
    nombre: "Juan Pérez Martínez",
    grado: "2°",
    grupo: "A",
    cicloEscolar: "2024-2025",
  }

  const asistencias: Asistencia[] = [
    { fecha: "2024-12-27", estado: "Presente", materia: "Matemáticas", docente: "Prof. García" },
    { fecha: "2024-12-27", estado: "Presente", materia: "Español", docente: "Prof. Martínez" },
    { fecha: "2024-12-27", estado: "Retardo", materia: "Historia", docente: "Prof. Hernández" },
    { fecha: "2024-12-27", estado: "Presente", materia: "Ciencias", docente: "Prof. Rodríguez" },
    { fecha: "2024-12-26", estado: "Presente", materia: "Matemáticas", docente: "Prof. García" },
    { fecha: "2024-12-26", estado: "Falta", materia: "Español", docente: "Prof. Martínez" },
    { fecha: "2024-12-26", estado: "Presente", materia: "Historia", docente: "Prof. Hernández" },
    { fecha: "2024-12-26", estado: "Presente", materia: "Ciencias", docente: "Prof. Rodríguez" },
    { fecha: "2024-12-25", estado: "Justificada", materia: "Matemáticas", docente: "Prof. García" },
    { fecha: "2024-12-25", estado: "Justificada", materia: "Español", docente: "Prof. Martínez" },
    { fecha: "2024-12-24", estado: "Presente", materia: "Inglés", docente: "Prof. Johnson" },
    { fecha: "2024-12-24", estado: "Presente", materia: "Ed. Física", docente: "Prof. López" },
  ]

  const totalClases = asistencias.length
  const presentes = asistencias.filter((a) => a.estado === "Presente").length
  const faltas = asistencias.filter((a) => a.estado === "Falta").length
  const retardos = asistencias.filter((a) => a.estado === "Retardo").length
  const justificadas = asistencias.filter((a) => a.estado === "Justificada").length
  const porcentajeAsistencia = (((presentes + justificadas) / totalClases) * 100).toFixed(1)

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "Presente":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Falta":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "Retardo":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Justificada":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Presente":
        return <Badge className="bg-green-100 text-green-800">Presente</Badge>
      case "Falta":
        return <Badge variant="destructive">Falta</Badge>
      case "Retardo":
        return <Badge className="bg-yellow-100 text-yellow-800">Retardo</Badge>
      case "Justificada":
        return <Badge className="bg-blue-100 text-blue-800">Justificada</Badge>
      default:
        return null
    }
  }

  // Agrupar asistencias por fecha
  const asistenciasPorFecha = asistencias.reduce(
    (acc, asistencia) => {
      if (!acc[asistencia.fecha]) {
        acc[asistencia.fecha] = []
      }
      acc[asistencia.fecha].push(asistencia)
      return acc
    },
    {} as Record<string, Asistencia[]>,
  )

  const fechasOrdenadas = Object.keys(asistenciasPorFecha).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

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
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Asistencias</h1>
                <p className="text-sm text-gray-500">{studentData.nombre}</p>
              </div>
            </div>
            <Badge variant="outline">{studentData.boleta}</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{porcentajeAsistencia}%</div>
              <div className="text-sm text-gray-600">Asistencia</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{presentes}</div>
              <div className="text-sm text-gray-600">Presentes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{faltas}</div>
              <div className="text-sm text-gray-600">Faltas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{retardos}</div>
              <div className="text-sm text-gray-600">Retardos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{justificadas}</div>
              <div className="text-sm text-gray-600">Justificadas</div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Asistencias</CardTitle>
            <CardDescription>Registro detallado de asistencias por fecha y materia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fechasOrdenadas.map((fecha) => (
                <div key={fecha} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <h3 className="font-medium text-gray-900">
                      {new Date(fecha).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                  </div>
                  <div className="grid gap-2">
                    {asistenciasPorFecha[fecha].map((asistencia, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(asistencia.estado)}
                          <div>
                            <div className="font-medium text-gray-900">{asistencia.materia}</div>
                            <div className="text-sm text-gray-500">{asistencia.docente}</div>
                          </div>
                        </div>
                        {getStatusBadge(asistencia.estado)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}