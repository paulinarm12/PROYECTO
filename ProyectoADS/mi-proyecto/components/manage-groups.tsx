"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  UsersRound,
  Shield,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Trash2,
  Calendar,
  BookOpen,
  Wrench,
  Clock,
  Users,
  X,
  Save,
  Search,
  Edit,
} from "lucide-react"

export default function ManageGroups() {
  const [selectedGroup, setSelectedGroup] = useState("1A")
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [isManageSubjectsModalOpen, setIsManageSubjectsModalOpen] = useState(false)
  const [isManageWorkshopsModalOpen, setIsManageWorkshopsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  // Datos simulados
  const groups = [
    { id: "1A", name: "1° A", grade: "1°", section: "A", students: 28 },
    { id: "1B", name: "1° B", grade: "1°", section: "B", students: 30 },
    { id: "2A", name: "2° A", grade: "2°", section: "A", students: 29 },
    { id: "2B", name: "2° B", grade: "2°", section: "B", students: 27 },
    { id: "3A", name: "3° A", grade: "3°", section: "A", students: 26 },
    { id: "3B", name: "3° B", grade: "3°", section: "B", students: 28 },
  ]

  const studentsInGroup = [
    { id: "B20241234", name: "Ethan Harper", boleta: "B20241234", status: "Activo" },
    { id: "B20241567", name: "Olivia Bennett", boleta: "B20241567", status: "Activo" },
    { id: "B20241890", name: "Noah Carter", boleta: "B20241890", status: "Activo" },
    { id: "B20242123", name: "Emma Rodriguez", boleta: "B20242123", status: "Activo" },
    { id: "B20242456", name: "Liam Foster", boleta: "B20242456", status: "Activo" },
  ]

  // Estudiantes disponibles por grado
  const availableStudents = {
    "1°": [
      { id: "B20241111", name: "Ana García", boleta: "B20241111", currentGroup: null },
      { id: "B20241222", name: "Carlos López", boleta: "B20241222", currentGroup: null },
      { id: "B20241333", name: "María Rodríguez", boleta: "B20241333", currentGroup: "1°B" },
      { id: "B20241444", name: "José Martínez", boleta: "B20241444", currentGroup: null },
    ],
    "2°": [
      { id: "B20232111", name: "Laura Hernández", boleta: "B20232111", currentGroup: null },
      { id: "B20232222", name: "Diego Pérez", boleta: "B20232222", currentGroup: "2°B" },
      { id: "B20232333", name: "Sofia González", boleta: "B20232333", currentGroup: null },
    ],
    "3°": [
      { id: "B20221111", name: "Roberto Silva", boleta: "B20221111", currentGroup: null },
      { id: "B20221222", name: "Carmen Torres", boleta: "B20221222", currentGroup: "3°B" },
    ],
  }

  const subjects = [
    { id: "mat", name: "Matemáticas", teacher: "Prof. García", hours: 5, active: true },
    { id: "esp", name: "Español", teacher: "Prof. López", hours: 5, active: true },
    { id: "hist", name: "Historia", teacher: "Prof. Martínez", hours: 3, active: true },
    { id: "geo", name: "Geografía", teacher: "Prof. Rodríguez", hours: 3, active: true },
    { id: "cien", name: "Ciencias", teacher: "Prof. Hernández", hours: 4, active: true },
    { id: "ing", name: "Inglés", teacher: "Prof. Wilson", hours: 4, active: true },
  ]

  const workshops = [
    { id: "comp", name: "Taller de Computación", teacher: "Prof. Tech", active: true },
    { id: "music", name: "Taller de Música", teacher: "Prof. Music", active: true },
    { id: "art", name: "Taller de Arte", teacher: "Prof. Art", active: false },
  ]

  const scheduleHours = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
  ]

  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  // Horario simulado
  const schedule = {
    "08:00 - 09:00": ["Matemáticas", "Español", "Historia", "Ciencias", "Inglés"],
    "09:00 - 10:00": ["Español", "Matemáticas", "Geografía", "Física", "Matemáticas"],
    "10:00 - 11:00": ["Historia", "Ciencias", "Matemáticas", "Español", "Educación Física"],
    "11:00 - 12:00": ["Ciencias", "Historia", "Inglés", "Matemáticas", "Taller"],
    "12:00 - 13:00": ["Geografía", "Inglés", "Educación Física", "Taller", "Historia"],
    "13:00 - 14:00": ["Taller", "Educación Física", "Taller", "Inglés", "Ciencias"],
  }

  const currentGroup = groups.find((g) => g.id === selectedGroup)
  const currentGroupIndex = groups.findIndex((g) => g.id === selectedGroup)
  const currentGrade = currentGroup?.grade || "1°"

  const navigateGroup = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentGroupIndex - 1 : currentGroupIndex + 1
    if (newIndex >= 0 && newIndex < groups.length) {
      setSelectedGroup(groups[newIndex].id)
    }
  }

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      Matemáticas: "bg-blue-100 text-blue-800",
      Español: "bg-green-100 text-green-800",
      Historia: "bg-purple-100 text-purple-800",
      Ciencias: "bg-orange-100 text-orange-800",
      Inglés: "bg-pink-100 text-pink-800",
      Geografía: "bg-yellow-100 text-yellow-800",
      Física: "bg-red-100 text-red-800",
      "Educación Física": "bg-indigo-100 text-indigo-800",
      Taller: "bg-gray-100 text-gray-800",
    }
    return colors[subject] || "bg-gray-100 text-gray-800"
  }

  const filteredAvailableStudents = availableStudents[currentGrade as keyof typeof availableStudents]?.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.boleta.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    setSelectedStudents((prev) => (checked ? [...prev, studentId] : prev.filter((id) => id !== studentId)))
  }

  const handleAddStudents = () => {
    console.log("Agregando estudiantes:", selectedStudents)
    setSelectedStudents([])
    setIsAddStudentModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="mb-4">
  <Link href="/admin">
    <Button variant="secondary">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Volver al Dashboard
    </Button>   
  </Link>
</div>
            <div className="h-6 w-px bg-gray-300" />
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Administrador
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              Limpiar Grupo
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Crear Grupo
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <UsersRound className="w-8 h-8 mr-3 text-blue-600" />
            Gestión de Grupos
          </h1>
          <p className="text-gray-600">Administrar grupos, estudiantes y horarios escolares</p>
        </div>

        {/* Group Selector */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Seleccionar Grupo</CardTitle>
                <CardDescription>Navega entre los diferentes grupos escolares</CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateGroup("prev")}
                  disabled={currentGroupIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentGroup?.name}</div>
                  <div className="text-sm text-gray-500">{currentGroup?.students} estudiantes</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateGroup("next")}
                  disabled={currentGroupIndex === groups.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students in Group */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Estudiantes en el Grupo
              </CardTitle>
              <CardDescription>Lista de alumnos asignados al grupo {currentGroup?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre del Estudiante</TableHead>
                        <TableHead>Boleta</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentsInGroup.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className="font-mono text-sm">{student.boleta}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Activo</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setIsAddStudentModalOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Agregar Estudiante
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Group Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas del Grupo</CardTitle>
              <CardDescription>Información general del grupo {currentGroup?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{currentGroup?.students}</div>
                    <div className="text-sm text-blue-700">Estudiantes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">6</div>
                    <div className="text-sm text-green-700">Materias</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-sm text-purple-700">Asistencia</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">8.2</div>
                    <div className="text-sm text-orange-700">Promedio</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Capacidad del grupo</span>
                    <span>{currentGroup?.students}/30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${((currentGroup?.students || 0) / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Group Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Horario del Grupo
            </CardTitle>
            <CardDescription>Horario semanal del grupo {currentGroup?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Horario</TableHead>
                      {weekDays.map((day) => (
                        <TableHead key={day} className="text-center">
                          {day}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduleHours.map((hour, hourIndex) => (
                      <TableRow key={hour}>
                        <TableCell className="font-medium text-sm">{hour}</TableCell>
                        {weekDays.map((day, dayIndex) => (
                          <TableCell key={`${hour}-${day}`} className="text-center p-2">
                            {schedule[hour as keyof typeof schedule] && (
                              <Badge
                                className={`text-xs ${getSubjectColor(schedule[hour as keyof typeof schedule][dayIndex])}`}
                              >
                                {schedule[hour as keyof typeof schedule][dayIndex]}
                              </Badge>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Generar Horario
                </Button>
                <Button
                  variant="outline"
                  className="bg-green-50 border-green-200 text-green-700"
                  onClick={() => setIsManageSubjectsModalOpen(true)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Gestionar Materias
                </Button>
                <Button
                  variant="outline"
                  className="bg-purple-50 border-purple-200 text-purple-700"
                  onClick={() => setIsManageWorkshopsModalOpen(true)}
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Gestionar Talleres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Modal para Agregar Estudiantes */}
        {isAddStudentModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <UserPlus className="w-6 h-6 mr-2 text-blue-600" />
                    Agregar Estudiantes al Grupo {currentGroup?.name}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAddStudentModalOpen(false)
                      setSelectedStudents([])
                      setSearchTerm("")
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar estudiantes por nombre o boleta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Grado: {currentGrade}
                    </Badge>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Seleccionar</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Boleta</TableHead>
                          <TableHead>Grupo Actual</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAvailableStudents?.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedStudents.includes(student.id)}
                                onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                                disabled={student.currentGroup !== null}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell className="font-mono text-sm">{student.boleta}</TableCell>
                            <TableCell>
                              {student.currentGroup ? (
                                <Badge variant="secondary">{student.currentGroup}</Badge>
                              ) : (
                                <Badge className="bg-green-100 text-green-800">Sin grupo</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  student.currentGroup ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
                                }
                              >
                                {student.currentGroup ? "Asignado" : "Disponible"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-gray-600">{selectedStudents.length} estudiante(s) seleccionado(s)</div>
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAddStudentModalOpen(false)
                          setSelectedStudents([])
                          setSearchTerm("")
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleAddStudents}
                        disabled={selectedStudents.length === 0}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Agregar Estudiantes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para Gestionar Materias */}
        {isManageSubjectsModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-green-600" />
                    Gestionar Materias del Grupo {currentGroup?.name}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsManageSubjectsModalOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <Card key={subject.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold text-lg">{subject.name}</h3>
                              <p className="text-sm text-gray-600">{subject.teacher}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Horas semanales</div>
                              <div className="font-semibold">{subject.hours}h</div>
                            </div>
                            <Badge
                              className={subject.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {subject.active ? "Activa" : "Inactiva"}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsManageSubjectsModalOpen(false)}>
                      Cerrar
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para Gestionar Talleres */}
        {isManageWorkshopsModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Wrench className="w-6 h-6 mr-2 text-purple-600" />
                    Gestionar Talleres del Grupo {currentGroup?.name}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsManageWorkshopsModalOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {workshops.map((workshop) => (
                    <Card key={workshop.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold text-lg">{workshop.name}</h3>
                              <p className="text-sm text-gray-600">{workshop.teacher}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge
                              className={workshop.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {workshop.active ? "Activo" : "Inactivo"}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsManageWorkshopsModalOpen(false)}>
                      Cerrar
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
