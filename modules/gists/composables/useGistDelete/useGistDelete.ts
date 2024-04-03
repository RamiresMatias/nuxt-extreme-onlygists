import type { GistVirtual } from "@/modules/gists/entities/Gist/Gist"

interface UseGistDeleteOptions {
  gist: Ref<GistVirtual | undefined>
}

export function useGistDelete({gist}: UseGistDeleteOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()
  const loading = ref<boolean>()
  const gistId = ref<string>()

  const remove = async () => {
    if (!gistId.value) return

    try {
      loading.value = true
      await services.gists.delete(gistId.value)

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Gist apagado!',
        life: 2000
      })
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!gist.value) return
    
    gistId.value = gist.value.id
  })

  return {
    loading,
    remove
  }
}