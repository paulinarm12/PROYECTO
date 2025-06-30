import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { parseStringPromise } from "xml2js"
const { Builder } = require("xml2js")

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data")

    const alumnosXML = fs.readFileSync(path.join(dataDir, "alumnos.xml"), "utf-8")
    const docentesXML = fs.readFileSync(path.join(dataDir, "docentes.xml"), "utf-8")
    const padresXML = fs.readFileSync(path.join(dataDir, "padres.xml"), "utf-8")

    const alumnosJson = await parseStringPromise(alumnosXML)
    const docentesJson = await parseStringPromise(docentesXML)
    const padresJson = await parseStringPromise(padresXML)

    const alumnos = alumnosJson.alumnos.alumno.map((a: any) => {
      const boleta = a.$.boleta
      const padre = padresJson.padres.padre.find((p: any) => p.hijoBoleta[0] === boleta)

      return {
        rol: "Alumno",
        nombre: `${a.nombre[0]} ${a.apellidos[0]}`,
        id: boleta,
        email: padre?.email[0] || "",
        telefono: padre?.telefono?.[0] || "",
        grupo: a.grupo[0],
        direccion: a.direccion[0],
        padecimientos: a.padecimientos?.[0] || "",
        usuario: a.usuario[0],
        contrasena: a.contrasena[0],
        estadoCuenta: a.estadoCuenta[0],
      }
    })

    const padres = padresJson.padres.padre.map((p: any) => ({
      rol: "Padre",
      nombre: `${p.nombre[0]} ${p.apellidos[0]}`,
      id: p.$.id,
      email: p.email[0],
      grupo: p.hijoBoleta[0],
      estadoCuenta: p.estadoCuenta[0],
      usuario: p.usuario[0],
      contrasena: p.contrasena?.[0] || "",
      telefono: p.telefono?.[0] || "",
    }))

    const docentes = docentesJson.docentes.docente.map((d: any) => ({
      rol: "Docente",
      nombre: `${d.nombre[0]} ${d.apellidos[0]}`,
      id: `CA-${d.$.rfc}`,
      email: d.email[0],
      telefono: d.telefono?.[0] || "",
      grupo: d.tipo?.[0] || "",
      estadoCuenta: d.estadoCuenta[0],
      usuario: d.usuario[0],
      contrasena: d.contrasena?.[0] || "",
    }))

    const usuarios = [...alumnos, ...docentes, ...padres]

    return NextResponse.json(usuarios)
  } catch (error) {
    console.error("Error al cargar usuarios:", error)
    return NextResponse.json([])
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const dataDir = path.join(process.cwd(), "data")

    let fileName = ""
    if (body.role === "Alumno") fileName = "alumnos.xml"
    else if (body.role === "Docente") fileName = "docentes.xml"
    else if (body.role === "Padre") fileName = "padres.xml"
    else throw new Error("Rol inválido")

    const filePath = path.join(dataDir, fileName)
    const xmlData = fs.readFileSync(filePath, "utf8")
    const json = await parseStringPromise(xmlData)

    let updated = false

    if (fileName === "alumnos.xml") {
      const alumnos = json.alumnos.alumno
      for (let alumno of alumnos) {
        if (alumno.$.boleta === body.id) {
          alumno.nombre[0] = body.name || ""
          alumno.apellidos[0] = body.apellidos || ""
          alumno.email[0] = body.email || ""
          alumno.grupo[0] = body.group || ""
          alumno.usuario[0] = body.username || ""
          alumno.contrasena[0] = body.password || ""
          alumno.estadoCuenta[0] = body.isBlocked ? "Bloqueada" : "Activa"
          updated = true
        }
      }
    }

    if (fileName === "docentes.xml") {
      const docentes = json.docentes.docente
      for (let docente of docentes) {
        if (`CA-${docente.$.rfc}` === body.id) {
          docente.nombre[0] = body.name || ""
          docente.apellidos[0] = body.apellidos || ""
          docente.email[0] = body.email || ""
          docente.tipo[0] = body.status || ""
          docente.usuario[0] = body.username || ""
          docente.contrasena[0] = body.password || ""
          docente.telefono[0] = body.telefono || "0000000000"
          docente.estadoCuenta[0] = body.isBlocked ? "Bloqueada" : "Activa"
          updated = true
        }
      }
    }

    if (fileName === "padres.xml") {
      const padres = json.padres.padre
      for (let padre of padres) {
        if (padre.$.id === body.id) {
          const [nombre, apellidos] = body.name.split(" ", 2)
          padre.nombre[0] = nombre || ""
          padre.apellidos[0] = apellidos || ""
          padre.email[0] = body.email
          padre.telefono[0] = body.telefono || "0000000000"
          padre.hijoBoleta[0] = body.group
          padre.usuario[0] = body.username
          padre.estadoCuenta[0] = body.isBlocked ? "Bloqueada" : "Activa"
          updated = true
        }
      }
    }

    if (!updated) throw new Error("Usuario no encontrado")

    const builder = new Builder()
    const updatedXml = builder.buildObject(json)
    fs.writeFileSync(filePath, updatedXml)

    return NextResponse.json({ message: "Usuario actualizado" })
  } catch (error) {
    console.error("Error al editar usuario:", error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const dataDir = path.join(process.cwd(), "data")

    let fileName = ""
    if (body.role === "Alumno") fileName = "alumnos.xml"
    else if (body.role === "Docente") fileName = "docentes.xml"
    else if (body.role === "Padre") fileName = "padres.xml"
    else throw new Error("Rol inválido")

    const filePath = path.join(dataDir, fileName)
    const xmlData = fs.readFileSync(filePath, "utf8")
    const json = await parseStringPromise(xmlData)

    let removed = false

    if (fileName === "alumnos.xml") {
      const alumnos = json.alumnos.alumno
      const index = alumnos.findIndex((a) => a.$.boleta === body.id)
      if (index !== -1) {
        alumnos.splice(index, 1)
        removed = true
      }
    }

    if (fileName === "docentes.xml") {
      const docentes = json.docentes.docente
      const index = docentes.findIndex((d) => `CA-${d.$.rfc}` === body.id)
      if (index !== -1) {
        docentes.splice(index, 1)
        removed = true
      }
    }

    if (fileName === "padres.xml") {
      const padres = json.padres.padre
      const index = padres.findIndex((p) => p.$.id === body.id)
      if (index !== -1) {
        padres.splice(index, 1)
        removed = true
      }
    }

    if (!removed) throw new Error("Usuario no encontrado")

    const builder = new Builder()
    const updatedXml = builder.buildObject(json)
    fs.writeFileSync(filePath, updatedXml)

    return NextResponse.json({ message: "Usuario eliminado" })
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "docentes.xml")
    const xmlData = fs.readFileSync(filePath, "utf8")
    const json = await parseStringPromise(xmlData)

    const nuevoDocente = {
      $: { rfc: body.rfc },
      nombre: [body.nombre],
      apellidos: [body.apellidos],
      email: [body.email],
      telefono: [body.telefono],
      estadoCuenta: ["Activa"],
      usuario: [body.usuario],
      contrasena: [body.contrasena],
      materias: [{ materia: body.materias }],
      talleres: [{ taller: body.talleres || [] }],
    }

    json.docentes.docente.push(nuevoDocente)

    const builder = new Builder()
    const updatedXml = builder.buildObject(json)
    fs.writeFileSync(filePath, updatedXml)

    return NextResponse.json({ message: "Docente agregado correctamente." })
  } catch (error) {
    console.error("Error al agregar docente:", error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
