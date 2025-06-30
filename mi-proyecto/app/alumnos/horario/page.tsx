"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, GraduationCap } from "lucide-react"
import Link from "next/link"

interface ClaseHorario {
  hora: string
  lunes?: { materia: string; docente: string; salon: string }
  martes?: { materia: string; docente: string; salon: string }
  miercoles?: { materia: string; docente: string; salon: string }
  jueves?: { materia: string; docente: string; salon: string }
  viernes?: { materia: string; docente: string; salon: string }
}

export default function HorarioPage() {
  const studentData = {
    boleta: "B20241234",
    nombre: "Juan Pérez Martínez",
    grado: "2°",
    grupo: "A",
    cicloEscolar: "2024-2025",
  }

  const horario: ClaseHorario[] = [
    {
      hora: "8:00 - 8:50",
      lunes: { materia: "Matemáticas", docente: "Prof. García López", salon: "Aula 201" },
      martes: { materia: "Español", docente: "Prof. Martínez Ruiz", salon: "Aula 203" },
      miercoles: { materia: "Historia", docente: "Prof. Hernández Silva", salon: "Aula 205" },
      jueves: { materia: "Ciencias Naturales", docente: "Prof. Rodríguez Pérez", salon: "Lab. 101" },
      viernes: { materia: "Inglés", docente: "Prof. Johnson Smith", salon: "Aula 207" },
    },
    {
      hora: "8:50 - 9:40",
      lunes: { materia: "Español", docente: "Prof. Martínez Ruiz", salon: "Aula 203" },
      martes: { materia: "Matemáticas", docente: "Prof. García López", salon: "Aula 201" },
      miercoles: { materia: "Ciencias Naturales", docente: "Prof. Rodríguez Pérez", salon: "Lab. 101" },
      jueves: { materia: "Historia", docente: "Prof. Hernández Silva", salon: "Aula 205" },
      viernes: { materia: "Educación Física", docente: "Prof. López Torres", salon: "Gimnasio" },
    },
    {
      hora: "9:40 - 10:00",
      lunes: { materia: "RECESO", docente: "", salon: "" },
      martes: { materia: "RECESO", docente: "", salon: "" },
      miercoles: { materia: "RECESO", docente: "", salon: "" },
      jueves: { materia: "RECESO", docente: "", salon: "" },
      viernes: { materia: "RECESO", docente: "", salon: "" },
    },
    {
      hora: "10:00 - 10:50",
      lunes: { materia: "Historia", docente: "Prof. Hernández Silva", salon: "Aula 205" },
      martes: { materia: "Ciencias Naturales", docente: "Prof. Rodríguez Pérez", salon: "Lab. 101" },
      miercoles: { materia: "Inglés", docente: "Prof. Johnson Smith", salon: "Aula 207" },
      jueves: { materia: "Matemáticas", docente: "Prof. García López", salon: "Aula 201" },
      viernes: { materia: "Taller de Arte", docente: "Prof. Morales Vega", salon: "Taller 1" },
    },
    {
      hora: "10:50 - 11:40",
      lunes: { materia: "Ciencias Naturales", docente: "Prof. Rodríguez Pérez", salon: "Lab. 101" },
      martes: { materia: "Inglés", docente: "Prof. Johnson Smith", salon: "Aula 207" },
      miercoles: { materia: "Matemáticas", docente: "Prof. García López", salon: "Aula 201" },
      jueves: { materia: "Español", docente: "Prof. Martínez Ruiz", salon: "Aula 203" },
      viernes: { materia: "Historia", docente: "Prof. Hernández Silva", salon: "Aula 205" },
    },
    {
      hora: "11:40 - 12:30",
      lunes: { materia: "Inglés", docente: "Prof. Johnson Smith", salon: "Aula 207" },
      martes: { materia: "Educación Física", docente: "Prof. López Torres", salon: "Gimnasio" },
      miercoles: { materia: "Taller de Computación", docente: "Prof. Sánchez Díaz", salon: "Lab. Comp." },
      jueves: { materia: "Taller de Arte", docente: "Prof. Morales Vega", salon: "Taller 1" },
      viernes: { materia: "Ciencias Naturales", docente: "Prof. Rodríguez Pérez", salon: "Lab. 101" },
    },
    {
      hora: "12:30 - 13:20",
      lunes: { materia: "Educación Física", docente: "Prof. López Torres", salon: "Gimnasio" },
      martes: { materia: "Taller de Arte", docente: "Prof. Morales Vega", salon: "Taller 1" },
      miercoles: { materia: "Español", docente: "Prof. Martínez Ruiz", salon: "Aula 203" },
      jueves: { materia: "Taller de Computación", docente: "Prof. Sánchez Díaz", salon: "Lab. Comp." },
      viernes: { materia: "Matemáticas", docente: "Prof. García López", salon: "Aula 201" },
    },
    {
      hora: "13:20 - 14:00",
      lunes: { materia: "Taller de Computación", docente: "Prof. Sánchez Díaz", salon: "Lab. Comp." },
      martes: { materia: "Historia", docente: "Prof. Hernández Silva", salon: "Aula 205" },
      miercoles: { materia: "Educación Física", docente: "Prof. López Torres", salon: "Gimnasio" },
      jueves: { materia: "Inglés", docente: "Prof. Johnson Smith", salon: "Aula 207" },
      viernes: { materia: "Español", docente: "Prof. Martínez Ruiz", salon: "Aula 203" },
    },
  ]

  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"]
  const diasNombres = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  const getMateriaColor = (materia: string) => {
    if (materia === "RECESO") return "bg-gray-100 text-gray-600"
    if (materia.includes("Taller")) return "bg-purple-100 text-purple-800"
    if (materia === "Educación Física") return "bg-green-100 text-green-800"
    return "bg-blue-100 text-blue-800"
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
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Horario Semanal</h1>
                <p className="text-sm text-gray-500">{studentData.nombre}</p>
              </div>
            </div>
            <Badge variant="outline">{studentData.boleta}</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Información del Horario</span>
            </CardTitle>
            <CardDescription>
              Grado: {studentData.grado}
              {studentData.grupo} • Turno Matutino: 8:00 - 14:00 hrs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Materias Generales</p>
                <p className="text-2xl font-bold text-blue-600">6</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Talleres</p>
                <p className="text-2xl font-bold text-purple-600">3</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Horas por Día</p>
                <p className="text-2xl font-bold text-green-600">6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Table */}
        <Card>
          <CardHeader>
            <CardTitle>Horario de Clases</CardTitle>
            <CardDescription>Horario semanal con materias, docentes y salones asignados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-200 p-3 bg-gray-50 text-left font-medium text-gray-900 min-w-[120px]">
                      Horario
                    </th>
                    {diasNombres.map((dia) => (
                      <th
                        key={dia}
                        className="border border-gray-200 p-3 bg-gray-50 text-center font-medium text-gray-900 min-w-[180px]"
                      >
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horario.map((fila, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 p-3 bg-gray-50 font-medium text-gray-700">{fila.hora}</td>
                      {dias.map((dia) => {
                        const clase = fila[dia as keyof ClaseHorario] as
                          | { materia: string; docente: string; salon: string }
                          | undefined
                        return (
                          <td key={dia} className="border border-gray-200 p-3">
                            {clase ? (
                              <div className={`p-2 rounded-lg ${getMateriaColor(clase.materia)}`}>
                                <div className="font-medium text-sm">{clase.materia}</div>
                                {clase.docente && <div className="text-xs opacity-75 mt-1">{clase.docente}</div>}
                                {clase.salon && <div className="text-xs opacity-75">{clase.salon}</div>}
                              </div>
                            ) : (
                              <div className="text-gray-400 text-center">-</div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Leyenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 rounded"></div>
                <span className="text-sm">Materias Generales</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-100 rounded"></div>
                <span className="text-sm">Talleres</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span className="text-sm">Educación Física</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span className="text-sm">Receso</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
