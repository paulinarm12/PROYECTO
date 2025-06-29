"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, UserCheck, UserX, Calendar, Download } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Props {
  onNavigate: (page: string) => void
}

export default function ParentAttendance({ onNavigate }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-2025")

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

  const stats = {
    presentDays: 12,
    absentDays: 5,
    totalDays: 14,
    attendancePercentage: 85.7,
  }

  const groupedAttendance = {
    "2024-01-18": [
      {
        subject: "Matemáticas",
        time: "08:00",
        status: "present",
        teacher: "Prof. García",
      },
      {
        subject: "Español",
        time: "09:00",
        status: "present",
        teacher: "Prof. Rodríguez",
      },
      {
        subject: "Ciencias",
        time: "10:00",
        status: "present",
        teacher: "Prof. Silva",
      },
      {
        subject: "Historia",
        time: "11:00",
        status: "present",
        teacher: "Prof. Martínez",
      },
      {
        subject: "Inglés",
        time: "12:00",
        status: "present",
        teacher: "Prof. Wilson",
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Presente</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Ausente</Badge>
      default:
        return <Badge variant="secondary">Sin registro</Badge>
    }
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
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <UserCheck className="w-3 h-3 mr-1" />
              Consulta de Asistencias
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Asistencias de {studentInfo.name}</h1>
          <p className="text-gray-600">
            Consulta el registro de asistencias por fecha - {studentInfo.studentId} ({studentInfo.group})
          </p>
        </div>

        {/* Filters sin calendario */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full md:w-64">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full">
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Días Presentes</p>
                  <p className="text-2xl font-bold text-green-600">{stats.presentDays}</p>
                </div>
                <UserCheck className="w-6 h-6 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Días Ausentes</p>
                  <p className="text-2xl font-bold text-red-600">{stats.absentDays}</p>
                </div>
                <UserX className="w-6 h-6 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Días</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalDays}</p>
                </div>
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">% Asistencia</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.attendancePercentage}%</p>
                </div>
                <UserCheck className="w-6 h-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro Detallado de Asistencias</CardTitle>
            <CardDescription>Enero 2024 - 14 días con registro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Fecha</TableHead>
                    <TableHead>Materia</TableHead>
                    <TableHead className="w-20">Hora</TableHead>
                    <TableHead className="w-24">Estado</TableHead>
                    <TableHead>Profesor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(groupedAttendance).map(([date, records]) =>
                    records.map((record, index) => (
                      <TableRow key={`${date}-${index}`}>
                        {index === 0 && (
                          <TableCell rowSpan={records.length} className="font-medium align-top">
                            <div className="text-sm">{format(new Date(date), "dd/MM/yyyy", { locale: es })}</div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(date), "EEEE", { locale: es })}
                            </div>
                          </TableCell>
                        )}
                        <TableCell className="py-2">{record.subject}</TableCell>
                        <TableCell className="py-2 text-center">{record.time}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(record.status)}</TableCell>
                        <TableCell className="py-2 text-sm text-gray-600">{record.teacher}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
