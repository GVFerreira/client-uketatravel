'use client'

import { Check, IdCard, Loader2, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { analyzePassport, savePassport } from "../action"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  onSuccess: () => void
}

export function Passport({ onSuccess }: Props) {
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
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment"
        }
      })
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
      const targetAspect = 10 / 7
  
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

      if (imageSrc) {
        const analyzePassportResponse = await analyzePassport(imageSrc)
        if (analyzePassportResponse.errors.length > 0) {
          setError(analyzePassportResponse.errors)
        } else {
          if (solicitationId) {
            await savePassport({ solicitationId, imageBase64: imageSrc })
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
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Requisitos para a imagem do seu passaporte.</h3>
        <p>A imagem deve ser:</p>
        <ul className="list-disc pl-4">
          <li>inalterada por efeitos ou filtros</li>
          <li>original, não uma captura de tela ou fotocópia</li>
          <li>de um passaporte físico, não um passaporte digital</li>
          <li>colorida</li>
          <li>horizontal (paisagem)</li>
          <li>um arquivo jpg ou jpeg</li>
        </ul>
      </div>
      <hr />
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">A imagem do seu passaporte deve seguir os seguintes padrões.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
          <div>
            <Image src="/assets/passport-clear.jpeg" className="w-10/12 md:w-08/12 mx-auto" width={200} height={143} alt="Passaporte padrão" />
            <p className="flex gap-1 items-center justify-center">Imagem com clareza e foco <Check className="text-green-400 size-6" /></p>
          </div>
          <div>
            <Image src="/assets/passport-blur.png" className="w-10/12 md:w-08/12 mx-auto" width={200} height={143} alt="Passaporte sem foco" />
            <p className="flex gap-1 items-center justify-center">Imagem sem clareza e foco <X className="text-red-400 size-6" /></p>
          </div>
          <div>
            <Image src="/assets/passport-no-lights.jpeg" className="w-10/12 md:w-08/12 mx-auto" width={200} height={143} alt="Passaporte sem reflexos" />
            <p className="flex gap-1 items-center justify-center">Imagem sem brilho <Check className="text-green-400 size-6" /></p>
          </div>
          <div>
            <Image src="/assets/passport-glare.png" className="w-10/12 md:w-08/12 mx-auto" width={200} height={143} alt="Passaporte com reflexos" />
            <p className="flex gap-1 items-center justify-center">Imagem com brilho e reflexos <X className="text-red-400 size-6" /></p>
          </div>
        </div>
        <hr />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Faça o envio da imagem do seu passaporte seguindo os requisitos acima.</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Tabs value={tabValue} onValueChange={setTabValue} className="mx-auto md:w-1/2 flex flex-col justify-center items-center">
            <TabsList className="w-full">
              <TabsTrigger value="take" className="w-1/2">Usar câmera</TabsTrigger>
              <TabsTrigger value="photo" className="w-1/2">Carregar uma foto</TabsTrigger>
            </TabsList>
            <TabsContent value="take" className="w-full flex flex-col items-center">
              <p>Ajuste seu passaporte ao enquadramento e pressione o botão &quot;Tirar Foto&quot;.</p>
              <div className="relative w-full aspect-[10/7] mt-4 rounded-md overflow-hidden bg-gray-200">
                {/* Vídeo */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover transform -scale-x-100"
                  playsInline
                ></video>

                {/* Máscara oval */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-11/12 h-11/12 border-2 border-white/80 backdrop-brightness-75" />
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
                  <IdCard className="size-12" />
                  <span className="mt-2 text-muted-foreground">Clique ou arraste a imagem aqui.</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" required />
                </label>
              </div>
            </TabsContent>
          </Tabs>
          {imageSrc && (
            <div className="w-full flex flex-col items-center gap-2 mt-4">
              <p className="font-bold">Imagem enviada:</p>
              <Image
                src={imageSrc}
                alt="Preview da imagem"
                className="md:w-1/2 w-full aspect-[10/7] object-cover border border-muted-foreground rounded-md transform -scale-x-100"
                width={1000}
                height={700}
              />
            </div>
          )}
          {error.length > 0 && (
            <div className="w-full text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
              <strong className="text-lg font-bold">Alertas:</strong>
              <ul className="mt-2 list-disc pl-5">
                {error.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex md:justify-end mt-8">
            <Button disabled={isSubmitting || imageSrc === null}>
              {isSubmitting ? (
                <>
                  Analisando passaporte...
                  <Loader2 className="size-4 animate-spin ml-2" />
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
