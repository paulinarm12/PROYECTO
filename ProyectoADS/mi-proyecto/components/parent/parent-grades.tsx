"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, BookOpen, Download } from "lucide-react"
interface Props {
  onNavigate: (page: string) => void
}

export default function ParentGrades({ onNavigate }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-2025")

  // Datos simulados del estudiante
  const studentInfo = {
    name: "Carlos Martínez Silva",
    studentId: "B20241235",
    group: "1°A",
    grade: "Primer Grado",
  }

  const periods = [
    { id: "2024-2025", name: "Ciclo Escolar 2024-2025" },
    { id: "2023-2024", name: "Ciclo Escolar 2023-2024" },
  ]

  const grades = [
    {
      id: "1",
      subject: "Matemáticas",
      teacher: "Prof. María García",
      finalGrade: 85,
      period: "2024-2025",
      evaluations: [
        { name: "Primer Parcial", grade: 82, weight: 25 },
        { name: "Segundo Parcial", grade: 88, weight: 25 },
        { name: "Tercer Parcial", grade: 85, weight: 25 },
        { name: "Examen Final", grade: 85, weight: 25 },
      ],
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      subject: "Español",
      teacher: "Prof. Ana Rodríguez",
      finalGrade: 92,
      period: "2024-2025",
      evaluations: [
        { name: "Primer Parcial", grade: 90, weight: 25 },
        { name: "Segundo Parcial", grade: 94, weight: 25 },
        { name: "Tercer Parcial", grade: 92, weight: 25 },
        { name: "Examen Final", grade: 92, weight: 25 },
      ],
      lastUpdated: "2024-01-14",
    },
    {
      id: "3",
      subject: "Ciencias Naturales",
      teacher: "Prof. Luis Silva",
      finalGrade: 78,
      period: "2024-2025",
      evaluations: [
        { name: "Primer Parcial", grade: 75, weight: 25 },
        { name: "Segundo Parcial", grade: 80, weight: 25 },
        { name: "Tercer Parcial", grade: 78, weight: 25 },
        { name: "Examen Final", grade: 79, weight: 25 },
      ],
      lastUpdated: "2024-01-13",
    },
    {
      id: "4",
      subject: "Historia",
      teacher: "Prof. Carmen Martínez",
      finalGrade: 88,
      period: "2024-2025",
      evaluations: [
        { name: "Primer Parcial", grade: 85, weight: 25 },
        { name: "Segundo Parcial", grade: 90, weight: 25 },
        { name: "Tercer Parcial", grade: 88, weight: 25 },
        { name: "Examen Final", grade: 89, weight: 25 },
      ],
      lastUpdated: "2024-01-12",
    },
    {
      id: "5",
      subject: "Inglés",
      teacher: "Prof. Robert Wilson",
      finalGrade: 90,
      period: "2024-2025",
      evaluations: [
        { name: "Primer Parcial", grade: 88, weight: 25 },
        { name: "Segundo Parcial", grade: 92, weight: 25 },
        { name: "Tercer Parcial", grade: 90, weight: 25 },
        { name: "Examen Final", grade: 90, weight: 25 },
      ],
      lastUpdated: "2024-01-11",
    },
    {
      id: "6",
      subject: "Educación Física",
      teacher: "Prof. Diego López",
      finalGrade: 95,
      period: "2024-2025",
      evaluations: [
        { name: "Primer Parcial", grade: 95, weight: 25 },
        { name: "Segundo Parcial", grade: 95, weight: 25 },
        { name: "Tercer Parcial", grade: 95, weight: 25 },
        { name: "Examen Final", grade: 95, weight: 25 },
      ],
      lastUpdated: "2024-01-10",
    },
  ]

  const filteredGrades = grades.filter((grade) => grade.period === selectedPeriod)

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "bg-green-100 text-green-800"
    if (grade >= 80) return "bg-blue-100 text-blue-800"
    if (grade >= 70) return "bg-yellow-100 text-yellow-800"
    if (grade >= 60) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getGradeStatus = (grade: number) => {
    if (grade >= 90) return "Excelente"
    if (grade >= 80) return "Muy Bueno"
    if (grade >= 70) return "Bueno"
    if (grade >= 60) return "Suficiente"
    return "Insuficiente"
  }

  const calculateAverage = () => {
    if (filteredGrades.length === 0) return 0
    const sum = filteredGrades.reduce((acc, grade) => acc + grade.finalGrade, 0)
    return (sum / filteredGrades.length).toFixed(1)
  }

  const getAverageStatus = () => {
    const avg = Number.parseFloat(calculateAverage())
    return getGradeStatus(avg)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              onClick={() => onNavigate("dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <BookOpen className="w-3 h-3 mr-1" />
              Consulta de Calificaciones
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Boleta
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Calificaciones de {studentInfo.name}</h1>
          <p className="text-gray-600">
            Consulta las calificaciones por materia y período evaluado - {studentInfo.studentId} ({studentInfo.group})
          </p>
        </div>

        {/* Period Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Promedio General</p>
                  <p className="text-2xl font-bold text-gray-900">{calculateAverage()}</p>
                  <p className="text-xs text-gray-500">{getAverageStatus()}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Materias Cursadas</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredGrades.length}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Materias Aprobadas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredGrades.filter((g) => g.finalGrade >= 60).length}
                  </p>
                  <p className="text-xs text-gray-500">≥ 60 puntos</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Calificación Más Alta</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.max(...filteredGrades.map((g) => g.finalGrade))}
                  </p>
                  <p className="text-xs text-gray-500">
                    {
                      filteredGrades.find((g) => g.finalGrade === Math.max(...filteredGrades.map((g) => g.finalGrade)))
                        ?.subject
                    }
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Calificaciones por Materia</CardTitle>
            <CardDescription>
              Período: {periods.find((p) => p.id === selectedPeriod)?.name} - {filteredGrades.length} materias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Materia</TableHead>
                    <TableHead>Profesor</TableHead>
                    <TableHead>Calificación Final</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <div className="font-medium">{grade.subject}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">{grade.teacher}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getGradeColor(grade.finalGrade)} font-bold text-lg px-3 py-1`}>
                            {grade.finalGrade}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(grade.finalGrade)}>{getGradeStatus(grade.finalGrade)}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Sistema de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Escala de Calificaciones</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">90-100</Badge>
                    <span>Excelente</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">80-89</Badge>
                    <span>Muy Bueno</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge className="bg-yellow-100 text-yellow-800">70-79</Badge>
                    <span>Bueno</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge className="bg-orange-100 text-orange-800">60-69</Badge>
                    <span>Suficiente</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge className="bg-red-100 text-red-800">0-59</Badge>
                    <span>Insuficiente</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Notas Importantes</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Las calificaciones se actualizan en tiempo real cuando los docentes las registran.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>La calificación mínima aprobatoria es de 60 puntos.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Puede exportar la boleta de calificaciones en formato PDF.</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}