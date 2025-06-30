import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { parseStringPromise, Builder } from "xml2js"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const dataDir = path.join(process.cwd(), "data")

    // 1. Leer archivos XML
    const alumnosPath = path.join(dataDir, "alumnos.xml")
    const padresPath = path.join(dataDir, "padres.xml")

    const alumnosXml = fs.readFileSync(alumnosPath, "utf-8")
    const padresXml = fs.readFileSync(padresPath, "utf-8")

    const alumnosJson = await parseStringPromise(alumnosXml)
    const padresJson = await parseStringPromise(padresXml)

    // 2. Crear nuevos nodos
    const nuevoAlumno = {
      $: { boleta: body.studentId },
      nombre: [body.firstName],
      apellidos: [body.lastName],
      email: [body.parentEmail], // o un campo nuevo si tienes email del alumno
      grupo: ["Sin grupo"],
      direccion: [body.address],
      padecimientos: [body.medicalConditions || ""],
      usuario: [`${body.firstName.toLowerCase()}.${body.lastName.toLowerCase()}`],
      contrasena: [body.studentPassword],
      estadoCuenta: ["Activa"],
    }

    const nuevoPadre = {
      $: { id: body.parentUser },
      nombre: [body.parentName.split(" ")[0]],
      apellidos: [body.parentName.split(" ").slice(1).join(" ")],
      email: [body.parentEmail],
      hijoBoleta: [body.studentId],
      usuario: [body.parentUser],
      contrasena: [body.parentPassword],
      estadoCuenta: ["Activa"],
    }

    // 3. Agregar a las estructuras
    alumnosJson.alumnos.alumno.push(nuevoAlumno)
    padresJson.padres.padre.push(nuevoPadre)

    // 4. Convertir a XML y guardar
    const builder = new Builder()
    const alumnosActualizados = builder.buildObject(alumnosJson)
    const padresActualizados = builder.buildObject(padresJson)

    fs.writeFileSync(alumnosPath, alumnosActualizados)
    fs.writeFileSync(padresPath, padresActualizados)

    return NextResponse.json({ message: "Alumno y padre registrados correctamente" })
  } catch (error) {
    console.error("Error al agregar alumno:", error)
    return NextResponse.json({ error: "No se pudo agregar el alumno" }, { status: 500 })
  }
}
