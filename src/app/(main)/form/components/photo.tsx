'use client'

import { Check, Loader2, SquareUser, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { analyzePhoto, savePhoto } from "../action"


type Props = {
  onSuccess: () => void
}

export function Photo({ onSuccess }: Props) {
  const MAX_FILE_SIZE_MB = 4
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<string[]>([])
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [tabValue, setTabValue] = useState("take")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (tabValue === "take") {
      startCamera()
    } else {
      stopCamera()
    }
  }, [tabValue])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        videoRef.current.onplaying = () => setIsVideoPlaying(true)
        await videoRef.current.play()
        setError([])
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error)
      setError(['Não foi possível acessar a câmera.'])
    }
  }

  const stopCamera = () => {
    const videoElement = videoRef.current
    if (videoElement?.srcObject) {
      const mediaStream = videoElement.srcObject as MediaStream
      mediaStream.getTracks().forEach(track => track.stop())
      videoElement.srcObject = null
      setStream(null)
      setIsVideoPlaying(false)
      console.log("Câmera parada com sucesso.")
    }
  }

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current && isVideoPlaying) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
  
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight
  
      // Definir proporção desejada
      const targetAspect = 3 / 4
  
      // Calcular dimensões da área central com proporção 3:4
      let cropWidth = videoWidth
      let cropHeight = cropWidth / targetAspect
  
      if (cropHeight > videoHeight) {
        cropHeight = videoHeight
        cropWidth = cropHeight * targetAspect
      }
  
      const cropX = (videoWidth - cropWidth) / 2
      const cropY = (videoHeight - cropHeight) / 2
  
      // Ajustar o canvas para o tamanho do recorte
      canvas.width = cropWidth
      canvas.height = cropHeight
  
      if (context) {
        // Espelhar horizontalmente, como o vídeo
        context.translate(cropWidth, 0)
        context.scale(-1, 1)
  
        // Desenhar a área central proporcional
        context.drawImage(
          video,
          cropX, cropY, cropWidth, cropHeight,  // área a capturar do vídeo
          0, 0, cropWidth, cropHeight           // área a desenhar no canvas
        )
  
        const imageData = canvas.toDataURL('image/png')
        setImageSrc(imageData)
      } else {
        setError(['Erro ao acessar o canvas para capturar a imagem.'])
      }
    } else {
      setError(['A câmera não está pronta para capturar a imagem.'])
    }
  }  

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError([`A imagem deve ter no máximo ${MAX_FILE_SIZE_MB}MB.`])
        setImageSrc(null)
        return
      }

      setError([])

      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError([`A imagem deve ter no máximo ${MAX_FILE_SIZE_MB}MB.`])
        setImageSrc(null)
        return
      }

      setError([])

      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const solicitationId = localStorage.getItem('solicitation_id')

      if(imageSrc) {
        const analyzePhotoResponse = await analyzePhoto(imageSrc)
        if(analyzePhotoResponse.errors.length > 0) {
          setError(analyzePhotoResponse.errors)
        } else {
          if (solicitationId) {
            await savePhoto({solicitationId, imageBase64: imageSrc})
            stopCamera() 
            onSuccess()
          }
        }
      }  
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <>
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Requisitos para a sua foto pessoal.</h3>
        <p>A foto deve ser:</p>
        <ul className="list-disc pl-4">
          <li>diferente daquela do seu passaporte</li>
          <li>tirada recentemente (não mais de 3 meses)</li>
          <li>vertical (retrato)</li>
          <li>um arquivo jpg ou jpeg</li>
        </ul>
        <p>Você não deve:</p>
        <ul className="list-disc pl-4">
          <li>enviar uma foto de outra foto</li>
          <li>usar quaisquer efeitos ou filtros</li>
        </ul>
      </div>
      <hr/>
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">A sua foto deve seguir os seguintes padrões.</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-4">
          <div>
            <Image
              src="/assets/photo-background-plain.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Fundo liso e claro"}
            />
            <p className="flex gap-1 items-center justify-center">Fundo liso e claro <Check className="text-green-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-headwear-religious.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Vestimenta religiosa"}
            />
            <p className="flex gap-1 items-center justify-center">Vestimenta religiosa<Check className="text-green-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-background-object.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Vestimenta religiosa"}
            />
            <p className="flex gap-1 items-center justify-center">Objetos ao fundo<X className="text-red-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-background-shadow.jpeg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Sombras atrás da cabeça"}
            />
            <p className="flex gap-1 items-center justify-center">Sombra atrás da cabeça <X className="text-red-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-headwear-hair.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Acessórios na cabeça ou rosto"}
            />
            <p className="flex gap-1 items-center justify-center">Acessórios na cabeça ou rosto <X className="text-red-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-glasses-covering.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Sombras atrás da cabeça"}
            />
            <p className="flex gap-1 items-center justify-center">Óculos cobrindo os olhos <X className="text-red-400 size-6"/></p>
          </div>
        </div>
        <hr />
        <form onSubmit={handleSubmit} className="space-y-2">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Faça o envio da sua imagem seguindo os requisitos acima.</h3>
          <Tabs value={tabValue} onValueChange={setTabValue} className="mx-auto md:w-1/2 flex flex-col justify-center items-center">
            <TabsList className="w-full">
              <TabsTrigger value="take" className="w-1/2">Usar câmera</TabsTrigger>
              <TabsTrigger value="photo" className="w-1/2">Carregar uma foto</TabsTrigger>
            </TabsList>
            <TabsContent value="take" className="w-full flex flex-col items-center">
              <p>Ajuste o seu rostos ao enquadramento e pressione o botão &quot;Tirar Foto&quot;.</p>
              <div className="relative w-full aspect-[3/4] mt-4 rounded-md overflow-hidden bg-gray-200">
                {/* Vídeo */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover transform -scale-x-100"
                  playsInline
                ></video>

                {/* Máscara oval */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-64 h-96 rounded-full border-4 border-white/80 backdrop-brightness-75" />
                </div>
              </div>

              <canvas ref={canvasRef} className="hidden"></canvas>
              <Button className="mt-4" type="button" onClick={capturePhoto}>Tirar Foto</Button>
            </TabsContent>
            <TabsContent value="photo" className="w-full">
              <div
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dotted border-gray-500 hover:cursor-pointer bg-nzwhite rounded-md"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <SquareUser className="size-12" />
                  <span className="mt-2 text-muted-foreground">Clique ou arraste a imagem aqui.</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" required />
                </label>
              </div>
            </TabsContent>
          </Tabs>
          {
            imageSrc && (
              <div className="w-full flex flex-col items-center gap-2 mt-4">
                <p className="font-bold">Imagem enviada:</p>
                <Image
                  src={imageSrc}
                  alt="Preview da imagem"
                  className="md:w-1/3 w-full aspect-[3/4] object-cover border border-muted-foreground transform -scale-x-100"
                  width={300}
                  height={400}
                />
              </div>
            )
          }
          {
            error.length > 0 && (
              <div className="w-full text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
                <strong className="text-lg font-bold">Alertas:</strong>
                <ul className="mt-2 list-disc pl-5">
                  {error.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )
          }
          <div className="flex md:justify-end mt-8">
            <Button disabled={isSubmitting || imageSrc === null}>
              {isSubmitting ? (
                <>
                  Analisando foto...
                  <Loader2 className="size-4 animate-spin" />
                </>
              ) : (
                "Próximo"
              )}
            </Button> 
          </div>
        </form>
      </div>
    </>
  )
}
