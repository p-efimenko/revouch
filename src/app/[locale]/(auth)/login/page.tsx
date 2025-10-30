import { Wizard } from './components/'

type LoginProps = {
  searchParams: {
    type: string
  }
}

export default async function Login(props: LoginProps) {
  const { searchParams } = props

  const { type } = await searchParams

  return <Wizard type={type} />
}
