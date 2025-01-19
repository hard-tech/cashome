import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Spacer } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@nextui-org/shared-icons";
import { FaUser } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
      callbackUrl: params.get("callbackUrl") || "/dashboard",
    });
    setIsLoading(false);
    if (!result?.ok) {
      toast.error("Identifiant ou mot de passe incorrect");
      return;
    }
    // Redirect to the callback URL or the default URL
    const callbackUrl = result.url || params.get("callbackUrl") || "/";
    replace(callbackUrl);
  };

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        fullWidth
        color={errors.username ? "danger" : "default"}
        label="Nom d'utilisateur"
        size="lg"
        {...register("username")}
        errorMessage={errors.username?.message}
        endContent={<FaUser className="text-2xl text-default-400 pointer-events-none mb-2 me-2" />}
      />
      <Input
        fullWidth
        color={errors.password ? "danger" : "default"}
        size="lg"
        label="Mot de passe"
        type={isVisible ? "text" : "password"}
        {...register("password")}
        errorMessage={errors.password?.message}
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
      <Spacer y={1} />
      <Button color="primary" type="submit" isLoading={isLoading}>
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;