import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { LoginCredentials } from "../types/auth"
import type { ChangeEvent, FormEvent } from "react"

interface LoginFormProps extends Omit<React.ComponentProps<"div">, "onChange" | "onSubmit"> {
  formData: LoginCredentials;
  isLoading: boolean;
  error: Error | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({
  className,
  formData,
  isLoading,
  error,
  onChange,
  onSubmit,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Entrez vos identifiants pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              {error && (
                <div className="text-sm font-medium text-destructive text-red-700">
                  {error.message}
                </div>
              )}
              <Field>
                <FieldLabel htmlFor="username">Email</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.username}
                  onChange={onChange}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={onChange}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full" variant="outline">
                  {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
                {/* 
                <Button variant="outline" type="button" className="w-full">
                  Login with Google
                </Button> 
                */}
                <FieldDescription className="text-center">
                  Pas encore de compte ? <a href="#">S'inscrire</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
