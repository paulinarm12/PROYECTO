import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parseStringPromise } from "xml2js";

export async function GET() {
  try {
    // Rutas absolutas a los XML
    const alumnosPath = path.join(process.cwd(), "data/alumnos.xml");
    const docentesPath = path.join(process.cwd(), "data/docentes.xml");
    const padresPath = path.join(process.cwd(), "data/padres.xml");

    // Leer los XML
    const alumnosXML = fs.readFileSync(alumnosPath, "utf-8");
    const docentesXML = fs.readFileSync(docentesPath, "utf-8");
    const padresXML = fs.readFileSync(padresPath, "utf-8");

    // Parsearlos con xml2js
    const alumnosJson = await parseStringPromise(alumnosXML, { explicitArray: false, attrkey: "attrs" });
    const docentesJson = await parseStringPromise(docentesXML, { explicitArray: false, attrkey: "attrs" });
    const padresJson = await parseStringPromise(padresXML, { explicitArray: false, attrkey: "attrs" });

    // Alumnos
    const alumnosRaw = alumnosJson.alumnos.alumno;
    const alumnos = Array.isArray(alumnosRaw) ? alumnosRaw : [alumnosRaw];
    const alumnosMapped = alumnos.map((a: any) => ({
      rol: "Alumno",
      nombre: `${a.nombre || ""} ${a.apellidos || ""}`,
      id: a.attrs?.boleta || "Sin boleta",
      email: a.email || "",
      grupo: a.grupo || "",
      estadoCuenta: a.estadoCuenta || "",
      usuario: a.usuario || "",
    }));

    // Docentes
    const docentesRaw = docentesJson.docentes.docente;
    const docentes = Array.isArray(docentesRaw) ? docentesRaw : [docentesRaw];
    const docentesMapped = docentes.map((d: any) => ({
      rol: "Docente",
      nombre: `${d.nombre || ""} ${d.apellidos || ""}`,
      id: `CA-${d.attrs?.rfc || "Sin RFC"}`,
      email: d.email || "",
      grupo: d.tipo || "",
      estadoCuenta: d.estadoCuenta || "",
      usuario: d.usuario || "",
    }));

    // Padres
    const padresRaw = padresJson.padres.padre;
    const padres = Array.isArray(padresRaw) ? padresRaw : [padresRaw];
    const padresMapped = padres.map((p: any) => ({
      rol: "Padre/Tutor",
      nombre: `${p.nombre || ""} ${p.apellidos || ""}`,
      id: p.attrs?.id || "Sin ID",
      email: p.email || "",
      grupo: p.hijoBoleta || "", // Referencia al alumno
      estadoCuenta: p.estadoCuenta || "",
      usuario: p.usuario || "",
    }));

    // Unir todo
    const usuarios = [...alumnosMapped, ...docentesMapped, ...padresMapped];

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar los datos." },
      { status: 500 }
    );
  }
}