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
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const [editingUser, setEditingUser] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    group: "",
    status: "",
    isBlocked: false,
    username: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  // Datos simulados - en producción vendrían de la API
  const users = [
    {
      id: "B20241234",
      name: "Ethan Carter",
      role: "Alumno",
      email: "ethan.carter@example.com",
      group: "2°A",
      status: "Activo",
      isBlocked: false,
      username: "ethan.carter",
      password: "alumno123",
    },
    {
      id: "CA-BENO850101-ABC",
      name: "Olivia Bennett",
      role: "Docente",
      email: "olivia.bennett@example.com",
      group: "Matemáticas",
      status: "Activo",
      isBlocked: false,
      username: "olivia.bennett",
      password: "docente456",
    },
    {
      id: "BA-B20241234",
      name: "Noah Thompson",
      role: "Padre",
      email: "noah.thompson@example.com",
      group: "Ethan Carter",
      status: "Activo",
      isBlocked: false,
      username: "noah.thompson",
      password: "padre789",
    },
    {
      id: "B20241567",
      name: "Ava Harper",
      role: "Alumno",
      email: "ava.harper@example.com",
      group: "1°B",
      status: "Activo",
      isBlocked: true,
      username: "ava.harper",
      password: "alumno321",
    },
    {
      id: "CB-FOSL920315-XYZ",
      name: "Liam Foster",
      role: "Docente",
      email: "liam.foster@example.com",
      group: "Historia",
      status: "Suplente",
      isBlocked: false,
      username: "liam.foster",
      password: "docente654",
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

  const handleEditUser = (user) => {
    setEditingUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      group: user.group,
      status: user.status || "Activo",
      isBlocked: user.isBlocked || false,
      username: user.username,
      password: user.password,
    })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    // Aquí actualizarías los datos en tu base de datos
    // Por ahora solo actualizamos el estado local
    const updatedUsers = users.map((user) => (user.id === editingUser.id ? { ...user, ...editForm } : user))

    // En una aplicación real, harías una llamada a la API aquí
    console.log("Usuario actualizado:", { ...editingUser, ...editForm })

    setIsEditModalOpen(false)
    setEditingUser(null)

    // Mostrar mensaje de éxito (podrías usar toast aquí)
    alert("Usuario actualizado correctamente")
  }

  const handleCancelEdit = () => {
    setIsEditModalOpen(false)
    setEditingUser(null)
    setShowPassword(false)
    setEditForm({
      name: "",
      email: "",
      role: "",
      group: "",
      status: "",
      isBlocked: false,
      username: "",
      password: "",
    })
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
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Modal de Edición */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription>
                Modifica la información del usuario. Los cambios se guardarán al hacer clic en "Guardar cambios".
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Rol
                </Label>
                <Select value={editForm.role} onValueChange={(value) => setEditForm({ ...editForm, role: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alumno">Alumno</SelectItem>
                    <SelectItem value="Docente">Docente</SelectItem>
                    <SelectItem value="Padre">Padre/Tutor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campo Grupo - Solo para Alumnos y Padres */}
              {editForm.role !== "Docente" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-group" className="text-right">
                    Grupo
                  </Label>
                  <Input
                    id="edit-group"
                    value={editForm.group}
                    onChange={(e) => setEditForm({ ...editForm, group: e.target.value })}
                    className="col-span-3"
                    placeholder={editForm.role === "Alumno" ? "Ej: 2°A, 3°B" : "Ej: Nombre del hijo"}
                  />
                </div>
              )}

              {/* Estado - Solo para Docentes */}
              {editForm.role === "Docente" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Estado
                  </Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Suplente">Suplente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Estado de Bloqueo */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-blocked" className="text-right">
                  Estado de Cuenta
                </Label>
                <Select
                  value={editForm.isBlocked ? "blocked" : "active"}
                  onValueChange={(value) => setEditForm({ ...editForm, isBlocked: value === "blocked" })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="blocked">Bloqueada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Separador */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Credenciales de Acceso</h4>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-username" className="text-right">
                    Usuario
                  </Label>
                  <Input
                    id="edit-username"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="col-span-3"
                    placeholder="Nombre de usuario para login"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="edit-password" className="text-right">
                    Contraseña
                  </Label>
                  <div className="col-span-3 relative">
                    <Input
                      id="edit-password"
                      type={showPassword ? "text" : "password"}
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                      className="pr-10"
                      placeholder="Contraseña de acceso"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>Guardar cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}