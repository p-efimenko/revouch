export type BackendError = {
  code: string | null
  message: string | null
  details: Record<string, string> | null
}
