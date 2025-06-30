"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, BookOpen, HelpCircle } from "lucide-react"

interface Props {
  onNavigate: (page: string) => void
}

export default function TeacherHelp({ onNavigate }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const tutorials = [
    {
      id: "grades",
      title: "Registro de Calificaciones",
      description: "Aprende a registrar y gestionar las calificaciones de tus estudiantes paso a paso",
      duration: "Lectura: 5 min",
      content: {
        introduction:
          "El sistema de registro de calificaciones te permite capturar las calificaciones finales de tus estudiantes de manera sencilla y organizada.",
        steps: [
          {
            step: 1,
            title: "Acceder al módulo",
            description:
              "Desde el dashboard principal, haz clic en el botón 'Registrar Calificaciones' en la sección de acciones rápidas.",
            details:
              "También puedes acceder desde el menú lateral o usando el enlace directo en la barra de navegación superior.",
          },
          {
            step: 2,
            title: "Seleccionar materia y grupo",
            description:
              "En la sección de filtros, selecciona primero la materia que vas a calificar. Una vez seleccionada, aparecerán los grupos disponibles para esa materia.",
            details:
              "Solo aparecerán las materias y grupos que tienes asignados. Si no ves alguna materia, contacta al administrador.",
          },
          {
            step: 3,
            title: "Buscar estudiantes",
            description:
              "Utiliza el campo de búsqueda para encontrar estudiantes específicos por nombre o número de boleta.",
            details:
              "La búsqueda es en tiempo real y no distingue entre mayúsculas y minúsculas. Puedes buscar por nombre completo o parcial.",
          },
          {
            step: 4,
            title: "Ingresar calificaciones",
            description:
              "En la columna 'Nueva Calificación', ingresa la calificación numérica del estudiante (rango de 0 a 100).",
            details:
              "Puedes usar decimales (ej: 85.5). El sistema validará automáticamente que la calificación esté en el rango correcto.",
          },
          {
            step: 5,
            title: "Verificar y guardar",
            description:
              "Revisa todas las calificaciones ingresadas y haz clic en 'Guardar Calificaciones' para confirmar los cambios.",
            details:
              "Una vez guardadas, las calificaciones se reflejarán inmediatamente en el sistema y estarán disponibles para consulta de estudiantes y padres.",
          },
        ],
        tips: [
          "Puedes modificar calificaciones ya guardadas mientras tengas acceso al sistema",
          "Las calificaciones se muestran con colores según el rendimiento: Verde (Excelente), Azul (Muy Bueno), Amarillo (Bueno), Naranja (Suficiente), Rojo (Insuficiente)",
          "Si un estudiante no aparece en la lista, verifica que hayas seleccionado el grupo correcto",
        ],
      },
    },
    {
      id: "attendance",
      title: "Control de Asistencia",
      description: "Guía completa para registrar la asistencia de estudiantes por clase",
      duration: "Lectura: 4 min",
      content: {
        introduction:
          "El control de asistencia te permite llevar un registro preciso de la presencia de tus estudiantes en cada clase.",
        steps: [
          {
            step: 1,
            title: "Acceder al registro de asistencia",
            description:
              "Desde el dashboard, selecciona 'Registrar Asistencia' o navega directamente al módulo correspondiente.",
            details:
              "El módulo está disponible durante todo el horario escolar para facilitar el registro en tiempo real.",
          },
          {
            step: 2,
            title: "Configurar los filtros de clase",
            description:
              "Selecciona la materia, grupo, fecha y hora de clase correspondiente. Todos los campos son obligatorios.",
            details:
              "La fecha por defecto es el día actual, pero puedes seleccionar fechas anteriores si necesitas hacer correcciones.",
          },
          {
            step: 3,
            title: "Revisar la lista de estudiantes",
            description:
              "Una vez configurados los filtros, aparecerá la lista completa de estudiantes del grupo seleccionado.",
            details: "Los estudiantes aparecen ordenados alfabéticamente por apellido para facilitar la localización.",
          },
          {
            step: 4,
            title: "Marcar asistencia individual",
            description:
              "Para cada estudiante, haz clic en 'Presente' o 'Ausente' según corresponda. El estado se marcará visualmente.",
            details:
              "Puedes cambiar el estado de un estudiante las veces que sea necesario antes de guardar la asistencia.",
          },
          {
            step: 5,
            title: "Usar opciones masivas (opcional)",
            description:
              "Utiliza los botones 'Todos' o 'Ninguno' para marcar rápidamente a todos los estudiantes como presentes o ausentes.",
            details: "Esta función es útil cuando la mayoría de estudiantes tienen el mismo estado de asistencia.",
          },
          {
            step: 6,
            title: "Guardar la asistencia",
            description:
              "Una vez marcada la asistencia de todos los estudiantes, haz clic en 'Guardar Asistencia' para confirmar.",
            details:
              "La asistencia guardada se reflejará inmediatamente en las estadísticas y estará disponible para reportes.",
          },
        ],
        tips: [
          "Las estadísticas de asistencia se actualizan en tiempo real mientras marcas a los estudiantes",
          "Puedes corregir la asistencia el mismo día sin restricciones",
          "Para correcciones de días anteriores, contacta al administrador",
          "El porcentaje de asistencia se calcula automáticamente",
        ],
      },
    },
    {
      id: "incidents",
      title: "Consulta de Incidencias Graves",
      description: "Cómo consultar el estado de las incidencias graves reportadas",
      duration: "Lectura: 3 min",
      content: {
        introduction:
          "En esta sección puedes consultar todas las incidencias graves que has reportado y que están pendientes de aprobación administrativa.",
        steps: [
          {
            step: 1,
            title: "Acceder al módulo de incidencias",
            description:
              "Desde el dashboard, haz clic en 'Registrar Incidencia' para acceder al módulo de gestión de incidencias.",
            details:
              "Solo se muestran las incidencias clasificadas como 'Graves' que requieren aprobación administrativa.",
          },
          {
            step: 2,
            title: "Revisar el resumen",
            description:
              "En la parte superior verás un resumen con el número total de incidencias pendientes de aprobación.",
            details: "Este contador se actualiza automáticamente cuando el administrador procesa las incidencias.",
          },
          {
            step: 3,
            title: "Consultar el historial",
            description:
              "En la tabla principal puedes ver todos los detalles de cada incidencia: folio, estudiante, tipo, fecha y estado.",
            details:
              "Cada incidencia tiene un folio único que puedes usar para hacer seguimiento con la administración.",
          },
          {
            step: 4,
            title: "Verificar notificaciones",
            description:
              "La columna 'Notificación' confirma que se envió el correo automático al padre/tutor del estudiante.",
            details: "Todas las incidencias graves generan automáticamente una notificación por correo electrónico.",
          },
          {
            step: 5,
            title: "Registrar nuevas incidencias",
            description:
              "Usa el botón 'Nueva Incidencia' para reportar nuevos comportamientos que requieran atención administrativa.",
            details: "El formulario te guiará paso a paso para completar todos los datos necesarios del reporte.",
          },
        ],
        tips: [
          "Las incidencias permanecen en estado 'Pendiente' hasta que el administrador las revise",
          "Una vez aprobadas, el administrador asignará las sanciones correspondientes",
          "Puedes usar el folio de la incidencia para hacer seguimiento con la administración",
          "Los padres reciben automáticamente una copia del reporte por correo electrónico",
        ],
      },
    },
    {
      id: "schedule",
      title: "Consulta de Horarios",
      description: "Cómo consultar y entender tu horario semanal de clases",
      duration: "Lectura: 3 min",
      content: {
        introduction:
          "El módulo de horarios te permite consultar tu programación semanal de clases de manera clara y organizada.",
        steps: [
          {
            step: 1,
            title: "Acceder a los horarios",
            description:
              "Desde el dashboard, haz clic en 'Ver Horarios' para acceder a tu programación semanal completa.",
            details: "El horario se muestra automáticamente para la semana actual del ciclo escolar.",
          },
          {
            step: 2,
            title: "Entender el resumen por materia",
            description:
              "En la parte superior verás un resumen que muestra cuántas clases tienes de cada materia durante la semana.",
            details:
              "Cada materia tiene un color distintivo que se mantiene consistente en todo el horario para fácil identificación.",
          },
          {
            step: 3,
            title: "Leer el horario semanal",
            description:
              "El horario se presenta en formato de tabla con las horas en filas y los días de la semana en columnas.",
            details: "Las clases van de 8:00 AM a 2:00 PM, divididas en bloques de una hora cada uno.",
          },
          {
            step: 4,
            title: "Identificar horas libres",
            description:
              "Las horas libres aparecen marcadas claramente y pueden usarse para preparación de clases o atención a padres.",
            details: "Las horas libres están distribuidas estratégicamente para permitir descansos entre clases.",
          },
          {
            step: 5,
            title: "Exportar o imprimir",
            description: "Utiliza los botones de 'Exportar' o 'Imprimir' para obtener una copia física de tu horario.",
            details: "Útil para tener una referencia rápida o para compartir con la administración si es necesario.",
          },
        ],
        tips: [
          "Cada materia tiene un color específico para fácil identificación visual",
          "Los horarios pueden cambiar por eventos especiales - consulta regularmente",
          "Las horas de receso y almuerzo están integradas en el horario general",
          "Contacta a la administración si detectas algún error en tu horario",
        ],
      },
    },
  ]

  const filteredTutorials = tutorials.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header con botón funcional */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              onClick={() => onNavigate("dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <HelpCircle className="w-3 h-3 mr-1" />
              Tutoriales
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Tutoriales del Sistema</h1>
          <p className="text-gray-600">Guías paso a paso para usar todas las funciones del sistema</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar tutoriales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tutorials */}
        <div className="space-y-6">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                      <CardDescription className="mt-1">{tutorial.description}</CardDescription>
                      <Badge variant="secondary" className="mt-2">
                        {tutorial.duration}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Introduction */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-900 mb-2">Introducción</h4>
                  <p className="text-blue-800 text-sm">{tutorial.content.introduction}</p>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Pasos a seguir:</h4>
                  <Accordion type="single" collapsible className="space-y-2">
                    {tutorial.content.steps.map((step, index) => (
                      <AccordionItem key={index} value={`step-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                            <span className="font-medium">{step.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="ml-9 space-y-3">
                            <p className="text-gray-700">{step.description}</p>
                            <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-300">
                              <p className="text-sm text-gray-600">
                                <strong>Detalles adicionales:</strong> {step.details}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Tips */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-medium text-green-900 mb-3">Consejos útiles:</h4>
                  <ul className="space-y-2">
                    {tutorial.content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-green-800">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {searchTerm && filteredTutorials.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tutoriales</h3>
              <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}