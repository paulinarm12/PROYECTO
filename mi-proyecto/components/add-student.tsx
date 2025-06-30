"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, GraduationCap, Shield, User, Phone, Mail, MapPin, Key, AlertCircle, Save } from "lucide-react"

export default function AddStudent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    medicalConditions: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
  })
  const router = useRouter()

  // Generar boleta automáticamente
  const generateStudentId = () => {
    const currentYear = new Date().getFullYear()
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    return `B${currentYear}${randomDigits}`
  }

  // Generar contraseña automáticamente
  const generatePassword = (firstName: string, lastName: string, studentId: string) => {
    if (!firstName || !lastName || !studentId) return ""
    const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
    const lastFourDigits = studentId.slice(-4)
    return `${initials}B${lastFourDigits}`
  }

  // Generar usuario del padre
  const generateParentUser = (studentId: string) => {
    if (!studentId) return ""
    return `BA-${studentId}`
  }

  // Generar contraseña del padre
  const generateParentPassword = (parentName: string, studentId: string) => {
    if (!parentName || !studentId) return ""
    const names = parentName.trim().split(" ")
    const initials = names.length >= 2 ? names[0].charAt(0) + names[1].charAt(0) : names[0].charAt(0)
    const lastFourDigits = studentId.slice(-4)
    return `${initials.toUpperCase()}BA${lastFourDigits}`
  }

  const [studentId] = useState(generateStudentId())
  const studentPassword = generatePassword(formData.firstName, formData.lastName, studentId)
  const parentUser = generateParentUser(studentId)
  const parentPassword = generateParentPassword(formData.parentName, studentId)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const response = await fetch("/api/agregar-alumno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        studentId,
        studentPassword,
        parentUser,
        parentPassword,
      }),
    })

    if (!response.ok) throw new Error("No se pudo registrar")

    alert("Alumno registrado correctamente.")
    router.push("/manage-users")
  } catch (error) {
    console.error("Error al registrar:", error)
    alert("Ocurrió un error al registrar el alumno.")
  }
}

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              onClick={() => router.push("/manage-users")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Gestión de Usuarios
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
            <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
            Inscribir Nuevo Estudiante
          </h1>
          <p className="text-gray-600">Complete la información del estudiante y su padre/tutor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Estudiante */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Información del Estudiante
              </CardTitle>
              <CardDescription>Datos personales y académicos del nuevo alumno</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre(s) *</Label>
                  <Input
                    id="firstName"
                    placeholder="Ingrese el nombre del estudiante"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos *</Label>
                  <Input
                    id="lastName"
                    placeholder="Ingrese los apellidos del estudiante"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Boleta del Estudiante</Label>
                  <div className="relative">
                    <Input id="studentId" value={studentId} disabled className="bg-gray-50" />
                    <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-800">
                      Auto-generada
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">Formato: B + Año + 4 dígitos aleatorios</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentPassword">Contraseña del Estudiante</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="studentPassword"
                      value={studentPassword || "Se generará automáticamente"}
                      disabled
                      className="pl-10 bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Formato: Iniciales + B + últimos 4 dígitos de boleta</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <Textarea
                    id="address"
                    placeholder="Ingrese la dirección completa del estudiante"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="pl-10 min-h-[80px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Padecimientos Médicos</Label>
                <Textarea
                  id="medicalConditions"
                  placeholder="Ingrese cualquier padecimiento médico relevante (opcional)"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                  className="min-h-[80px]"
                />
                <p className="text-xs text-gray-500">
                  Esta información es confidencial y solo será usada en emergencias
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Información del Padre/Tutor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                Información del Padre/Tutor
              </CardTitle>
              <CardDescription>Datos de contacto del responsable del estudiante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Nombre Completo del Padre/Tutor *</Label>
                <Input
                  id="parentName"
                  placeholder="Ingrese el nombre completo del padre o tutor"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange("parentName", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="parentPhone"
                      type="tel"
                      placeholder="Ingrese el número de teléfono"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Correo Electrónico *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="parentEmail"
                      type="email"
                      placeholder="Ingrese el correo electrónico"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Credenciales del Padre */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center">
                  <Key className="w-4 h-4 mr-2" />
                  Credenciales de Acceso del Padre/Tutor
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-purple-700">Usuario</Label>
                    <Input value={parentUser || "Se generará automáticamente"} disabled className="bg-white" />
                    <p className="text-xs text-purple-600">Formato: BA-[boleta del hijo]</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-purple-700">Contraseña</Label>
                    <Input value={parentPassword || "Se generará automáticamente"} disabled className="bg-white" />
                    <p className="text-xs text-purple-600">Formato: Iniciales + BA + últimos 4 dígitos de boleta</p>
                  </div>
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
                    <li>• Las credenciales se generarán automáticamente según las reglas del sistema</li>
                    <li>• Se registrarán tanto el estudiante como el padre/tutor simultáneamente</li>
                    <li>• Las contraseñas iniciales deberán ser cambiadas en el primer acceso</li>
                    <li>• La información médica es confidencial y solo accesible por personal autorizado</li>
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
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Inscribir Estudiante
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
