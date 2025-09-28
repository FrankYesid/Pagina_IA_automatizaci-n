"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DraggableItem {
  id: string
  content: string
  category: string
}

interface MatchItem {
  id: string
  concept: string
  definition: string
  matched: boolean
}

export default function Home() {
  const [dragItems, setDragItems] = useState<DraggableItem[]>([
    { id: "1", content: "Machine Learning", category: "concept" },
    { id: "2", content: "Algoritmos que aprenden de datos", category: "definition" },
    { id: "3", content: "Redes Neuronales", category: "concept" },
    { id: "4", content: "Sistemas inspirados en el cerebro humano", category: "definition" },
    { id: "5", content: "Procesamiento de Lenguaje Natural", category: "concept" },
    { id: "6", content: "Capacidad para entender y generar lenguaje humano", category: "definition" }
  ])

  const [matches, setMatches] = useState<MatchItem[]>([
    { id: "1", concept: "Machine Learning", definition: "", matched: false },
    { id: "3", concept: "Redes Neuronales", definition: "", matched: false },
    { id: "5", concept: "Procesamiento de Lenguaje Natural", definition: "", matched: false }
  ])

  const [showResults, setShowResults] = useState(false)

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData("text/plain", itemId)
  }

  const handleDrop = (e: React.DragEvent, conceptId: string) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData("text/plain")
    const draggedItem = dragItems.find(item => item.id === itemId)
    
    if (draggedItem && draggedItem.category === "definition") {
      setMatches(prev => prev.map(match => 
        match.id === conceptId 
          ? { ...match, definition: draggedItem.content }
          : match
      ))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const checkAnswers = () => {
    // Definir las respuestas correctas
    const correctAnswers = {
      "1": "Algoritmos que aprenden de datos",
      "3": "Sistemas inspirados en el cerebro humano", 
      "5": "Capacidad para entender y generar lenguaje humano"
    }
    
    // Verificar cada respuesta y actualizar el estado matched
    setMatches(prev => prev.map(match => ({
      ...match,
      matched: match.definition === correctAnswers[match.id as keyof typeof correctAnswers]
    })))
    
    setShowResults(true)
  }

  const resetActivity = () => {
    setMatches(prev => prev.map(match => ({ ...match, definition: "", matched: false })))
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Inteligencia Artificial: Conceptos y Aplicaciones
          </h1>
          <p className="text-lg text-gray-600">
            Explora el fascinante mundo de la IA y su impacto en nuestra sociedad
          </p>
        </div>

        <Tabs defaultValue="conceptos" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="conceptos">Conceptos</TabsTrigger>
            <TabsTrigger value="aplicaciones">Aplicaciones</TabsTrigger>
            <TabsTrigger value="diferencias">Diferencias</TabsTrigger>
            <TabsTrigger value="comparativas">Tablas</TabsTrigger>
            <TabsTrigger value="actividad">Actividad</TabsTrigger>
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
          </TabsList>

          <TabsContent value="conceptos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>¿Qué es la Inteligencia Artificial?</CardTitle>
                <CardDescription>
                  Conceptos fundamentales y definiciones básicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Imagen principal de conceptos */}
                <div className="flex justify-center mb-6">
                  <img 
                    src="/ia-brain-circuits.png" 
                    alt="Cerebro con circuitos digitales representando la inteligencia artificial" 
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Definición</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        La Inteligencia Artificial (IA) es una rama de la informática que se dedica 
                        al desarrollo de sistemas capaces de realizar tareas que normalmente requieren 
                        inteligencia humana, como el aprendizaje, el razonamiento, la percepción 
                        y la toma de decisiones.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Objetivo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        El objetivo principal de la IA es crear máquinas que puedan pensar, aprender 
                        y adaptarse de manera similar a los humanos, mejorando continuamente su 
                        rendimiento sin intervención humana directa.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Tipos de Inteligencia Artificial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">IA Débil</h4>
                        <p className="text-sm text-gray-600">
                          Diseñada para tareas específicas y limitadas. Ej: Asistentes virtuales, 
                          sistemas de recomendación.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">IA Fuerte</h4>
                        <p className="text-sm text-gray-600">
                          Capaz de comprender, aprender y aplicar conocimiento en cualquier área, 
                          similar a la inteligencia humana.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-lg mb-2">Superinteligencia</h4>
                        <p className="text-sm text-gray-600">
                          Inteligencia que supera significativamente a la humana en prácticamente 
                          todos los aspectos.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aplicaciones" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Aplicaciones de la Inteligencia Artificial</CardTitle>
                <CardDescription>
                  Campos donde la IA está transformando nuestra vida cotidiana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Salud</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <img 
                          src="/ia-healthcare.png" 
                          alt="IA en salud - diagnóstico médico asistido" 
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Diagnóstico médico asistido</li>
                        <li>• Descubrimiento de fármacos</li>
                        <li>• Medicina personalizada</li>
                        <li>• Análisis de imágenes médicas</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Transporte</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <img 
                          src="/ia-transportation.png" 
                          alt="IA en transporte - vehículos autónomos" 
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Vehículos autónomos</li>
                        <li>• Optimización de rutas</li>
                        <li>• Predicción de tráfico</li>
                        <li>• Mantenimiento predictivo</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Educación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <img 
                          src="/ia-education.png" 
                          alt="IA en educación - aprendizaje personalizado" 
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Aprendizaje personalizado</li>
                        <li>• Tutores inteligentes</li>
                        <li>• Evaluación automática</li>
                        <li>• Análisis de progreso</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Finanzas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <img 
                          src="/ia-finance.png" 
                          alt="IA en finanzas - trading algorítmico" 
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Detección de fraudes</li>
                        <li>• Trading algorítmico</li>
                        <li>• Evaluación de riesgos</li>
                        <li>• Atención al cliente</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Retail</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <img 
                          src="/ia-retail.png" 
                          alt="IA en retail - recomendación de productos" 
                          className="rounded-lg w-full h-32 object-cover bg-gray-200"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Recomendación de productos</li>
                        <li>• Gestión de inventario</li>
                        <li>• Precios dinámicos</li>
                        <li>• Servicio al cliente</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Manufactura</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <img 
                          src="/ia-manufacturing.png" 
                          alt="IA en manufactura - robótica inteligente" 
                          className="rounded-lg w-full h-32 object-cover bg-gray-200"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Control de calidad</li>
                        <li>• Mantenimiento predictivo</li>
                        <li>• Optimización de procesos</li>
                        <li>• Robótica inteligente</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diferencias" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>IA vs Automatización de Procesos</CardTitle>
                <CardDescription>
                  Entendiendo las diferencias clave entre inteligencia artificial y automatización tradicional
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Imagen comparativa */}
                <div className="flex justify-center mb-8">
                  <img 
                    src="/ia-vs-automation.png" 
                    alt="Comparativa entre IA y automatización tradicional" 
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-600">Automatización de Procesos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Definición:</h4>
                        <p className="text-sm text-gray-700">
                          La automatización se enfoca en ejecutar tareas repetitivas y predecibles 
                          siguiendo reglas y procedimientos establecidos.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Características:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Basada en reglas fijas</li>
                          <li>• No aprende ni se adapta</li>
                          <li>• Ejecuta tareas específicas</li>
                          <li>• Requiere programación explícita</li>
                          <li>• No toma decisiones complejas</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Ejemplos:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Procesamiento de facturas</li>
                          <li>• Entrada de datos</li>
                          <li>• Respuestas automáticas básicas</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-600">Inteligencia Artificial</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Definición:</h4>
                        <p className="text-sm text-gray-700">
                          La IA implica sistemas que pueden aprender, razonar, percibir y tomar 
                          decisiones de manera autónoma, similar a la inteligencia humana.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Características:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Capacidad de aprendizaje</li>
                          <li>• Adaptación a nuevas situaciones</li>
                          <li>• Reconocimiento de patrones</li>
                          <li>• Toma de decisiones complejas</li>
                          <li>• Mejora continua con experiencia</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Ejemplos:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Asistentes virtuales inteligentes</li>
                          <li>• Sistemas de recomendación</li>
                          <li>• Diagnóstico médico asistido</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Relación y Complementariedad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      La IA y la automatización no son mutuamente excluyentes. De hecho, la IA puede 
                      mejorar significativamente la automatización tradicional al añadir capacidades 
                      cognitivas que permiten manejar tareas más complejas y variables. Mientras que 
                      la automatización se encarga de la ejecución eficiente de tareas, la IA aporta 
                      la inteligencia necesaria para tomar mejores decisiones y adaptarse a cambios 
                      en el entorno.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparativas" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tablas Comparativas</CardTitle>
                <CardDescription>
                  Análisis comparativo de diferentes aspectos de la inteligencia artificial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Comparación: IA vs Automatización Tradicional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Característica</TableHead>
                          <TableHead>Automatización</TableHead>
                          <TableHead>Inteligencia Artificial</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Aprendizaje</TableCell>
                          <TableCell>No aprende</TableCell>
                          <TableCell>Aprende continuamente</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Adaptabilidad</TableCell>
                          <TableCell>Baja, reglas fijas</TableCell>
                          <TableCell>Alta, se adapta al cambio</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Toma de decisiones</TableCell>
                          <TableCell>Basada en reglas predefinidas</TableCell>
                          <TableCell>Autónoma y basada en datos</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Complejidad</TableCell>
                          <TableCell>Tareas simples y repetitivas</TableCell>
                          <TableCell>Tareas complejas y variables</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Mantenimiento</TableCell>
                          <TableCell>Requiere actualización manual</TableCell>
                          <TableCell>Mejora automáticamente</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tipos de IA y sus Aplicaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo de IA</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Aplicaciones Comunes</TableHead>
                          <TableHead>Ejemplos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Machine Learning</TableCell>
                          <TableCell>Sistemas que aprenden de datos sin programación explícita</TableCell>
                          <TableCell>Predicción, clasificación</TableCell>
                          <TableCell>Spam filters, recomendaciones</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Deep Learning</TableCell>
                          <TableCell>Redes neuronales profundas para patrones complejos</TableCell>
                          <TableCell>Reconocimiento de imágenes, voz</TableCell>
                          <TableCell>Face ID, asistentes de voz</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">NLP</TableCell>
                          <TableCell>Procesamiento y comprensión del lenguaje humano</TableCell>
                          <TableCell>Traducción, análisis de sentimiento</TableCell>
                          <TableCell>ChatGPT, Google Translate</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Computer Vision</TableCell>
                          <TableCell>Interpretación y comprensión de imágenes y videos</TableCell>
                          <TableCell>Reconocimiento facial, detección de objetos</TableCell>
                          <TableCell>Autonomous vehicles, medical imaging</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Robotics</TableCell>
                          <TableCell>Integración de IA en sistemas físicos</TableCell>
                          <TableCell>Automatización industrial, cirugía</TableCell>
                          <TableCell>Robots de ensamblaje, cirugía robótica</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Impacto en Diferentes Sectores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sector</TableHead>
                          <TableHead>Impacto de la IA</TableHead>
                          <TableHead>Beneficios</TableHead>
                          <TableHead>Desafíos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Salud</TableCell>
                          <TableCell>Transformación completa</TableCell>
                          <TableCell>Diagnóstico preciso, tratamientos personalizados</TableCell>
                          <TableCell>Privacidad, regulación</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Educación</TableCell>
                          <TableCell>Personalización del aprendizaje</TableCell>
                          <TableCell>Aprendizaje adaptativo, acceso global</TableCell>
                          <TableCell>Brecha digital, formación docente</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Finanzas</TableCell>
                          <TableCell>Optimización de procesos</TableCell>
                          <TableCell>Detección de fraudes, trading eficiente</TableCell>
                          <TableCell>Volatilidad, riesgos sistémicos</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Manufactura</TableCell>
                          <TableCell>Industria 4.0</TableCell>
                          <TableCell>Eficiencia, calidad, reducción de costos</TableCell>
                          <TableCell>Desplazamiento laboral, inversión</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actividad" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Actividad Interactiva: Arrastra y Relaciona</CardTitle>
                <CardDescription>
                  Arrastra las definiciones a los conceptos correspondientes para demostrar tu comprensión
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4 mb-4">
                    <Button onClick={checkAnswers} className="bg-blue-600 hover:bg-blue-700">
                      Verificar Respuestas
                    </Button>
                    <Button onClick={resetActivity} variant="outline">
                      Reiniciar Actividad
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Conceptos</h3>
                      <div className="space-y-4">
                        {matches.map((match) => (
                          <div key={match.id} className="p-4 border rounded-lg bg-gray-50">
                            <h4 className="font-medium">{match.concept}</h4>
                            <div
                              className="mt-2 min-h-[40px] p-2 border-2 border-dashed border-gray-300 rounded"
                              onDrop={(e) => handleDrop(e, match.id)}
                              onDragOver={handleDragOver}
                            >
                              {match.definition && (
                                <div className="p-2 bg-blue-100 rounded">
                                  {match.definition}
                                </div>
                              )}
                            </div>
                            {showResults && (
                              <div className="mt-2">
                                <Badge variant={match.matched ? "default" : "destructive"}>
                                  {match.matched ? "✓ Correcto" : "✗ Incorrecto"}
                                </Badge>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Definiciones (Arrastra)</h3>
                      <div className="space-y-3">
                        {dragItems.filter(item => item.category === "definition").map((item) => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            className="p-3 bg-white border rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow"
                          >
                            {item.content}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {showResults && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg">Explicación Detallada</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-blue-600">Machine Learning:</h4>
                          <p className="text-sm text-gray-700 mt-1">
                            Es un subcampo de la IA que se enfoca en desarrollar algoritmos que pueden 
                            aprender y hacer predicciones o decisiones basándose en datos. En lugar de 
                            ser programados explícitamente, estos sistemas mejoran su rendimiento 
                            automáticamente con la experiencia.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-600">Redes Neuronales:</h4>
                          <p className="text-sm text-gray-700 mt-1">
                            Son sistemas computacionales inspirados en la estructura y función del 
                            cerebro humano. Consisten en capas de nodos interconectados que procesan 
                            información y son particularmente efectivas para reconocer patrones complejos 
                            en datos como imágenes, sonido y texto.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-600">Procesamiento de Lenguaje Natural:</h4>
                          <p className="text-sm text-gray-700 mt-1">
                            Es una rama de la IA que ayuda a las computadoras a entender, interpretar 
                            y generar lenguaje humano de manera natural. Incluye tareas como traducción 
                            automática, análisis de sentimiento, reconocimiento de voz y generación de texto.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resumen" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen General</CardTitle>
                <CardDescription>
                  Conclusiones clave sobre la inteligencia artificial y su impacto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Imagen principal de resumen */}
                <div className="flex justify-center mb-6">
                  <img 
                    src="/ia-overview.png" 
                    alt="Visión general de la inteligencia artificial y sus aplicaciones" 
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Puntos Clave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-blue-600">¿Qué hemos aprendido?</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            La IA es una tecnología transformadora que replica capacidades humanas
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            Existen diferentes tipos de IA con aplicaciones específicas
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            La IA difiere fundamentalmente de la automatización tradicional
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            Su impacto se extiende a todos los sectores de la sociedad
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-purple-600">Impacto y Futuro</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            La IA está revolucionando la manera en que vivimos y trabajamos
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Ofrece oportunidades sin precedentes para innovación
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Presenta desafíos éticos y sociales importantes
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Requiere un enfoque equilibrado entre progreso y responsabilidad
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Consideraciones Éticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Privacidad</h4>
                        <p className="text-sm text-gray-600">
                          La IA requiere grandes cantidades de datos, lo que plantea preocupaciones 
                          sobre la privacidad y protección de información personal.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Sesgos</h4>
                        <p className="text-sm text-gray-600">
                          Los sistemas de IA pueden perpetuar o amplificar sesgos presentes en los 
                          datos de entrenamiento, afectando la equidad.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Empleo</h4>
                        <p className="text-sm text-gray-600">
                          La automatización mediante IA puede transformar el mercado laboral, 
                          creando nuevos empleos mientras elimina otros.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Conclusión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      La inteligencia artificial representa una de las tecnologías más transformadoras 
                      de nuestra era. Su capacidad para aprender, adaptarse y tomar decisiones complejas 
                      está abriendo nuevas posibilidades en prácticamente todos los campos del conocimiento 
                      y la actividad humana. Sin embargo, su desarrollo y implementación requieren un 
                      enfoque responsable que equilibre el innovación con la consideración ética y el 
                      impacto social. La comprensión profunda de sus conceptos, aplicaciones y diferencias 
                      con la automatización tradicional es fundamental para navegar este nuevo panorama 
                      tecnológico y aprovechar todo su potencial para el beneficio de la sociedad.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}