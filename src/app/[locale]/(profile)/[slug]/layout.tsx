import { SidebarLayout } from '@/components/layouts'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>
}
