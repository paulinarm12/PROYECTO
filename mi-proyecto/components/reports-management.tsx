"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
    ArrowLeft,
    FileText,
    Shield,
    Search,
    Eye,
    Calendar,
    User,
    Users,
    AlertTriangle,
    CheckCircle,
    X,
    Save,
    GraduationCap,
    UserX,
} from "lucide-react"

export default function ReportsManagement() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGroup, setSelectedGroup] = useState("all")
    const [activeTab, setActiveTab] = useState("unapproved")
    const searchParams = useSearchParams()

    useEffect(() => {
        const tabParam = searchParams.get("tab")
        if (tabParam === "all") {
            setActiveTab("all")
        }
    }, [searchParams])

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState<any>(null)
    const [sanction, setSanction] = useState("")
    const [severeIncidentReports, setSevereIncidentReports] = useState([
        {
            id: "1",
            type: "severe_incident",
            date: "2024-07-26",
            studentName: "Ethan Carter",
            studentId: "B20241234",
            group: "2A",
            teacherName: "Ms. Olivia Bennett",
            incident: "Agresión física a compañero durante el recreo",
            description:
                "El estudiante golpeó a otro alumno causando lesiones menores. Testigos presentes confirman la agresión no provocada.",
            status: "Pending",
            severity: "High",
        },
        {
            id: "2",
            type: "severe_incident",
            date: "2024-07-25",
            studentName: "Noah Turner",
            studentId: "B20241890",
            group: "1A",
            teacherName: "Ms. Ava Foster",
            incident: "Vandalismo en instalaciones escolares",
            description: "Destrucción intencional de mobiliario en el aula de ciencias. Daños estimados en $500.",
            status: "Pending",
            severity: "High",
        },
        {
            id: "3",
            type: "severe_incident",
            date: "2024-07-24",
            studentName: "Isabella Reed",
            studentId: "B20242123",
            group: "2B",
            teacherName: "Mr. Owen Hughes",
            incident: "Amenazas verbales a personal docente",
            description:
                "Amenazas directas al profesor durante clase de matemáticas. Comportamiento intimidatorio persistente.",
            status: "Pending",
            severity: "High",
        },
        {
            id: "4",
            type: "severe_incident",
            date: "2024-07-23",
            studentName: "Jackson Bell",
            studentId: "B20243012",
            group: "1A",
            teacherName: "Ms. Chloe Murphy",
            incident: "Posesión de material prohibido",
            description: "Encontrado con objetos punzocortantes en su mochila durante inspección de rutina.",
            status: "Pending",
            severity: "High",
        },
        {
            id: "5",
            type: "severe_incident",
            date: "2024-07-22",
            studentName: "Aiden Price",
            studentId: "B20246012",
            group: "3B",
            teacherName: "Ms. Lily Ross",
            incident: "Acoso escolar sistemático",
            description: "Patrón documentado de acoso hacia múltiples compañeros durante varias semanas.",
            status: "Pending",
            severity: "High",
        },
    ])

    const allReports = [
        {
            id: "summary_1",
            type: "cycle_summary",
            date: "2024-07-30",
            studentName: "Emma Rodriguez",
            studentId: "B20244567",
            group: "2A",
            status: "Completed",
            academicData: {
                averageGrade: 85,
                attendancePercentage: 92,
                subjects: [
                    { name: "Matemáticas", grade: 88 },
                    { name: "Español", grade: 90 },
                    { name: "Historia", grade: 82 },
                    { name: "Ciencias", grade: 85 },
                    { name: "Inglés", grade: 87 },
                ],
                behaviorIncidents: 1,
                behaviorNotes: "Un incidente menor de tardanza repetitiva en el primer trimestre",
            },
        },
        {
            id: "summary_2",
            type: "cycle_summary",
            date: "2024-07-30",
            studentName: "Liam Foster",
            studentId: "B20242456",
            group: "1A",
            status: "Completed",
            academicData: {
                averageGrade: 78,
                attendancePercentage: 88,
                subjects: [
                    { name: "Matemáticas", grade: 75 },
                    { name: "Español", grade: 82 },
                    { name: "Historia", grade: 80 },
                    { name: "Ciencias", grade: 76 },
                    { name: "Inglés", grade: 79 },
                ],
                behaviorIncidents: 0,
                behaviorNotes: "Sin incidentes de comportamiento durante el ciclo escolar",
            },
        },
        {
            id: "summary_3",
            type: "cycle_summary",
            date: "2024-07-29",
            studentName: "Sophia Clark",
            studentId: "B20241567",
            group: "1B",
            status: "Completed",
            academicData: {
                averageGrade: 92,
                attendancePercentage: 96,
                subjects: [
                    { name: "Matemáticas", grade: 94 },
                    { name: "Español", grade: 91 },
                    { name: "Historia", grade: 90 },
                    { name: "Ciencias", grade: 93 },
                    { name: "Inglés", grade: 92 },
                ],
                behaviorIncidents: 0,
                behaviorNotes: "Excelente comportamiento y liderazgo positivo en clase",
            },
        },
        {
            id: "approved_1",
            type: "severe_incident",
            date: "2024-07-20",
            studentName: "Oliver Thompson",
            studentId: "B20245456",
            group: "3A",
            teacherName: "Ms. Sarah Wilson",
            incident: "Pelea en el patio escolar",
            description: "Altercado físico con otro estudiante durante el almuerzo.",
            status: "Approved",
            severity: "High",
            sanction: "Suspensión de 3 días y servicio comunitario en la escuela por 2 semanas",
        },
        {
            id: "approved_2",
            type: "severe_incident",
            date: "2024-07-18",
            studentName: "Charlotte Brown",
            studentId: "B20245123",
            group: "2B",
            teacherName: "Mr. David Martinez",
            incident: "Falta de respeto grave al personal",
            description: "Lenguaje inapropiado y actitud desafiante hacia el director.",
            status: "Approved",
            severity: "High",
            sanction: "Suspensión de 2 días y carta de disculpa formal",
        },
    ]

    const getReportTypeBadge = (type: string) => {
        switch (type) {
            case "severe_incident":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Incidencia Grave</Badge>
            case "cycle_summary":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Resumen del Ciclo</Badge>
            default:
                return <Badge variant="secondary">{type}</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Pending":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Pendiente
                    </Badge>
                )
            case "Approved":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Aprobado
                    </Badge>
                )
            case "Completed":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completado
                    </Badge>
                )
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getCurrentReports = () => {
        return activeTab === "unapproved" ? severeIncidentReports : allReports
    }

    const filteredReports = getCurrentReports().filter((report) => {
        const matchesSearch =
            report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.teacherName && report.teacherName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            report.date.includes(searchTerm.toLowerCase())
        const matchesGroup = selectedGroup === "all" || report.group === selectedGroup
        return matchesSearch && matchesGroup
    })

    const openDetailsModal = (report: any) => {
        setSelectedReport(report)
        setSanction("")
        setIsDetailsModalOpen(true)
    }

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false)
        setSelectedReport(null)
        setSanction("")
    }

    const handleApproveReport = () => {
        if (selectedReport && sanction.trim()) {
            setSevereIncidentReports((prev) => prev.filter((report) => report.id !== selectedReport.id))
            const approvedReport = {
                ...selectedReport,
                status: "Approved",
                sanction: sanction.trim(),
            }
            console.log("Reporte aprobado:", approvedReport)
            closeDetailsModal()
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    }

    const getGradeColor = (grade: number) => {
        if (grade >= 90) return "text-green-600"
        if (grade >= 80) return "text-blue-600"
        if (grade >= 70) return "text-yellow-600"
        return "text-red-600"
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
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                        <FileText className="w-8 h-8 mr-3 text-blue-600" />
                        Reportes
                    </h1>
                    <p className="text-gray-600">Gestionar reportes de incidencias graves y resúmenes del ciclo escolar</p>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="unapproved" className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Por Aprobar</span>
                        </TabsTrigger>
                        <TabsTrigger value="all" className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Todos los Reportes</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Search and Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Buscar y Filtrar Reportes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Buscar por fecha, nombre de estudiante, nombre de profesor..."
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
                                        {allReports.map((report) => (
                                            <SelectItem key={report.id} value={report.id}>
                                                {report.group}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <TabsContent value="unapproved" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <UserX className="w-5 h-5 mr-2 text-red-600" />
                                    Incidencias Graves Pendientes
                                </CardTitle>
                                <CardDescription>{filteredReports.length} incidencias requieren tu revisión y sanción</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Fecha</TableHead>
                                                <TableHead>Estudiante</TableHead>
                                                <TableHead>Profesor Reportante</TableHead>
                                                <TableHead>Incidencia</TableHead>
                                                <TableHead className="text-right">Acción</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredReports.map((report) => (
                                                <TableRow key={report.id}>
                                                    <TableCell>
                                                        <div className="flex items-center text-gray-600">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {formatDate(report.date)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="flex items-center">
                                                                <User className="w-4 h-4 mr-2 text-blue-600" />
                                                                <span className="font-medium">{report.studentName}</span>
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {report.studentId} - {report.group}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center">
                                                            <Users className="w-4 h-4 mr-2 text-green-600" />
                                                            <span className="text-gray-600">{report.teacherName}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="max-w-xs">
                                                            <div className="font-medium text-red-700">{report.incident}</div>
                                                            <div className="text-sm text-gray-500 truncate">{report.description}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button size="sm" variant="outline" onClick={() => openDetailsModal(report)}>
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
                    </TabsContent>

                    <TabsContent value="all" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                                    Historial Completo de Reportes
                                </CardTitle>
                                <CardDescription>Resúmenes del ciclo escolar e incidencias graves aprobadas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Fecha</TableHead>
                                                <TableHead>Estudiante</TableHead>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>Estado</TableHead>
                                                <TableHead className="text-right">Acción</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredReports.map((report) => (
                                                <TableRow key={report.id}>
                                                    <TableCell>
                                                        <div className="flex items-center text-gray-600">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {formatDate(report.date)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="flex items-center">
                                                                <User className="w-4 h-4 mr-2 text-blue-600" />
                                                                <span className="font-medium">{report.studentName}</span>
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {report.studentId} - {report.group}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                                                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button size="sm" variant="outline" onClick={() => openDetailsModal(report)}>
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
                    </TabsContent>
                </Tabs>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Incidencias Pendientes</p>
                                    <p className="text-2xl font-bold text-red-600">{severeIncidentReports.length}</p>
                                </div>
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Resúmenes Completados</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {allReports.filter((r) => r.type === "cycle_summary").length}
                                    </p>
                                </div>
                                <GraduationCap className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Incidencias Aprobadas</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {allReports.filter((r) => r.type === "severe_incident" && r.status === "Approved").length}
                                    </p>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Modal de Detalles */}
                {isDetailsModalOpen && selectedReport && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                        {selectedReport.type === "severe_incident" ? (
                                            <UserX className="w-6 h-6 mr-2 text-red-600" />
                                        ) : (
                                            <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                                        )}
                                        {selectedReport.type === "severe_incident" ? "Incidencia Grave" : "Resumen del Ciclo Escolar"}
                                    </h2>
                                    <Button variant="ghost" size="sm" onClick={closeDetailsModal}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                {selectedReport.type === "severe_incident" ? (
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-900 mb-3">Información del Estudiante</h3>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <strong>Nombre:</strong> {selectedReport.studentName}
                                                </div>
                                                <div>
                                                    <strong>ID:</strong> {selectedReport.studentId}
                                                </div>
                                                <div>
                                                    <strong>Grupo:</strong> {selectedReport.group}
                                                </div>
                                                <div>
                                                    <strong>Fecha:</strong> {formatDate(selectedReport.date)}
                                                </div>
                                                <div>
                                                    <strong>Profesor Reportante:</strong> {selectedReport.teacherName}
                                                </div>
                                                <div>
                                                    <strong>Severidad:</strong> <Badge className="bg-red-500 text-white">Alta</Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                            <h3 className="font-medium text-red-800 mb-2">Descripción de la Incidencia</h3>
                                            <div className="text-red-700 mb-2">
                                                <strong>{selectedReport.incident}</strong>
                                            </div>
                                            <p className="text-red-600 text-sm">{selectedReport.description}</p>
                                        </div>

                                        {selectedReport.status === "Pending" ? (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="sanction">Sanción a Aplicar *</Label>
                                                    <Textarea
                                                        id="sanction"
                                                        value={sanction}
                                                        onChange={(e) => setSanction(e.target.value)}
                                                        placeholder="Describe la sanción que se aplicará al estudiante (suspensión, servicio comunitario, etc.)"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>

                                                <div className="flex justify-end space-x-4 pt-4 border-t">
                                                    <Button variant="outline" onClick={closeDetailsModal}>
                                                        Cancelar
                                                    </Button>
                                                    <Button
                                                        onClick={handleApproveReport}
                                                        disabled={!sanction.trim()}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <Save className="w-4 h-4 mr-2" />
                                                        Aprobar con Sanción
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                <h3 className="font-medium text-green-800 mb-2">Sanción Aplicada</h3>
                                                <p className="text-green-700">{selectedReport.sanction}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-900 mb-3">Información del Estudiante</h3>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <strong>Nombre:</strong> {selectedReport.studentName}
                                                </div>
                                                <div>
                                                    <strong>ID:</strong> {selectedReport.studentId}
                                                </div>
                                                <div>
                                                    <strong>Grupo:</strong> {selectedReport.group}
                                                </div>
                                                <div>
                                                    <strong>Fecha del Reporte:</strong> {formatDate(selectedReport.date)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                                <h3 className="font-medium text-blue-800 mb-3 flex items-center">
                                                    <GraduationCap className="w-4 h-4 mr-2" />
                                                    Rendimiento Académico
                                                </h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span>Promedio General:</span>
                                                        <span className={`font-bold ${getGradeColor(selectedReport.academicData.averageGrade)}`}>
                                                            {selectedReport.academicData.averageGrade}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {selectedReport.academicData.subjects.map((subject: any, index: number) => (
                                                            <div key={index} className="flex justify-between text-sm">
                                                                <span>{subject.name}:</span>
                                                                <span className={getGradeColor(subject.grade)}>{subject.grade}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                <h3 className="font-medium text-green-800 mb-3">Asistencia y Comportamiento</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span>Porcentaje de Asistencia:</span>
                                                        <span className="font-bold text-green-600">
                                                            {selectedReport.academicData.attendancePercentage}%
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Incidencias de Comportamiento:</span>
                                                        <span
                                                            className={`font-bold ${selectedReport.academicData.behaviorIncidents > 0 ? "text-red-600" : "text-green-600"}`}
                                                        >
                                                            {selectedReport.academicData.behaviorIncidents}
                                                        </span>
                                                    </div>
                                                    <div className="pt-2 border-t border-green-200">
                                                        <p className="text-sm text-green-700">
                                                            <strong>Observaciones:</strong> {selectedReport.academicData.behaviorNotes}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4 border-t">
                                            <Button variant="outline" onClick={closeDetailsModal}>
                                                Cerrar
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
