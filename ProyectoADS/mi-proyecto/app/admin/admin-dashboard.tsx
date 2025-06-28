"use client"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  UsersRound,
  UserCheck,
  GraduationCap,
  FileText,
  Shield,
  AlertTriangle,
} from "lucide-react"

export default function AdminDashboard() {
  const reportesPendientes = 7

  const mainFunctions = [
    {
      title: "Gestión de Usuarios",
      description: "Administrar alumnos, docentes, padres y administradores",
      icon: Users,
      color: "bg-blue-500 hover:bg-blue-600",
      stats: "180 Alumnos • 18 Docentes • 165 Padres",
      link: "/manage-users",
    },
    {
      title: "Gestión de Grupos",
      description: "Organizar grupos, materias y asignaciones docentes",
      icon: UsersRound,
      color: "bg-green-500 hover:bg-green-600",
      stats: "6 Grupos • 24 Materias • 3 Talleres",
      link: "/manage-groups"
    },
    {
      title: "Gestión de Asistencias",
      description: "Supervisar y administrar la asistencia escolar",
      icon: UserCheck,
      color: "bg-purple-500 hover:bg-purple-600",
      stats: "92.5% Promedio • 15 Faltas Justificadas",
    },
    {
      title: "Gestión de Calificaciones",
      description: "Supervisar el registro y consulta de calificaciones",
      icon: GraduationCap,
      color: "bg-orange-500 hover:bg-orange-600",
      stats: "8.2 Promedio General • 3 Docentes pendientes",
    },
    {
      title: "Gestión de Reportes",
      description: "Generar y administrar reportes del sistema",
      icon: FileText,
      color: "bg-red-500 hover:bg-red-600",
      stats: "12 Reportes este mes • 3 Incidencias graves",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <Shield className="w-3 h-3 mr-1" />
              Administrador
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Panel de Administración
          </h1>
          <p className="text-gray-600 text-lg">
            Sistema de Gestión Académica - Escuela Secundaria
          </p>
        </div>

        {/* Funciones principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainFunctions.map((func, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 rounded-full ${func.color} flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}
                >
                  <func.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {func.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {func.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-sm text-gray-500 mb-4 border-t pt-4">
                  {func.stats}
                </div>
                {func.link ? (
                  <Link href={func.link}>
                    <Button className="w-full" variant="outline">
                      Acceder
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    Acceder
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerta de reportes */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-800">
                    Reportes Pendientes por Aprobar
                  </h3>
                  <p className="text-amber-700">
                    Tienes{" "}
                    <span className="font-bold">{reportesPendientes}</span>{" "}
                    reportes de incidencias que requieren tu aprobación
                  </p>
                </div>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white" size="lg">
                Revisar Reportes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t pt-6">
          <p>Último acceso: Hoy 08:30 AM • Sistema actualizado</p>
        </div>
      </div>
    </div>
  )
}
