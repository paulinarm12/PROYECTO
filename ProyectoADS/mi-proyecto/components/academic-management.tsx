"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, GraduationCap, Shield, Search, Edit, Trash2, X, Save, BookOpen, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type MateriaXML = {
  id: string[]
  nombre: string[]
  tipo: string[]
}

interface Props {
  onNavigate: (page: string) => void
}

export default function AcademicManagement({ onNavigate }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const [selectedGroup, setSelectedGroup] = useState("all")

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [editingRecord, setEditingRecord] = useState<any>(null)

  const [editGrade, setEditGrade] = useState("")

  const router = useRouter()

  // Estados para gestión de materias y talleres
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [subjectSearchTerm, setSubjectSearchTerm] = useState("")
  const [isEditingSubject, setIsEditingSubject] = useState(false)
  const [editingSubject, setEditingSubject] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("list") // Nuevo estado para controlar la pestaña activa
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    grade: "",
    type: "",
    hoursPerWeek: "",
  })

  // Estados para filtros de materias y talleres
  const [subjectGradeFilter, setSubjectGradeFilter] = useState("all")
  const [subjectTypeFilter, setSubjectTypeFilter] = useState("all")

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

  const [academicRecords, setAcademicRecords] = useState([
    {
      id: "1",

      studentName: "Liam Harper",

      studentId: "B20241234",

      subject: "Matemáticas",

      grade: 80,

      period: "2024-2025",

      group: "2A",

      teacher: "Prof. García",

      lastUpdated: "2024-01-15",
    },

    {
      id: "2",

      studentName: "Ava Mitchell",

      studentId: "B20241567",

      subject: "Ciencias",

      grade: 70,

      period: "2024-2025",

      group: "2A",

      teacher: "Prof. Silva",

      lastUpdated: "2024-01-14",
    },

    {
      id: "3",

      studentName: "Noah Thompson",

      studentId: "B20241890",

      subject: "Inglés",

      grade: 60,

      period: "2024-2025",

      group: "1B",

      teacher: "Prof. Wilson",

      lastUpdated: "2024-01-13",
    },

    {
      id: "4",

      studentName: "Isabella Hayes",

      studentId: "B20242123",

      subject: "Historia",

      grade: 90,

      period: "2024-2025",

      group: "3A",

      teacher: "Prof. Martínez",

      lastUpdated: "2024-01-12",
    },

    {
      id: "5",

      studentName: "Ethan Carter",

      studentId: "B20242456",

      subject: "Educación Física",

      grade: 70,

      period: "2024-2025",

      group: "1A",

      teacher: "Prof. López",

      lastUpdated: "2024-01-11",
    },

    {
      id: "6",

      studentName: "Emma Rodriguez",

      studentId: "B20242789",

      subject: "Matemáticas",

      grade: 85,

      period: "2024-2025",

      group: "2A",

      teacher: "Prof. García",

      lastUpdated: "2024-01-10",
    },

    {
      id: "7",

      studentName: "Oliver Foster",

      studentId: "B20243012",

      subject: "Geografía",

      grade: 75,

      period: "2024-2025",

      group: "1B",

      teacher: "Prof. Rodríguez",

      lastUpdated: "2024-01-09",
    },
  ])

  // Estado para materias y talleres
  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await fetch("/api/materias")
      const data = await res.json()

      const transformed = data.map((item: any) => ({
        id: item.id[0],
        name: item.nombre[0],
        grade: item.grado ? item.grado[0] : "",
        type: item.tipo[0].toLowerCase(),
        hoursPerWeek: item.horasPorSemana ? Number(item.horasPorSemana[0]) : null,
      }))

      setSubjects(transformed)
    }

    fetchSubjects()
  }, [])


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

  const filteredRecords = academicRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.subject.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGroup = selectedGroup === "all" || record.group === selectedGroup

    return matchesSearch && matchesGroup
  })

  const openEditModal = (record: any) => {
    setEditingRecord(record)

    setEditGrade(record.grade.toString())

    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)

    setEditingRecord(null)

    setEditGrade("")
  }

  const handleSaveGrade = () => {
    const newGrade = Number.parseInt(editGrade)

    if (newGrade >= 0 && newGrade <= 100) {
      setAcademicRecords((prev) =>
        prev.map((record) =>
          record.id === editingRecord.id
            ? {
              ...record,

              grade: newGrade,

              lastUpdated: new Date().toISOString().split("T")[0],
            }
            : record,
        ),
      )

      closeEditModal()
    }
  }

  const handleDeleteRecord = (recordId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este registro de calificación?")) {
      setAcademicRecords((prev) => prev.filter((record) => record.id !== recordId))
    }
  }

  // Funciones para gestión de materias y talleres
  const openSubjectModal = () => {
    setIsSubjectModalOpen(true)
    resetSubjectForm()
  }

  const closeSubjectModal = () => {
    setIsSubjectModalOpen(false)
    setIsEditingSubject(false)
    setEditingSubject(null)
    resetSubjectForm()
    setActiveTab("list") // Reset a la pestaña de lista
    // Reset filtros
    setSubjectSearchTerm("")
    setSubjectGradeFilter("all")
    setSubjectTypeFilter("all")
  }

  const resetSubjectForm = () => {
    setSubjectForm({
      name: "",
      grade: "",
      type: "",
      hoursPerWeek: "",
    })
  }

  const handleSubjectFormChange = (field: string, value: string) => {
    setSubjectForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreateSubject = async () => {
  if (subjectForm.name && subjectForm.grade && subjectForm.type) {
    const newSubject = {
      id: Date.now().toString(),
      name: subjectForm.name,
      grade: subjectForm.grade,
      type: subjectForm.type,
      hoursPerWeek:
        subjectForm.type === "materia"
          ? Number.parseInt(subjectForm.hoursPerWeek) || 0
          : null,
    }

    await fetch("/api/materias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSubject),
    })
    setSubjects((prev) => [...prev, newSubject])
    resetSubjectForm()
  }
}

  const handleEditSubject = (subject: any) => {
    setIsEditingSubject(true)
    setEditingSubject(subject)
    setSubjectForm({
      name: subject.name,
      grade: subject.grade,
      type: subject.type,
      hoursPerWeek: subject.hoursPerWeek?.toString() || "",
    })
    setActiveTab("create") // Cambiar automáticamente a la pestaña del formulario
  }

  const handleUpdateSubject = async () => {
  if (subjectForm.name && subjectForm.grade && subjectForm.type && editingSubject) {
    const updatedSubject = {
      id: editingSubject.id,
      name: subjectForm.name,
      grade: subjectForm.grade,
      type: subjectForm.type,
      hoursPerWeek:
        subjectForm.type === "materia"
          ? Number.parseInt(subjectForm.hoursPerWeek) || 0
          : null,
    }

    // Enviar actualización al backend
    await fetch(`/api/materias`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSubject),
    })

    // Actualizar en el estado local
    setSubjects((prev) =>
      prev.map((subject) => (subject.id === editingSubject.id ? updatedSubject : subject))
    )

    setIsEditingSubject(false)
    setEditingSubject(null)
    resetSubjectForm()
    setActiveTab("list")
  }
}

  const handleDeleteSubject = async (subjectId: string) => {
  if (window.confirm("¿Está seguro de que desea eliminar esta materia/taller?")) {
    // Enviar petición DELETE al backend
    await fetch(`/api/materias`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: subjectId }),
    })

    // Eliminar localmente
    setSubjects((prev) => prev.filter((subject) => subject.id !== subjectId))
  }
}

const filteredSubjects = subjects.filter((subject) => {
  const matchesSearch =
    subject.name.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
    subject.grade.includes(subjectSearchTerm) ||
    subject.type.toLowerCase().includes(subjectSearchTerm.toLowerCase())

  const matchesGrade = subjectGradeFilter === "all" || subject.grade === subjectGradeFilter
  const matchesType = subjectTypeFilter === "all" || subject.type === subjectTypeFilter

  return matchesSearch && matchesGrade && matchesType
})

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
              onClick={() => router.push("/admin")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>

            <div className="h-6 w-px bg-gray-300" />

            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Administrador
            </Badge>
          </div>

          {/* Botón para gestionar materias y talleres */}
          <Button onClick={openSubjectModal} className="bg-blue-600 hover:bg-blue-700">
            <BookOpen className="w-4 h-4 mr-2" />
            Gestionar Materias y Talleres
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
            Gestión Académica
          </h1>

          <p className="text-gray-600">Ver y gestionar registros académicos de estudiantes por grupo o individual</p>
        </div>

        {/* Search and Filters */}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buscar y Filtrar Registros</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                <Input
                  placeholder="Buscar por nombre de estudiante o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Seleccionar Grupo" />
                </SelectTrigger>

                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Academic Records Table */}

        <Card>
          <CardHeader>
            <CardTitle>Registros Académicos</CardTitle>

            <CardDescription>
              Mostrando {filteredRecords.length} de {academicRecords.length} registros
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Estudiante</TableHead>

                    <TableHead>Materia</TableHead>

                    <TableHead>Calificación</TableHead>

                    <TableHead>Grupo</TableHead>

                    <TableHead>Profesor</TableHead>

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
                          {record.subject}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getGradeColor(record.grade)} font-bold`}>{record.grade}</Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">{record.group}</Badge>
                      </TableCell>

                      <TableCell className="text-gray-600">{record.teacher}</TableCell>

                      <TableCell className="text-right">
                        <div className="flex space-x-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => openEditModal(record)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Edición de Calificación */}

        {isEditModalOpen && editingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Edit className="w-5 h-5 mr-2 text-blue-600" />
                    Editar Calificación
                  </h2>

                  <Button variant="ghost" size="sm" onClick={closeEditModal}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Información del Registro</h3>

                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <strong>Estudiante:</strong> {editingRecord.studentName}
                      </div>

                      <div>
                        <strong>ID:</strong> {editingRecord.studentId}
                      </div>

                      <div>
                        <strong>Materia:</strong> {editingRecord.subject}
                      </div>

                      <div>
                        <strong>Grupo:</strong> {editingRecord.group}
                      </div>

                      <div>
                        <strong>Profesor:</strong> {editingRecord.teacher}
                      </div>

                      <div>
                        <strong>Período:</strong> {editingRecord.period}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Nueva Calificación *</Label>

                    <Input
                      id="grade"
                      type="number"
                      min="0"
                      max="100"
                      value={editGrade}
                      onChange={(e) => setEditGrade(e.target.value)}
                      placeholder="Ingrese la calificación (0-100)"
                      className="text-center text-lg font-bold"
                    />

                    <p className="text-xs text-gray-500">Calificación actual: {editingRecord.grade}</p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Vista Previa</h4>

                    {editGrade && Number.parseInt(editGrade) >= 0 && Number.parseInt(editGrade) <= 100 ? (
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getGradeColor(Number.parseInt(editGrade))} font-bold`}>{editGrade}</Badge>

                        <Badge className={getGradeColor(Number.parseInt(editGrade))}>
                          {getGradeStatus(Number.parseInt(editGrade))}
                        </Badge>
                      </div>
                    ) : (
                      <p className="text-blue-700 text-sm">Ingrese una calificación válida (0-100)</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <Button variant="outline" onClick={closeEditModal}>
                      Cancelar
                    </Button>

                    <Button
                      onClick={handleSaveGrade}
                      disabled={!editGrade || Number.parseInt(editGrade) < 0 || Number.parseInt(editGrade) > 100}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Calificación
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Gestión de Materias y Talleres */}
        {isSubjectModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Gestión de Materias y Talleres
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeSubjectModal}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">Ver y Buscar</TabsTrigger>
                    <TabsTrigger value="create">Crear Nueva</TabsTrigger>
                  </TabsList>

                  <TabsContent value="list" className="space-y-4">
                    {/* Búsqueda y Filtros */}
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Buscar materias o talleres..."
                          value={subjectSearchTerm}
                          onChange={(e) => setSubjectSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <Label htmlFor="gradeFilter" className="text-sm font-medium mb-2 block">
                            Filtrar por Grado
                          </Label>
                          <Select value={subjectGradeFilter} onValueChange={setSubjectGradeFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Todos los grados" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos los grados</SelectItem>
                              <SelectItem value="1°">1°</SelectItem>
                              <SelectItem value="2°">2°</SelectItem>
                              <SelectItem value="3°">3°</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex-1">
                          <Label htmlFor="typeFilter" className="text-sm font-medium mb-2 block">
                            Filtrar por Tipo
                          </Label>
                          <Select value={subjectTypeFilter} onValueChange={setSubjectTypeFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Todos los tipos" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos los tipos</SelectItem>
                              <SelectItem value="materia">Materias</SelectItem>
                              <SelectItem value="taller">Talleres</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Indicador de resultados filtrados */}
                      <div className="text-sm text-gray-600">
                        Mostrando {filteredSubjects.length} de {subjects.length} elementos
                      </div>
                    </div>

                    {/* Lista de materias y talleres */}
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Grado</TableHead>
                            <TableHead>Horas/Semana</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSubjects.length > 0 ? (
                            filteredSubjects.map((subject) => (
                              <TableRow key={subject.id}>
                                <TableCell className="font-medium">{subject.name}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={subject.type === "materia" ? "default" : "secondary"}
                                    className={
                                      subject.type === "materia"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-purple-100 text-purple-800"
                                    }
                                  >
                                    {subject.type === "materia" ? "Materia" : "Taller"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{subject.grade}</Badge>
                                </TableCell>
                                <TableCell>{subject.hoursPerWeek ? `${subject.hoursPerWeek} horas` : "N/A"}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex space-x-2 justify-end">
                                    <Button size="sm" variant="outline" onClick={() => handleEditSubject(subject)}>
                                      <Edit className="w-4 h-4 mr-2" />
                                      Editar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleDeleteSubject(subject.id)}
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Eliminar
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                No se encontraron materias o talleres que coincidan con los filtros aplicados
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="create" className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-4">
                        {isEditingSubject ? "Editar Materia/Taller" : "Crear Nueva Materia/Taller"}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subjectName">Nombre *</Label>
                          <Input
                            id="subjectName"
                            value={subjectForm.name}
                            onChange={(e) => handleSubjectFormChange("name", e.target.value)}
                            placeholder="Ej: Matemáticas, Taller de Arte"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subjectType">Tipo *</Label>
                          <Select
                            value={subjectForm.type}
                            onValueChange={(value) => handleSubjectFormChange("type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="materia">Materia</SelectItem>
                              <SelectItem value="taller">Taller</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subjectGrade">Grado *</Label>
                          <Select
                            value={subjectForm.grade}
                            onValueChange={(value) => handleSubjectFormChange("grade", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar grado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1°">1°</SelectItem>
                              <SelectItem value="2°">2°</SelectItem>
                              <SelectItem value="3°">3°</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {subjectForm.type === "materia" && (
                          <div className="space-y-2">
                            <Label htmlFor="hoursPerWeek">Horas por Semana *</Label>
                            <Input
                              id="hoursPerWeek"
                              type="number"
                              min="1"
                              max="10"
                              value={subjectForm.hoursPerWeek}
                              onChange={(e) => handleSubjectFormChange("hoursPerWeek", e.target.value)}
                              placeholder="Ej: 5"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end space-x-4 mt-6">
                        {isEditingSubject && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditingSubject(false)
                              setEditingSubject(null)
                              resetSubjectForm()
                              setActiveTab("list") // Volver a la pestaña de lista
                            }}
                          >
                            Cancelar
                          </Button>
                        )}
                        <Button
                          onClick={isEditingSubject ? handleUpdateSubject : handleCreateSubject}
                          disabled={
                            !subjectForm.name ||
                            !subjectForm.grade ||
                            !subjectForm.type ||
                            (subjectForm.type === "materia" && !subjectForm.hoursPerWeek)
                          }
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {isEditingSubject ? "Actualizar" : "Crear"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
