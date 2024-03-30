import type { Code, Headline } from "@/modules/gists/entities/Gist/Gist"

export type CreateOptions = Headline & Code & {
  profileId: string
}