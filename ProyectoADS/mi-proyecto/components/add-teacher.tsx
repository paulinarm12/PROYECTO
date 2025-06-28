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
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
    ArrowLeft,
    Users,
    Shield,
    User,
    Mail,
    Key,
    AlertCircle,
    Save,
    Calendar,
    GraduationCap,
    BookOpen,
} from "lucide-react"

export default function AddTeacher() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        phone: "",
        email: "",
        teacherType: "titular", // titular o suplente
        subjects: [] as string[],
    })

    // Generar RFC simulado (en producción se calcularía correctamente)
    const generateRFC = (firstName: string, lastName: string, day: string, month: string, year: string) => {
        if (!firstName || !lastName || !day || !month || !year) return ""

        const firstNameInitial = firstName.charAt(0).toUpperCase()
        const lastNameParts = lastName.split(" ")
        const lastNameInitials =
            lastNameParts.length >= 2
                ? lastNameParts[0].substring(0, 2).toUpperCase() + lastNameParts[1].charAt(0).toUpperCase()
                : lastName.substring(0, 3).toUpperCase()

        const yearShort = year.slice(-2)
        const monthPadded = month.padStart(2, "0")
        const dayPadded = day.padStart(2, "0")

        return `${lastNameInitials}${firstNameInitial}${yearShort}${monthPadded}${dayPadded}`
    }

    // Generar contraseña del docente
    const generateTeacherPassword = (rfc: string, teacherType: string) => {
        if (!rfc) return ""
        const prefix = teacherType === "titular" ? "CA" : "CB"
        const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase()
        return `${prefix}-${rfc}-${randomChars}`
    }

    // Obtener fecha actual para registro
    const getCurrentDate = () => {
        const today = new Date()
        return today.toLocaleDateString("es-MX")
    }

    const rfc = generateRFC(
        formData.firstName,
        formData.lastName,
        formData.birthDay,
        formData.birthMonth,
        formData.birthYear,
    )
    const teacherPassword = generateTeacherPassword(rfc, formData.teacherType)
    const registrationDate = getCurrentDate()

    const availableSubjects = [
        "Matemáticas",
        "Español",
        "Historia",
        "Geografía",
        "Ciencias Naturales",
        "Física",
        "Química",
        "Biología",
        "Inglés",
        "Educación Física",
        "Artes",
        "Tecnología",
    ]

    const availableWorkshops = [
        "Taller de Computación",
        "Taller de Música",
        "Taller de Arte",
        "Taller de Deportes",
        "Taller de Lectura",
        "Taller de Ciencias",
    ]

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubjectChange = (subject: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            subjects: checked ? [...prev.subjects, subject] : prev.subjects.filter((s) => s !== subject),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Datos del docente:", {
            ...formData,
            rfc,
            teacherPassword,
            registrationDate,
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/manage-users">
                            <Button variant="ghost" size="sm" className="text-gray-600">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver a Gestión de Usuarios
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
                        <Users className="w-8 h-8 mr-3 text-green-600" />
                        Registrar Nuevo Docente
                    </h1>
                    <p className="text-gray-600">Complete la información del nuevo profesor</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Información Personal */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="w-5 h-5 mr-2 text-green-600" />
                                Información Personal
                            </CardTitle>
                            <CardDescription>Datos personales del docente</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nombre(s) *</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Ingrese el nombre del docente"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Apellidos *</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Ingrese los apellidos del docente"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Fecha de Nacimiento *</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <Input
                                            placeholder="DD"
                                            value={formData.birthDay}
                                            onChange={(e) => handleInputChange("birthDay", e.target.value)}
                                            maxLength={2}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            placeholder="MM"
                                            value={formData.birthMonth}
                                            onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                                            maxLength={2}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            placeholder="YYYY"
                                            value={formData.birthYear}
                                            onChange={(e) => handleInputChange("birthYear", e.target.value)}
                                            maxLength={4}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Ingrese el número de teléfono"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico *</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Ingrese el correo electrónico"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información Académica */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                                Información Académica
                            </CardTitle>
                            <CardDescription>Tipo de docente y materias a impartir</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="teacherType">Tipo de Docente *</Label>
                                <Select value={formData.teacherType} onValueChange={(value) => handleInputChange("teacherType", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el tipo de docente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="titular">Docente Titular</SelectItem>
                                        <SelectItem value="suplente">Docente Suplente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label>Materias a Impartir (2-4 materias) *</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availableSubjects.map((subject) => (
                                        <div key={subject} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={subject}
                                                checked={formData.subjects.includes(subject)}
                                                onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                                            />
                                            <Label htmlFor={subject} className="text-sm">
                                                {subject}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Seleccione entre 2 y 4 materias. Los docentes de taller no pueden impartir materias generales.
                                </p>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <Label className="flex items-center">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Talleres Disponibles (Opcional)
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {availableWorkshops.map((workshop) => (
                                        <div key={workshop} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={workshop}
                                                checked={formData.subjects.includes(workshop)}
                                                onCheckedChange={(checked) => handleSubjectChange(workshop, checked as boolean)}
                                            />
                                            <Label htmlFor={workshop} className="text-sm">
                                                {workshop}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información del Sistema */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Key className="w-5 h-5 mr-2 text-purple-600" />
                                Información del Sistema
                            </CardTitle>
                            <CardDescription>Credenciales y datos generados automáticamente</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Fecha de Registro</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input value={registrationDate} disabled className="pl-10 bg-gray-50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>RFC Generado</Label>
                                    <Input value={rfc || "Se generará automáticamente"} disabled className="bg-gray-50 font-mono" />
                                    <p className="text-xs text-gray-500">Calculado automáticamente con los datos personales</p>
                                </div>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <h4 className="font-medium text-purple-800 mb-3 flex items-center">
                                    <Key className="w-4 h-4 mr-2" />
                                    Contraseña de Acceso
                                </h4>
                                <div className="space-y-2">
                                    <Input
                                        value={teacherPassword || "Se generará automáticamente"}
                                        disabled
                                        className="bg-white font-mono"
                                    />
                                    <p className="text-xs text-purple-600">
                                        Formato: {formData.teacherType === "titular" ? "CA" : "CB"}-[RFC sin guiones]-[3 caracteres
                                        aleatorios]
                                    </p>
                                </div>
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
                                        <li>• Cada docente puede impartir de 2 a 4 materias</li>
                                        <li>• Los docentes de taller no pueden impartir materias generales</li>
                                        <li>• El RFC se genera automáticamente con los datos personales</li>
                                        <li>• La contraseña inicial debe ser cambiada en el primer acceso</li>
                                        <li>• Límite máximo: 25 docentes en el sistema</li>
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
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Registrar Docente
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}