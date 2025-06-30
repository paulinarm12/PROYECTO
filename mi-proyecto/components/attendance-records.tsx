"use client"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  UserCheck,
  Shield,
  Search,
  Filter,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Save,
} from "lucide-react"

export default function AttendanceRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("all")
  const [selectedDate, setSelectedDate] = useState("2024-03-15")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<any>(null)
  const [editStatus, setEditStatus] = useState("")
  // Datos simulados
  const groups = [
    { id: "all", name: "Todos los Grupos" },
    { id: "1A", name: "1° A" },
    { id: "1B", name: "1° B" },
    { id: "2A", name: "2° A" },
    { id: "2B", name: "2° B" },
    { id: "3A", name: "3° A" },
    { id: "3B", name: "3° B" },
  ]

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: "1",
      studentName: "Ethan Harper",
      studentId: "B20241234",
      group: "1A",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "2",
      studentName: "Olivia Bennett",
      studentId: "B20241567",
      group: "1B",
      date: "2024-03-15",
      status: "Absent",
    },
    {
      id: "3",
      studentName: "Noah Carter",
      studentId: "B20241890",
      group: "1A",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "4",
      studentName: "Ava Davis",
      studentId: "B20242123",
      group: "1B",
      date: "2024-03-15",
      status: "Absent",
    },
    {
      id: "5",
      studentName: "Liam Evans",
      studentId: "B20242456",
      group: "1A",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "6",
      studentName: "Sophia Foster",
      studentId: "B20242789",
      group: "1B",
      date: "2024-03-15",
      status: "Absent",
    },
    {
      id: "7",
      studentName: "Jackson Gray",
      studentId: "B20243012",
      group: "1A",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "8",
      studentName: "Isabella Hayes",
      studentId: "B20243345",
      group: "1B",
      date: "2024-03-15",
      status: "Absent",
    },
    {
      id: "9",
      studentName: "Lucas Ingram",
      studentId: "B20243678",
      group: "1A",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "10",
      studentName: "Mia Jenkins",
      studentId: "B20243901",
      group: "1B",
      date: "2024-03-15",
      status: "Absent",
    },
    {
      id: "11",
      studentName: "William Torres",
      studentId: "B20244234",
      group: "2A",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "12",
      studentName: "Emma Rodriguez",
      studentId: "B20244567",
      group: "2A",
      date: "2024-03-15",
      status: "Absent",
    },
    {
      id: "13",
      studentName: "James Wilson",
      studentId: "B20244890",
      group: "2B",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "14",
      studentName: "Charlotte Brown",
      studentId: "B20245123",
      group: "2B",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "15",
      studentName: "Benjamin Davis",
      studentId: "B20245456",
      group: "3A",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "16",
      studentName: "Amelia Miller",
      studentId: "B20245789",
      group: "3A",
      date: "2024-03-15",
      status: "Absent",
    },
    {
      id: "17",
      studentName: "Alexander Garcia",
      studentId: "B20246012",
      group: "3B",
      date: "2024-03-15",
      status: "Present",
    },
    {
      id: "18",
      studentName: "Harper Martinez",
      studentId: "B20246345",
      group: "3B",
      date: "2024-03-15",
      status: "Present",
    },
  ])

  // Generar fechas para el calendario (últimos 30 días)
  const generateCalendarDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const calendarDates = generateCalendarDates()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Presente
          </Badge>
        )
      case "Absent":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Ausente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.group.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = selectedGroup === "all" || record.group === selectedGroup
    const matchesDate = record.date === selectedDate
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesGroup && matchesDate && matchesStatus
  })

  const openDetailsModal = (record: any) => {
    setEditingRecord(record)
    setEditStatus(record.status)
    setIsDetailsModalOpen(true)
  }

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
    setEditingRecord(null)
    setEditStatus("")
  }

  const handleSaveAttendance = () => {
    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.id === editingRecord.id
          ? {
              ...record,
              status: editStatus,
            }
          : record,
      ),
    )
    closeDetailsModal()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
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
            <UserCheck className="w-8 h-8 mr-3 text-blue-600" />
            Registros de Asistencia
          </h1>
          <p className="text-gray-600">Gestionar y revisar registros de asistencia de estudiantes eficientemente</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buscar y Filtrar Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre de estudiante, grupo o fecha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por Grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setIsCalendarOpen(true)}
                  className="w-full md:w-48 justify-start"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDateShort(selectedDate)}
                </Button>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <UserCheck className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Ordenar por Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los Estados</SelectItem>
                    <SelectItem value="present">Solo Presentes</SelectItem>
                    <SelectItem value="absent">Solo Ausentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registros de Asistencia</CardTitle>
            <CardDescription>
              Mostrando {filteredRecords.length} de {attendanceRecords.length} registros para el{" "}
              {formatDate(selectedDate)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Estudiante</TableHead>
                    <TableHead>Grupo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.studentName}</div>
                          <div className="text-sm text-gray-500">{record.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {record.group}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDateShort(record.date)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => openDetailsModal(record)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Calendario */}
        {isCalendarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Seleccionar Fecha
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsCalendarOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {calendarDates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedDate(date)
                        setIsCalendarOpen(false)
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(date)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalles de Asistencia */}
        {isDetailsModalOpen && editingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-blue-600" />
                    Detalles de Asistencia
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeDetailsModal}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Información del Estudiante</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <strong>Nombre:</strong> {editingRecord.studentName}
                      </div>
                      <div>
                        <strong>ID:</strong> {editingRecord.studentId}
                      </div>
                      <div>
                        <strong>Grupo:</strong> {editingRecord.group}
                      </div>
                      <div>
                        <strong>Fecha:</strong> {formatDate(editingRecord.date)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Estado de Asistencia *</Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Present">Presente</SelectItem>
                        <SelectItem value="Absent">Ausente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <Button variant="outline" onClick={closeDetailsModal}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveAttendance} className="bg-blue-600 hover:bg-blue-700">
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
