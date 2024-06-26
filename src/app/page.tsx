
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default async function Home() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Quizzy</CardTitle>
        <CardDescription>Quizzy is a quiz app that allows you to create and share quizzes with your friends</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInButton text="Sign In with Google"/>
      </CardContent>
    </Card>
    </div>
  );
}
