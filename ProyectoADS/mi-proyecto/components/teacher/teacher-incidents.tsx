"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Search, AlertTriangle, Mail, Clock, FileText, Send } from "lucide-react"

interface Props {
  onNavigate: (page: string) => void
}

export default function TeacherIncidents({ onNavigate }: Props) {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [incidentType, setIncidentType] = useState("")
  const [severity, setSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  // Datos simulados
  const students = [
    {
      id: "1",
      name: "Ana García López",
      studentId: "B20241234",
      group: "1°A",
      parentEmail: "ana.garcia.padre@email.com",
    },
    {
      id: "2",
      name: "Carlos Martínez Silva",
      studentId: "B20241235",
      group: "1°A",
      parentEmail: "carlos.martinez.padre@email.com",
    },
    {
      id: "3",
      name: "Elena Rodríguez Pérez",
      studentId: "B20241236",
      group: "1°A",
      parentEmail: "elena.rodriguez.padre@email.com",
    },
    {
      id: "4",
      name: "Diego Hernández Luna",
      studentId: "B20241237",
      group: "1°A",
      parentEmail: "diego.hernandez.padre@email.com",
    },
    {
      id: "5",
      name: "Sofía López Morales",
      studentId: "B20241238",
      group: "1°A",
      parentEmail: "sofia.lopez.padre@email.com",
    },
    {
      id: "6",
      name: "Andrés Castro Vega",
      studentId: "B20241239",
      group: "2°B",
      parentEmail: "andres.castro.padre@email.com",
    },
    {
      id: "7",
      name: "Valeria Flores Ruiz",
      studentId: "B20241240",
      group: "2°B",
      parentEmail: "valeria.flores.padre@email.com",
    },
    {
      id: "8",
      name: "Roberto Jiménez Torres",
      studentId: "B20241241",
      group: "2°B",
      parentEmail: "roberto.jimenez.padre@email.com",
    },
  ]

  const incidentTypes = [
    { id: "tardanza", name: "Tardanza" },
    { id: "falta_material", name: "Falta de Material" },
    { id: "conducta_disruptiva", name: "Conducta Disruptiva" },
    { id: "falta_respeto", name: "Falta de Respeto" },
    { id: "agresion_verbal", name: "Agresión Verbal" },
    { id: "agresion_fisica", name: "Agresión Física" },
    { id: "dano_propiedad", name: "Daño a la Propiedad" },
    { id: "uso_dispositivos", name: "Uso Indebido de Dispositivos" },
    { id: "otro", name: "Otro" },
  ]

  const severityLevels = [
    {
      id: "leve",
      name: "Leve",
      color: "bg-yellow-100 text-yellow-800",
      description: "Incidente menor, no requiere notificación",
    },
    {
      id: "moderada",
      name: "Moderada",
      color: "bg-orange-100 text-orange-800",
      description: "Incidente que requiere seguimiento",
    },
    {
      id: "grave",
      name: "Grave",
      color: "bg-red-100 text-red-800",
      description: "Incidente grave, notifica automáticamente a padres",
    },
  ]

  // Solo incidencias graves pendientes de aprobación
  const [incidents] = useState([
    {
      id: "INC-002",
      studentName: "Diego Hernández Luna",
      studentId: "B20241237",
      group: "1°A",
      type: "Falta de Respeto",
      severity: "grave",
      description:
        "Respondió de manera irrespetuosa al docente durante la explicación de la clase de matemáticas. Utilizó lenguaje inapropiado y se negó a seguir las instrucciones dadas.",
      date: "2024-01-14",
      time: "09:30",
      teacher: "Prof. María García",
      status: "Pendiente de Aprobación",
      parentNotified: true,
    },
    {
      id: "INC-005",
      studentName: "Carlos Martínez Silva",
      studentId: "B20241235",
      group: "1°A",
      type: "Agresión Verbal",
      severity: "grave",
      description:
        "Dirigió insultos hacia un compañero de clase durante el trabajo en equipo. La situación escaló y fue necesario intervenir para evitar un conflicto mayor.",
      date: "2024-01-12",
      time: "10:15",
      teacher: "Prof. María García",
      status: "Pendiente de Aprobación",
      parentNotified: true,
    },
    {
      id: "INC-008",
      studentName: "Valeria Flores Ruiz",
      studentId: "B20241240",
      group: "2°B",
      type: "Agresión Física",
      severity: "grave",
      description:
        "Empujó a una compañera durante el receso causando que cayera. La estudiante afectada presentó raspones menores. Se requiere intervención administrativa inmediata.",
      date: "2024-01-10",
      time: "09:45",
      teacher: "Prof. María García",
      status: "Pendiente de Aprobación",
      parentNotified: true,
    },
    {
      id: "INC-011",
      studentName: "Roberto Jiménez Torres",
      studentId: "B20241241",
      group: "2°B",
      type: "Daño a la Propiedad",
      severity: "grave",
      description:
        "Dañó intencionalmente el proyector del aula durante una discusión. El equipo requiere reparación y el incidente fue presenciado por múltiples estudiantes.",
      date: "2024-01-08",
      time: "11:20",
      teacher: "Prof. María García",
      status: "Pendiente de Aprobación",
      parentNotified: true,
    },
  ])

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedStudentData = students.find((s) => s.id === selectedStudent)
  const selectedSeverityData = severityLevels.find((s) => s.id === severity)

  const handleSubmitIncident = () => {
    if (!selectedStudent || !incidentType || !severity || !description.trim()) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    const isGrave = severity === "grave"

    // Simular envío
    alert(
      `Incidencia registrada exitosamente.\n\n` +
        `Folio: INC-${String(incidents.length + 1).padStart(3, "0")}\n` +
        `Estudiante: ${selectedStudentData?.name}\n` +
        `Gravedad: ${selectedSeverityData?.name}\n` +
        (isGrave ? `\n✉️ Se ha enviado notificación automática al padre/tutor` : ""),
    )

    // Limpiar formulario
    setSelectedStudent("")
    setIncidentType("")
    setSeverity("")
    setDescription("")
    setShowForm(false)
  }

  const getSeverityBadge = (severityId: string) => {
    return <Badge className="bg-red-100 text-red-800">Grave</Badge>
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        Pendiente de Aprobación
      </Badge>
    )
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
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Registro de Incidencias
            </Badge>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-orange-600 hover:bg-orange-700">
            <FileText className="w-4 h-4 mr-2" />
            {showForm ? "Cancelar" : "Nueva Incidencia"}
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Registro de Comportamiento</h1>
          <p className="text-gray-600">Registra y gestiona incidencias de comportamiento de los estudiantes</p>
        </div>

        {/* New Incident Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Registrar Nueva Incidencia</span>
              </CardTitle>
              <CardDescription>Complete todos los campos para registrar la incidencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="student-search">Buscar Estudiante</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="student-search"
                        placeholder="Buscar por nombre o boleta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Seleccionar Estudiante *</Label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estudiante" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            <div className="flex flex-col">
                              <span>{student.name}</span>
                              <span className="text-xs text-gray-500">
                                {student.studentId} - {student.group}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedStudentData && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Información del Estudiante</h4>
                      <div className="space-y-1 text-sm text-blue-800">
                        <div>
                          <strong>Nombre:</strong> {selectedStudentData.name}
                        </div>
                        <div>
                          <strong>Boleta:</strong> {selectedStudentData.studentId}
                        </div>
                        <div>
                          <strong>Grupo:</strong> {selectedStudentData.group}
                        </div>
                        <div>
                          <strong>Email Padre:</strong> {selectedStudentData.parentEmail}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Tipo de Incidencia *</Label>
                    <Select value={incidentType} onValueChange={setIncidentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Nivel de Gravedad *</Label>
                    <Select value={severity} onValueChange={setSeverity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la gravedad" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            <div className="flex flex-col">
                              <span>{level.name}</span>
                              <span className="text-xs text-gray-500">{level.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSeverityData && (
                    <Alert className={severity === "grave" ? "border-red-200 bg-red-50" : "border-blue-200 bg-blue-50"}>
                      <Mail className="h-4 w-4" />
                      <AlertDescription>
                        {severity === "grave" ? (
                          <span className="text-red-800">
                            <strong>Incidencia Grave:</strong> Se enviará notificación automática al padre/tutor por
                            correo electrónico.
                          </span>
                        ) : (
                          <span className="text-blue-800">
                            <strong>Incidencia {selectedSeverityData.name}:</strong> {selectedSeverityData.description}
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción Detallada *</Label>
                <Textarea
                  id="description"
                  placeholder="Describa detalladamente lo ocurrido, incluyendo contexto, acciones del estudiante y cualquier información relevante..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Caracteres: {description.length}/500 (mínimo 20 caracteres)
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmitIncident}
                  disabled={!selectedStudent || !incidentType || !severity || description.length < 20}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Registrar Incidencia
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Incidencias Pendientes</h3>
                  <p className="text-sm text-gray-600">Reportes graves esperando revisión administrativa</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-600">{incidents.length}</div>
                <div className="text-sm text-gray-500">Total pendientes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incidents History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Incidencias Graves</CardTitle>
            <CardDescription>
              Todas las incidencias reportadas como graves están pendientes de aprobación por parte de la administración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Folio</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Tipo de Incidencia</TableHead>
                    <TableHead>Gravedad</TableHead>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Notificación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {incident.id}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{incident.studentName}</div>
                          <div className="text-sm text-gray-500">
                            {incident.studentId} - {incident.group}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {incident.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <div>
                            <div className="text-sm">{incident.date}</div>
                            <div className="text-xs text-gray-500">{incident.time}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(incident.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-green-600">
                          <Mail className="w-4 h-4 mr-1" />
                          <span className="text-sm">Enviada</span>
                        </div>
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
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              <span>Información Importante</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>
                  Las incidencias graves son automáticamente enviadas al administrador para su revisión y aprobación.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>
                  Se envía notificación automática por correo electrónico al padre/tutor cuando se registra una
                  incidencia grave.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>
                  El administrador determinará las sanciones correspondientes y actualizará el estado de cada
                  incidencia.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>
                  Puedes consultar el progreso de tus reportes en esta sección. Los cambios de estado se reflejarán
                  automáticamente.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}