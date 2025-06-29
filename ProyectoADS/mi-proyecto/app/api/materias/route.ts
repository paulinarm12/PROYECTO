import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { parseStringPromise, Builder } from "xml2js"

const xmlPath = path.join(process.cwd(), "data", "materias.xml")

async function readMateriasXML() {
  const xmlData = await fs.readFile(xmlPath, "utf-8")
  const result = await parseStringPromise(xmlData)
  return result
}

async function writeMateriasXML(data: any) {
  const builder = new Builder()
  const xml = builder.buildObject(data)
  await fs.writeFile(xmlPath, xml)
}

// GET - Listar materias
export async function GET() {
  const result = await readMateriasXML()
  return NextResponse.json(result.materias.materia)
}

// POST - Crear nueva materia
export async function POST(req: Request) {
  const newMateria = await req.json()
  const result = await readMateriasXML()
  result.materias.materia.push({
    id: [newMateria.id],
    nombre: [newMateria.name],
    tipo: [newMateria.type],
    grado: [newMateria.grade],
    horasPorSemana: [newMateria.hoursPerWeek?.toString() || ""],
  })
  await writeMateriasXML(result)
  return NextResponse.json({ message: "Materia creada" }, { status: 201 })
}

// PUT - Actualizar materia existente
export async function PUT(req: Request) {
  const updated = await req.json()
  const result = await readMateriasXML()

  const index = result.materias.materia.findIndex((m: any) => m.id[0] === updated.id)
  if (index === -1) {
    return NextResponse.json({ message: "No encontrada" }, { status: 404 })
  }

  result.materias.materia[index] = {
    id: [updated.id],
    nombre: [updated.name],
    tipo: [updated.type],
    grado: [updated.grade],
    horasPorSemana: [updated.hoursPerWeek?.toString() || ""],
  }

  await writeMateriasXML(result)
  return NextResponse.json({ message: "Materia actualizada" })
}

// DELETE - Eliminar materia
export async function DELETE(req: Request) {
  const { id } = await req.json()
  const result = await readMateriasXML()

  result.materias.materia = result.materias.materia.filter((m: any) => m.id[0] !== id)

  await writeMateriasXML(result)
  return NextResponse.json({ message: "Materia eliminada" })
}
