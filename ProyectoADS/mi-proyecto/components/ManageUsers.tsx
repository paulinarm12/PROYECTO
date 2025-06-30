"use client"

import { useEffect } from "react"
import Link from "next/link"
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
    lastName: "",
    email: "",
    role: "",
    group: "",
    address: "",
    conditions: "",
    status: "",
    isBlocked: false,
    username: "",
    password: "",
    telefono: "",
  })



  const [showPassword, setShowPassword] = useState(false)

  // Datos simulados - en producción vendrían de la API
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/usuarios")
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error("Los datos no son una lista")
        const mappedUsers = data.map((u) => ({
          id: u.id,
          name: u.nombre,
          lastName: u.apellidos,
          role: u.rol,
          email: u.email,
          group: u.grupo,
          address: u.direccion || "",
          conditions: u.padecimientos || "",
          status: u.estadoCuenta,
          isBlocked: u.estadoCuenta !== "Activa",
          username: u.usuario,
          password: u.contrasena,
          telefono: u.telefono || "",
        }))

        setUsers(mappedUsers)
      } catch (error) {
        console.error("Error al cargar los usuarios:", error)
      }
    }

    fetchUsers()
  }, [])

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
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      group: user.group,
      address: user.address,
      conditions: user.conditions,
      status: user.status || "Titular", // ⬅️ Asegúrate que diga status, no group
      isBlocked: user.isBlocked || false,
      username: user.username,
      password: user.password,
      telefono: user.telefono || "",
    })

   setIsEditModalOpen(true)
  }

  const handleSaveEdit = async () => {
    try {
      const response = await fetch("/api/usuarios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          role: editForm.role,
          name: editForm.name,
          apellidos: editForm.lastName || "",
          email: editForm.email,
          group: editForm.group,
          status: editForm.status,
          isBlocked: editForm.isBlocked,
          username: editForm.username,
          password: editForm.password, // 👈 se enviará correctamente
          telefono: editForm.telefono,
        }),
      })

      if (!response.ok) throw new Error("Error en la edición")

      alert("Usuario editado correctamente.")
      setIsEditModalOpen(false)
      setEditingUser(null)
      window.location.reload()
    } catch (error) {
      console.error("Error al editar:", error)
      alert("No se pudo editar el usuario.")
    }
  }



  const handleCancelEdit = () => {
    setIsEditModalOpen(false)
    setEditingUser(null)
    setShowPassword(false)
    setEditForm({
      name: "",
      email: "",
      group: "",
      status: "",
      isBlocked: false,
      username: "",
      password: "",
    })
  }

  const handleDeleteUser = async (user) => {
    if (!confirm(`¿Estás segura de que quieres eliminar a ${user.name} ${user.lastName}?`)) return

    try {
      const response = await fetch("/api/usuarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          role: user.role,
        }),
      })

      if (!response.ok) throw new Error("Error al eliminar")

      alert("Usuario eliminado correctamente.")
      // Actualiza la lista
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
    } catch (error) {
      console.error("Error al eliminar:", error)
      alert("No se pudo eliminar el usuario.")
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
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
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
                  <SelectItem value="Alumno">Alumno</SelectItem>
                  <SelectItem value="Docente">Docente</SelectItem>
                  <SelectItem value="Padre/Tutor">Padre/Tutor</SelectItem>
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
                      <TableCell className="font-medium">{user.name} {user.lastName}</TableCell>
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
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user)}>
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
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Botón Agregar Alumno */}
              <Link href="/add-student">
                <button className="w-full h-full bg-blue-600 text-white rounded-xl py-8 text-center hover:bg-blue-700 transition">
                  <div className="flex flex-col items-center">
                    <GraduationCap className="w-6 h-6 mb-2" />
                    <span className="text-lg font-bold">Agregar Alumno</span>
                    <span className="text-sm">Inscribir nuevo estudiante</span>
                  </div>
                </button>
              </Link>

              {/* Botón Agregar Docente (puedes cambiar la ruta cuando la tengas) */}

              <Link href="/add-teacher">
                <button className="w-full h-full bg-green-600 text-white rounded-xl py-8 text-center hover:bg-green-700 transition">
                  <div className="flex flex-col items-center">
                    <Users className="w-6 h-6 mb-2" />
                    <span className="text-lg font-bold">Agregar Docente</span>
                    <span className="text-sm">Registrar nuevo profesor</span>
                  </div>
                </button>
              </Link>
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
                <Label htmlFor="edit-telefono" className="text-right">
                  Teléfono
                </Label>
                <Input
                  id="edit-telefono"
                  type="tel"
                  value={editForm.telefono}
                  onChange={(e) => setEditForm({ ...editForm, telefono: e.target.value })}
                  className="col-span-3"
                  placeholder="Número de contacto"
                />
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