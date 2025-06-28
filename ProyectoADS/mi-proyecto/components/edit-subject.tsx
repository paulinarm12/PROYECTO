"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  BookOpen,
  Wrench,
  Shield,
  User,
  Clock,
  Save,
  AlertCircle,
  Calendar,
  GraduationCap,
  Settings,
  X,
  Plus,
} from "lucide-react"

interface EditSubjectProps {
  type: "subject" | "workshop"
  subjectId?: string
}

export default function EditSubject({ type = "subject", subjectId = "mat" }: EditSubjectProps) {
  const [formData, setFormData] = useState({
    name: type === "subject" ? "Matemáticas" : "Taller de Computación",
    teacherId: type === "subject" ? "teacher1" : "teacher5",
    hoursPerWeek: type === "subject" ? 5 : 2,
    assignedGrades: ["1", "2"], // Cambiado de assignedGroups a assignedGrades
  })

  const [selectedSchedule, setSelectedSchedule] = useState({
    "1": [
      { day: "Lunes", time: "08:00-09:00" },
      { day: "Martes", time: "09:00-10:00" },
      { day: "Miércoles", time: "10:00-11:00" },
    ],
    "2": [
      { day: "Lunes", time: "09:00-10:00" },
      { day: "Martes", time: "10:00-11:00" },
      { day: "Jueves", time: "08:00-09:00" },
    ],
  })

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [editingGrade, setEditingGrade] = useState<string | null>(null)
  const [tempSchedule, setTempSchedule] = useState<{ day: string; time: string }[]>([])

  // Datos simulados
  const availableTeachers = [
    { id: "teacher1", name: "Prof. María García", specialties: ["Matemáticas", "Física"], status: "Titular" },
    { id: "teacher2", name: "Prof. Carlos López", specialties: ["Español", "Literatura"], status: "Titular" },
    { id: "teacher3", name: "Prof. Ana Martínez", specialties: ["Historia", "Geografía"], status: "Titular" },
    { id: "teacher4", name: "Prof. Roberto Silva", specialties: ["Ciencias", "Biología"], status: "Titular" },
    { id: "teacher5", name: "Prof. Laura Tech", specialties: ["Computación", "Tecnología"], status: "Titular" },
    { id: "teacher6", name: "Prof. Diego Music", specialties: ["Música", "Arte"], status: "Suplente" },
  ]

  // Cambiado de allGroups a allGrades
  const allGrades = [
    { id: "1", name: "1° Grado", groups: ["1° A", "1° B"], totalStudents: 58 },
    { id: "2", name: "2° Grado", groups: ["2° A", "2° B"], totalStudents: 56 },
    { id: "3", name: "3° Grado", groups: ["3° A", "3° B"], totalStudents: 54 },
  ]

  const timeSlots = ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00"]
  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  const currentTeacher = availableTeachers.find((t) => t.id === formData.teacherId)
  const isWorkshop = type === "workshop"

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Cambiado de handleGroupAssignment a handleGradeAssignment
  const handleGradeAssignment = (gradeId: string, assigned: boolean) => {
    setFormData((prev) => ({
      ...prev,
      assignedGrades: assigned ? [...prev.assignedGrades, gradeId] : prev.assignedGrades.filter((id) => id !== gradeId),
    }))
  }

  // Cambiado de openScheduleModal para trabajar con grados
  const openScheduleModal = (gradeId: string) => {
    setEditingGrade(gradeId)
    setTempSchedule([...(selectedSchedule[gradeId as keyof typeof selectedSchedule] || [])])
    setIsScheduleModalOpen(true)
  }

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false)
    setEditingGrade(null)
    setTempSchedule([])
  }

  const addScheduleSlot = () => {
    setTempSchedule((prev) => [...prev, { day: "Lunes", time: "08:00-09:00" }])
  }

  const removeScheduleSlot = (index: number) => {
    setTempSchedule((prev) => prev.filter((_, i) => i !== index))
  }

  const updateScheduleSlot = (index: number, field: "day" | "time", value: string) => {
    setTempSchedule((prev) => prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)))
  }

  const saveScheduleChanges = () => {
    if (editingGrade) {
      setSelectedSchedule((prev) => ({
        ...prev,
        [editingGrade]: [...tempSchedule],
      }))
    }
    closeScheduleModal()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando cambios:", formData, selectedSchedule)
  }

  const getTeacherWorkload = (teacherId: string) => {
    const workloads: { [key: string]: number } = {
      teacher1: 20,
      teacher2: 18,
      teacher3: 15,
      teacher4: 22,
      teacher5: 12,
      teacher6: 8,
    }
    return workloads[teacherId] || 0
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/manage-groups">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Gestión de Grupos
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Administrador
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            {isWorkshop ? (
              <Wrench className="w-8 h-8 mr-3 text-purple-600" />
            ) : (
              <BookOpen className="w-8 h-8 mr-3 text-green-600" />
            )}
            Editar {isWorkshop ? "Taller" : "Materia"}
          </h1>
          <p className="text-gray-600">Modificar información y configuración de {isWorkshop ? "taller" : "materia"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información General */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  Información General
                </CardTitle>
                <CardDescription>Datos básicos de la {isWorkshop ? "taller" : "materia"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la {isWorkshop ? "Taller" : "Materia"} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={`Ingrese el nombre de la ${isWorkshop ? "taller" : "materia"}`}
                    required
                  />
                </div>

                {!isWorkshop && (
                  <div className="space-y-2">
                    <Label htmlFor="hours">Horas por Semana *</Label>
                    <Select
                      value={formData.hoursPerWeek.toString()}
                      onValueChange={(value) => handleInputChange("hoursPerWeek", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 horas</SelectItem>
                        <SelectItem value="3">3 horas</SelectItem>
                        <SelectItem value="4">4 horas</SelectItem>
                        <SelectItem value="5">5 horas</SelectItem>
                        <SelectItem value="6">6 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {isWorkshop && (
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700">
                      <strong>Nota:</strong> Los talleres tienen 2 horas por semana y no son seriados entre grados.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Asignación de Profesor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Profesor Asignado
                </CardTitle>
                <CardDescription>Seleccionar docente responsable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher">Profesor *</Label>
                  <Select value={formData.teacherId} onValueChange={(value) => handleInputChange("teacherId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar profesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTeachers
                        .filter((teacher) => {
                          // Filtrar profesores según el tipo
                          if (isWorkshop) {
                            return teacher.specialties.some(
                              (s) =>
                                s.toLowerCase().includes("computación") ||
                                s.toLowerCase().includes("tecnología") ||
                                s.toLowerCase().includes("música") ||
                                s.toLowerCase().includes("arte"),
                            )
                          }
                          return !teacher.specialties.some(
                            (s) =>
                              s.toLowerCase().includes("computación") ||
                              s.toLowerCase().includes("música") ||
                              s.toLowerCase().includes("arte"),
                          )
                        })
                        .map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{teacher.name}</span>
                              <Badge variant={teacher.status === "Titular" ? "default" : "secondary"} className="ml-2">
                                {teacher.status}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {currentTeacher && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Información del Profesor</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Especialidades:</span>
                        <span className="text-blue-900">{currentTeacher.specialties.join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Carga actual:</span>
                        <span className="text-blue-900">{getTeacherWorkload(currentTeacher.id)} horas/semana</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Tipo:</span>
                        <Badge
                          className={
                            currentTeacher.status === "Titular"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {currentTeacher.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Asignación de Grados - SECCIÓN MODIFICADA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                Grados Escolares Asignados
              </CardTitle>
              <CardDescription>
                Seleccionar los grados donde se impartirá la {isWorkshop ? "taller" : "materia"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allGrades.map((grade) => (
                  <div
                    key={grade.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={grade.id}
                      checked={formData.assignedGrades.includes(grade.id)}
                      onCheckedChange={(checked) => handleGradeAssignment(grade.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={grade.id} className="font-medium text-lg">
                        {grade.name}
                      </Label>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>Grupos: {grade.groups.join(", ")}</p>
                        <p>{grade.totalStudents} estudiantes total</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isWorkshop && (
                <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-700">
                    <strong>Talleres:</strong> Cada grado tiene 3 talleres disponibles que no son seriados. Los
                    estudiantes pueden elegir cualquier taller independientemente del grado anterior.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Horarios por Grado - SECCIÓN MODIFICADA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-600" />
                Horarios por Grado
              </CardTitle>
              <CardDescription>Horarios actuales por grado escolar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formData.assignedGrades.map((gradeId) => {
                  const grade = allGrades.find((g) => g.id === gradeId)
                  const schedules = selectedSchedule[gradeId as keyof typeof selectedSchedule] || []

                  return (
                    <div key={gradeId} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {grade?.name}
                        </h4>
                        <Button type="button" variant="outline" size="sm" onClick={() => openScheduleModal(gradeId)}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Configurar Horario
                        </Button>
                      </div>

                      <div className="mb-3 text-sm text-gray-600">
                        <p>Aplica para: {grade?.groups.join(" y ")}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {schedules.map((schedule, index) => (
                          <Badge key={index} variant="outline" className="justify-center p-2">
                            {schedule.day} {schedule.time}
                          </Badge>
                        ))}
                        {schedules.length === 0 && (
                          <div className="col-span-full text-center text-gray-500 py-4">
                            No hay horarios asignados para este grado
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Información Importante */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-amber-800">Información Importante</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Los horarios se aplicarán a todos los grupos del grado seleccionado</li>
                    <li>• Verificar disponibilidad del profesor antes de guardar</li>
                    <li>• Los estudiantes serán notificados de los cambios automáticamente</li>
                    <li>• Evitar conflictos de horarios entre materias del mismo grado</li>
                    <li>
                      •{" "}
                      {isWorkshop
                        ? "Los talleres no requieren continuidad entre grados"
                        : "Las materias generales siguen la progresión por grados"}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button
              type="submit"
              className={isWorkshop ? "bg-purple-600 hover:bg-purple-700" : "bg-green-600 hover:bg-green-700"}
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </form>

        {/* Modal de Modificar Horario - MODIFICADO */}
        {isScheduleModalOpen && editingGrade && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-orange-600" />
                    Configurar Horario - {allGrades.find((g) => g.id === editingGrade)?.name}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeScheduleModal}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">
                        Configure los horarios para la {isWorkshop ? "taller" : "materia"}{" "}
                        <strong>{formData.name}</strong>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Este horario se aplicará a todos los grupos del grado seleccionado
                      </p>
                    </div>
                    <Button type="button" onClick={addScheduleSlot} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Horario
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Día de la Semana</TableHead>
                          <TableHead>Horario</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tempSchedule.map((schedule, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Select
                                value={schedule.day}
                                onValueChange={(value) => updateScheduleSlot(index, "day", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {weekDays.map((day) => (
                                    <SelectItem key={day} value={day}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={schedule.time}
                                onValueChange={(value) => updateScheduleSlot(index, "time", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeScheduleSlot(index)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {tempSchedule.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                              No hay horarios configurados. Haga clic en "Agregar Horario" para comenzar.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-gray-600">{tempSchedule.length} horario(s) configurado(s)</div>
                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={closeScheduleModal}>
                        Cancelar
                      </Button>
                      <Button onClick={saveScheduleChanges} className="bg-orange-600 hover:bg-orange-700">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Horarios
                      </Button>
                    </div>
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
