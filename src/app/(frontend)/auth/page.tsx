import { redirect } from 'next/navigation'
import AuthForms from '@/components/AuthForms'
import StoreHeader from '@/components/StoreHeader'
import { appAuth } from '@/lib/app-auth'

export default async function AuthPage() {
  if (await appAuth.currentUser()) redirect('/profile')
  return (
    <>
      <StoreHeader />
      <main className="account-page">
        <AuthForms />
      </main>
    </>
  )
}
