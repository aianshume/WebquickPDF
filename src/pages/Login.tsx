import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useInputState } from '@mantine/hooks';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "services/firebase"

export default function LoginPage() {
  const [emailValue, setEmailValue] = useInputState<string>("")
  const [passwordValue, setPasswordValue] = useInputState<string>("")

  const submitForm = () => {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then(() => {
      window.localStorage.setItem("user", JSON.stringify({
        login: true
      }))
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("errorMsg", errorMessage);
    });
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@codenanshu.in" required value={emailValue} onChange={setEmailValue} />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={passwordValue}
          onChange={setPasswordValue}
        />
        <Button onClick={submitForm} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
