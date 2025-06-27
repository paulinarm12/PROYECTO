"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  UserPlus,
  GraduationCap,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  ArrowLeft,
} from "lucide-react"

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  // Datos simulados - en producción vendrían de la API
  const users = [
    {
      id: "B20241234",
      name: "Ethan Carter",
      role: "Alumno",
      email: "ethan.carter@example.com",
      group: "2°A",
      status: "Activo",
    },
    {
      id: "CA-BENO850101-ABC",
      name: "Olivia Bennett",
      role: "Docente",
      email: "olivia.bennett@example.com",
      group: "Matemáticas",
      status: "Activo",
    },
    {
      id: "BA-B20241234",
      name: "Noah Thompson",
      role: "Padre",
      email: "noah.thompson@example.com",
      group: "Ethan Carter",
      status: "Activo",
    },
    {
      id: "B20241567",
      name: "Ava Harper",
      role: "Alumno",
      email: "ava.harper@example.com",
      group: "1°B",
      status: "Activo",
    },
    {
      id: "CB-FOSL920315-XYZ",
      name: "Liam Foster",
      role: "Docente",
      email: "liam.foster@example.com",
      group: "Historia",
      status: "Suplente",
    },
  ]

  const getRoleBadge = (role: string, status?: string) => {
    switch (role) {
      case "Alumno":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Alumno</Badge>
      case "Docente":
        return (
          <Badge
            className={`${status === "Suplente" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"} hover:bg-current`}
          >
            {status === "Suplente" ? "Docente Suplente" : "Docente"}
          </Badge>
        )
      case "Padre":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Padre/Tutor</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    return matchesSearch && matchesRole
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
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
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600">Agregar, eliminar y modificar cuentas de usuario del sistema</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buscar y Filtrar Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="alumno">Alumnos</SelectItem>
                  <SelectItem value="docente">Docentes</SelectItem>
                  <SelectItem value="padre">Padres/Tutores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Usuarios Actuales</CardTitle>
            <CardDescription>
              Mostrando {filteredUsers.length} de {users.length} usuarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>ID/Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Grupo/Materia</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{getRoleBadge(user.role, user.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{user.id}</TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell>{user.group}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add User Actions */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <UserPlus className="w-5 h-5 mr-2" />
              Agregar Nuevos Usuarios
            </CardTitle>
            <CardDescription>Selecciona el tipo de usuario que deseas registrar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-blue-600 hover:bg-blue-700">
                <GraduationCap className="w-6 h-6" />
                <span className="font-medium">Agregar Alumno</span>
                <span className="text-xs opacity-90">Inscribir nuevo estudiante</span>
              </Button>
              <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-green-600 hover:bg-green-700">
                <Users className="w-6 h-6" />
                <span className="font-medium">Agregar Docente</span>
                <span className="text-xs opacity-90">Registrar nuevo profesor</span>
              </Button>
              <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-purple-600 hover:bg-purple-700">
                <User className="w-6 h-6" />
                <span className="font-medium">Agregar Padre</span>
                <span className="text-xs opacity-90">Registrar padre/tutor</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Alumnos</p>
                  <p className="text-2xl font-bold text-blue-600">180</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Docentes</p>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Padres</p>
                  <p className="text-2xl font-bold text-purple-600">165</p>
                </div>
                <User className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cuentas Bloqueadas</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
