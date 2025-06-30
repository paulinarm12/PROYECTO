import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { parseStringPromise } from "xml2js"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "docentes.xml")

    // Leer archivo
    const xmlData = fs.readFileSync(filePath, "utf8")
    const json = await parseStringPromise(xmlData)

    // Crear nuevo docente
    const nuevoDocente = {
      $: { rfc: body.rfc },
      nombre: [body.nombre],
      apellidos: [body.apellidos],
      email: [body.email],
      telefono: [body.telefono],
      tipo: [body.tipo || "Titular"],
      estadoCuenta: ["Activa"],
      usuario: [body.usuario],
      contrasena: [body.contrasena],
      materias: [{ materia: body.materias || [] }],
      talleres: [{ taller: body.talleres || [] }],
    }

    // Agregar al array
    if (!json.docentes.docente) json.docentes.docente = []
    json.docentes.docente.push(nuevoDocente)

    // Guardar
    const builder = new (require("xml2js")).Builder()
    const updatedXml = builder.buildObject(json)
    fs.writeFileSync(filePath, updatedXml)

    return NextResponse.json({ message: "Docente agregado correctamente" })
  } catch (error) {
    console.error("Error al agregar docente:", error)
    return NextResponse.json({ error: "Error al guardar el docente" }, { status: 500 })
  }
}
