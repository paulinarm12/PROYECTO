"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Save, CalendarIcon, Users, UserCheck, UserX, Clock, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Props {
  onNavigate: (page: string) => void
}

export default function TeacherAttendance({ onNavigate }: Props) {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState("")
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({})
  const [savedAttendance, setSavedAttendance] = useState<{ [key: string]: { [key: string]: boolean } }>({
    "math1-1°A-1-2024-10-27": {
      "1": true,
      "2": false,
      "3": true,
    },
    "algebra-3°A-2-2024-10-27": {
      "9": false,
      "10": true,
    },
  })

  // Datos simulados
  const teacherSubjects = [
    { id: "math1", name: "Matemáticas", groups: ["1°A", "2°B"] },
    { id: "algebra", name: "Álgebra", groups: ["3°A"] },
    { id: "geometry", name: "Geometría", groups: ["2°B"] },
  ]

  const classSchedule = [
    { id: "1", time: "08:00 - 08:50", period: "1ra hora" },
    { id: "2", time: "08:50 - 09:40", period: "2da hora" },
    { id: "3", time: "10:00 - 10:50", period: "3ra hora" },
    { id: "4", time: "10:50 - 11:40", period: "4ta hora" },
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
    { id: "9", name: "Luisa Fernanda Gómez", studentId: "B20241242", group: "3°A" },
    { id: "10", name: "Javier Pérez Salinas", studentId: "B20241243", group: "3°A" },
    { id: "11", name: "Mariana Sánchez Díaz", studentId: "B20241244", group: "1°A" },
    { id: "12", name: "Sebastián Vargas Mendoza", studentId: "B20241245", group: "2°B" },
  ]

  const getAvailableGroups = () => {
    const subject = teacherSubjects.find((s) => s.id === selectedSubject)
    return subject ? subject.groups : []
  }

  const filteredStudents = students.filter((student) => {
    return selectedGroup === "" || student.group === selectedGroup
  })

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }))
  }

  const handleSaveAttendance = () => {
    const dateKey = format(selectedDate, "yyyy-MM-dd")
    const classKey = `${selectedSubject}-${selectedGroup}-${selectedClass}-${dateKey}`

    setSavedAttendance((prev) => ({
      ...prev,
      [classKey]: { ...attendance },
    }))

    alert("Asistencia guardada exitosamente")
  }

  const getAttendanceKey = () => {
    const dateKey = format(selectedDate, "yyyy-MM-dd")
    return `${selectedSubject}-${selectedGroup}-${selectedClass}-${dateKey}`
  }

  const getSavedAttendance = (studentId: string) => {
    const attendanceKey = getAttendanceKey()
    return savedAttendance[attendanceKey]?.[studentId]
  }

  const markAllPresent = () => {
    const newAttendance: { [key: string]: boolean } = {}
    filteredStudents.forEach((student) => {
      newAttendance[student.id] = true
    })
    setAttendance(newAttendance)
  }

  const markAllAbsent = () => {
    const newAttendance: { [key: string]: boolean } = {}
    filteredStudents.forEach((student) => {
      newAttendance[student.id] = false
    })
    setAttendance(newAttendance)
  }

  const getAttendanceStats = () => {
    const total = filteredStudents.length
    const present = Object.values(attendance).filter(Boolean).length
    const absent = total - present
    return { total, present, absent }
  }

  const stats = getAttendanceStats()

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
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <UserCheck className="w-3 h-3 mr-1" />
              Registro de Asistencia
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Registro de Asistencia</h1>
          <p className="text-gray-600">Controla la asistencia de tus estudiantes por clase</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Clase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {teacherSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedGroup} onValueChange={setSelectedGroup} disabled={!selectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableGroups().map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedDate, "PPP", { locale: es })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hora de clase" />
                  </SelectTrigger>
                  <SelectContent>
                    {classSchedule.map((class_) => (
                      <SelectItem key={class_.id} value={class_.id}>
                        {class_.period} ({class_.time})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllPresent}
                  disabled={!selectedSubject || !selectedGroup || !selectedClass}
                  className="flex-1 bg-transparent"
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Todos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAbsent}
                  disabled={!selectedSubject || !selectedGroup || !selectedClass}
                  className="flex-1 bg-transparent"
                >
                  <UserX className="w-4 h-4 mr-1" />
                  Ninguno
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Stats */}
        {selectedSubject && selectedGroup && selectedClass && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Estudiantes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Presentes</p>
                    <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ausentes</p>
                    <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                  </div>
                  <UserX className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">% Asistencia</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Table */}
        {selectedSubject && selectedGroup && selectedClass && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>
                      Asistencia - {teacherSubjects.find((s) => s.id === selectedSubject)?.name} ({selectedGroup})
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {format(selectedDate, "PPPP", { locale: es })} -{" "}
                    {classSchedule.find((c) => c.id === selectedClass)?.period}
                  </CardDescription>
                </div>
                <Button
                  onClick={handleSaveAttendance}
                  disabled={Object.keys(attendance).length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Asistencia
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
                      <TableHead>Estado Actual</TableHead>
                      <TableHead>Marcar Asistencia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const currentAttendance = attendance[student.id]
                      const savedStatus = getSavedAttendance(student.id)

                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="font-medium">{student.name}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {student.studentId}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {savedStatus !== undefined ? (
                              <div className="flex items-center space-x-2">
                                {savedStatus ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <Badge className="bg-green-100 text-green-800">Presente</Badge>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-4 h-4 text-red-500" />
                                    <Badge className="bg-red-100 text-red-800">Ausente</Badge>
                                  </>
                                )}
                              </div>
                            ) : (
                              <Badge variant="secondary">Sin registrar</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant={currentAttendance === true ? "default" : "outline"}
                                onClick={() => handleAttendanceChange(student.id, true)}
                                className={currentAttendance === true ? "bg-green-600 hover:bg-green-700" : ""}
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Presente
                              </Button>
                              <Button
                                size="sm"
                                variant={currentAttendance === false ? "default" : "outline"}
                                onClick={() => handleAttendanceChange(student.id, false)}
                                className={currentAttendance === false ? "bg-red-600 hover:bg-red-700" : ""}
                              >
                                <UserX className="w-4 h-4 mr-1" />
                                Ausente
                              </Button>
                            </div>
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
      </div>
    </div>
  )
}
