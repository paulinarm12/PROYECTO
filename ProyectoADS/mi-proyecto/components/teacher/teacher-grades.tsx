"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save, Search, AlertCircle, CheckCircle, Users, BookOpen } from "lucide-react"

// 👇 NUEVO: Definir las props esperadas
interface Props {
  onNavigate: (page: string) => void
}

export default function TeacherGrades({ onNavigate }: Props) {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [grades, setGrades] = useState<{ [key: string]: string }>({})
  const [savedGrades, setSavedGrades] = useState<{ [key: string]: number }>({
    "1": 85,
    "2": 92,
    "6": 78,
  })

  const teacherSubjects = [
    { id: "math1", name: "Matemáticas", groups: ["1°A", "2°B", "3°C"] },
    { id: "algebra", name: "Álgebra", groups: ["3°A", "1°B"] },
    { id: "geometry", name: "Geometría", groups: ["2°B", "3°C"] },
  ]

  const students = [
    { id: "1", name: "Ana García López", studentId: "B20241234", group: "1°A" },
    { id: "2", name: "Carlos Martínez Silva", studentId: "B20241235", group: "1°A" },
    { id: "3", name: "Elena Rodríguez Pérez", studentId: "B20241236", group: "1°A" },
    { id: "4", name: "Diego Hernández Luna", studentId: "B20241237", group: "1°A" },
    { id: "5", name: "Sofía López Morales", studentId: "B20241238", group: "1°A" },
    { id: "6", name: "Andrés Castro Vega", studentId: "B20241239", group: "2°B" },
    { id: "7", name: "Valeria Flores Ruiz", studentId: "B20241240", group: "2°B" },
    { id: "8", name: "Roberto Jiménez Torres", studentId: "B20241241", group: "2°B" },
    { id: "9", name: "Isabella Mendoza Ríos", studentId: "B20241242", group: "3°C" },
    { id: "10", name: "Santiago Vargas Núñez", studentId: "B20241243", group: "3°C" },
    { id: "11", name: "Ximena Dávila Ortiz", studentId: "B20241244", group: "3°C" },
    { id: "12", name: "Leonardo Pérez Rocha", studentId: "B20241245", group: "1°B" },
    { id: "13", name: "Renata Soto Islas", studentId: "B20241246", group: "1°B" },
  ]

  const getAvailableGroups = () => {
    const subject = teacherSubjects.find((s) => s.id === selectedSubject)
    return subject ? subject.groups : []
  }

  const filteredStudents = students.filter((student) => {
    const matchesGroup = selectedGroup === "" || student.group === selectedGroup
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesGroup && matchesSearch
  })

  const handleGradeChange = (studentId: string, grade: string) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: grade,
    }))
  }

  const handleSaveGrades = () => {
    const newSavedGrades = { ...savedGrades }
    Object.entries(grades).forEach(([studentId, grade]) => {
      const numGrade = Number.parseFloat(grade)
      if (numGrade >= 0 && numGrade <= 100) {
        newSavedGrades[studentId] = numGrade
      }
    })
    setSavedGrades(newSavedGrades)
    setGrades({})
    alert("Calificaciones guardadas exitosamente")
  }

  const getGradeStatus = (grade: number) => {
    if (grade >= 90) return { status: "Excelente", color: "bg-green-100 text-green-800" }
    if (grade >= 80) return { status: "Muy Bueno", color: "bg-blue-100 text-blue-800" }
    if (grade >= 70) return { status: "Bueno", color: "bg-yellow-100 text-yellow-800" }
    if (grade >= 60) return { status: "Suficiente", color: "bg-orange-100 text-orange-800" }
    return { status: "Insuficiente", color: "bg-red-100 text-red-800" }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* 👇 BOTÓN ACTUALIZADO */}
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
              Registro de Calificaciones
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Registro de Calificaciones</h1>
          <p className="text-gray-600">Captura las calificaciones finales de tus estudiantes</p>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Materia y Grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Materia" />
                </SelectTrigger>
                <SelectContent>
                  {teacherSubjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGroup} onValueChange={setSelectedGroup} disabled={!selectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Grupo" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableGroups().map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de calificaciones */}
        {selectedSubject && selectedGroup && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>
                      Calificaciones - {teacherSubjects.find((s) => s.id === selectedSubject)?.name} ({selectedGroup})
                    </span>
                  </CardTitle>
                  <CardDescription>{filteredStudents.length} estudiantes</CardDescription>
                </div>
                <Button
                  onClick={handleSaveGrades}
                  disabled={Object.keys(grades).length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Calificaciones
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre del Estudiante</TableHead>
                      <TableHead>Boleta</TableHead>
                      <TableHead>Calificación Actual</TableHead>
                      <TableHead>Nueva Calificación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const currentGrade = savedGrades[student.id]
                      const newGrade = grades[student.id] || ""
                      const gradeStatus = getGradeStatus(currentGrade || 0)

                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="font-medium">{student.name}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">{student.studentId}</Badge>
                          </TableCell>
                          <TableCell>
                            {currentGrade ? (
                              <div className="flex items-center space-x-2">
                                <Badge className={`${gradeStatus.color} font-bold`}>{currentGrade}</Badge>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              </div>
                            ) : (
                              <Badge variant="secondary">Sin calificar</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={newGrade}
                              onChange={(e) => handleGradeChange(student.id, e.target.value)}
                              placeholder="0-100"
                              className="w-24 text-center"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instrucciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <span>Instrucciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Las calificaciones deben estar en un rango de 0 a 100 puntos.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Asegúrate de guardar los cambios antes de salir de la pantalla.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
