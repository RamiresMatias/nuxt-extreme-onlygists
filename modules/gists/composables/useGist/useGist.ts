import type { GistVirtual } from "@/modules/gists/entities/Gist/Gist"

interface useGistOptions {
  id: string
}

export function useGist({id}: useGistOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const loading = ref<boolean>()
  const gist = ref<GistVirtual | undefined>()

  const fetchGistById = async () => {
    loading.value = true

    try {
      const [gistReadOne, gistReadOneContent] = await Promise.all([
        services.gists.readOne(id),
        services.gists.readOneContent(id)
      ])

      if(gistReadOne) {
        gist.value = gistReadOne
      }

      if(gist.value && gistReadOneContent) {
        gist.value.content = gistReadOneContent?.content
      }

    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchGistById()
  })

  return {
    loading,
    gist
  }
}