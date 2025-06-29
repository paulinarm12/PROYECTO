"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, BookOpen, Download, PrinterIcon as Print } from "lucide-react"

interface Props {
    onNavigate: (page: string) => void
}

export default function TeacherSchedule({ onNavigate }: Props) {
    // Horarios de 8:00 AM a 2:00 PM (6 horas)
    const schedule = {
        Lunes: [
            { time: "08:00 - 09:00", subject: "Matemáticas", group: "1°A" },
            { time: "09:00 - 10:00", subject: "Álgebra", group: "3°A" },
            { time: "10:00 - 11:00", subject: "Geometría", group: "2°B" },
            { time: "11:00 - 12:00", subject: "Matemáticas", group: "1°A" },
            { time: "12:00 - 13:00", subject: "Libre", group: "" },
            { time: "13:00 - 14:00", subject: "Álgebra", group: "3°A" },
        ],
        Martes: [
            { time: "08:00 - 09:00", subject: "Geometría", group: "2°B" },
            { time: "09:00 - 10:00", subject: "Matemáticas", group: "1°A" },
            { time: "10:00 - 11:00", subject: "Álgebra", group: "3°A" },
            { time: "11:00 - 12:00", subject: "Libre", group: "" },
            { time: "12:00 - 13:00", subject: "Geometría", group: "2°B" },
            { time: "13:00 - 14:00", subject: "Matemáticas", group: "1°A" },
        ],
        Miércoles: [
            { time: "08:00 - 09:00", subject: "Álgebra", group: "3°A" },
            { time: "09:00 - 10:00", subject: "Geometría", group: "2°B" },
            { time: "10:00 - 11:00", subject: "Matemáticas", group: "1°A" },
            { time: "11:00 - 12:00", subject: "Matemáticas", group: "1°A" },
            { time: "12:00 - 13:00", subject: "Álgebra", group: "3°A" },
            { time: "13:00 - 14:00", subject: "Libre", group: "" },
        ],
        Jueves: [
            { time: "08:00 - 09:00", subject: "Matemáticas", group: "1°A" },
            { time: "09:00 - 10:00", subject: "Libre", group: "" },
            { time: "10:00 - 11:00", subject: "Álgebra", group: "3°A" },
            { time: "11:00 - 12:00", subject: "Geometría", group: "2°B" },
            { time: "12:00 - 13:00", subject: "Matemáticas", group: "1°A" },
            { time: "13:00 - 14:00", subject: "Geometría", group: "2°B" },
        ],
        Viernes: [
            { time: "08:00 - 09:00", subject: "Geometría", group: "2°B" },
            { time: "09:00 - 10:00", subject: "Álgebra", group: "3°A" },
            { time: "10:00 - 11:00", subject: "Libre", group: "" },
            { time: "11:00 - 12:00", subject: "Matemáticas", group: "1°A" },
            { time: "12:00 - 13:00", subject: "Libre", group: "" },
            { time: "13:00 - 14:00", subject: "Álgebra", group: "3°A" },
        ],
    }

    const timeSlots = [
        "08:00 - 09:00",
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
    ]
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

    const getSubjectColor = (subject: string) => {
        const colors: { [key: string]: string } = {
            Matemáticas: "bg-blue-100 text-blue-800 border-blue-200",
            Álgebra: "bg-purple-100 text-purple-800 border-purple-200",
            Geometría: "bg-green-100 text-green-800 border-green-200",
            Libre: "bg-gray-100 text-gray-600 border-gray-200",
        }
        return colors[subject] || "bg-gray-100 text-gray-600 border-gray-200"
    }

    const getSubjectStats = () => {
        const subjects: { [key: string]: number } = {}
        Object.values(schedule).forEach((daySchedule) => {
            daySchedule.forEach((class_) => {
                if (class_.subject !== "Libre") {
                    subjects[class_.subject] = (subjects[class_.subject] || 0) + 1
                }
            })
        })
        return subjects
    }

    const subjectStats = getSubjectStats()

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
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <Calendar className="w-3 h-3 mr-1" />
                            Consulta de Horarios
                        </Badge>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Exportar
                        </Button>
                        <Button variant="outline" size="sm">
                            <Print className="w-4 h-4 mr-2" />
                            Imprimir
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Horario de Clases</h1>
                    <p className="text-gray-600">Consulta tu horario semanal y materias asignadas</p>
                </div>

                {/* Subject Summary - Moved above schedule */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen por Materia</CardTitle>
                        <CardDescription>Distribución de clases por materia durante la semana</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(subjectStats).map(([subject, count]) => (
                                <div key={subject} className={`p-4 rounded-lg border-2 ${getSubjectColor(subject)}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">{subject}</h3>
                                            <p className="text-sm opacity-80">{count} clases por semana</p>
                                        </div>
                                        <BookOpen className="w-6 h-6 opacity-60" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle>Horario Semanal</CardTitle>
                        <CardDescription>Turno Matutino: 8:00 AM - 2:00 PM</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-6 gap-2 min-w-[800px]">
                                {/* Header */}
                                <div className="p-3 bg-gray-100 font-medium text-center rounded-lg">Horario</div>
                                {days.map((day) => (
                                    <div key={day} className="p-3 bg-gray-100 font-medium text-center rounded-lg">
                                        {day}
                                    </div>
                                ))}

                                {/* Schedule Rows */}
                                {timeSlots.map((timeSlot, timeIndex) => (
                                    <>
                                        <div
                                            key={`time-${timeIndex}`}
                                            className="p-3 bg-gray-50 text-center font-medium text-sm rounded-lg flex items-center justify-center"
                                        >
                                            {timeSlot}
                                        </div>
                                        {days.map((day) => {
                                            const class_ = schedule[day as keyof typeof schedule][timeIndex]
                                            return (
                                                <div key={`${day}-${timeIndex}`} className="p-2">
                                                    {class_.subject === "Libre" ? (
                                                        <div className="p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-center">
                                                            <span className="text-sm text-gray-500">Hora Libre</span>
                                                        </div>
                                                    ) : (
                                                        <div className={`p-3 rounded-lg border-2 ${getSubjectColor(class_.subject)}`}>
                                                            <div className="font-medium text-sm mb-1">{class_.subject}</div>
                                                            <div className="text-xs opacity-80">{class_.group}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}