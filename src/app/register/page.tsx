"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Spacer } from "@nextui-org/react";
import Link from "next/link";
import * as Yup from 'yup';
import { EyeSlashFilledIcon, EyeFilledIcon } from "@nextui-org/shared-icons";
import { FaHome, FaUser } from "react-icons/fa";
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Le prénom est requis")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom ne doit contenir que des lettres, espaces, tirets et apostrophes"),
  lastName: Yup.string()
    .required("Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne doit contenir que des lettres, espaces, tirets et apostrophes"),
  username: Yup.string()
    .required("Le nom d'utilisateur est requis")
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères")
    .matches(/^[a-zA-Z0-9_-]+$/, "Le nom d'utilisateur ne doit contenir que des lettres, chiffres, tirets et underscores"),
  password: Yup.string()
    .required("Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(100, "Le mot de passe ne doit pas dépasser 100 caractères")
    .test('password-strength', 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial', (value) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&]/.test(value);
      return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }),
  householdName: Yup.string()
    .required("Le nom du foyer est requis")
    .min(2, "Le nom du foyer doit contenir au moins 2 caractères")
    .max(50, "Le nom du foyer ne doit pas dépasser 50 caractères")
    .matches(/^[a-zA-Z0-9À-ÿ\s'-]+$/, "Le nom du foyer ne doit contenir que des lettres, chiffres, espaces, tirets et apostrophes"),
});

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [householdName, setHouseholdName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateField = async (field: string, value: string) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors(prev => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(prev => ({ ...prev, [field]: error.message }));
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate({
        username,
        password,
        firstName,
        lastName,
        householdName,
      }, { abortEarly: false });

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          householdName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Une erreur est survenue lors de l'inscription");
      } else {
        router.push("/login");
      }

    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error("Une erreur est survenue lors de la validation");
      }
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card className="p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Inscription</h2>
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="flex">
              <Input
                fullWidth
                color={errors.firstName ? "danger" : "default"}
                label="Prénom"
                size="lg"
                isRequired
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateField("firstName", e.target.value);
                }}
                errorMessage={errors.firstName}
              />
              <Spacer x={2} />
              <Input
                fullWidth
                color={errors.lastName ? "danger" : "default"}
                label="Nom"
                size="lg"
                isRequired
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  validateField("lastName", e.target.value);
                }}
                errorMessage={errors.lastName}
              />
            </div>
            <Input
              fullWidth
              color={errors.username ? "danger" : "default"}
              label="Nom d'utilisateur"
              size="lg"
              isRequired
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateField("username", e.target.value);
              }}
              errorMessage={errors.username}
              endContent={<FaUser className="text-2xl text-default-400 pointer-events-none mb-2 me-2" />}
            />
            <Input
              fullWidth
              color={errors.password ? "danger" : "default"}
              size="lg"
              isRequired
              label="Mot de passe"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              errorMessage={errors.password}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none mb-2 me-2"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              fullWidth
              color={errors.householdName ? "danger" : "default"}
              label="Nom du foyer"
              size="lg"
              isRequired
              value={householdName}
              onChange={(e) => {
                setHouseholdName(e.target.value);
                validateField("householdName", e.target.value);
              }}
              errorMessage={errors.householdName}
              endContent={<FaHome className="text-2xl text-default-400 pointer-events-none mb-2 me-2" />}
            />
            <Spacer y={1} />
            <Button color="primary" type="submit">
              S'inscrire
            </Button>
          </form>
          <Spacer y={10} />
          <Link href="/login">
            <p className="text-sm text-blue-600">
              Vous avez déjà un compte? Se connecter
            </p>
          </Link>
        </Card>
      </div>
    </main>
  );
}