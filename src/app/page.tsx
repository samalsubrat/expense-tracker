import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Button } from "@/app/components/ui/button"
import { redirect } from "next/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-accent/20">
      <SignedIn>{redirect("/dashboard")}</SignedIn>

      <SignedOut>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">Take Control of Your Finances</h1>
            <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
              Track your income and expenses effortlessly with our clean, intuitive expense tracker. Get insights into
              your spending habits and achieve your financial goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <SignInButton mode="modal">
                <Button size="lg" className="rounded-xl px-8 py-6 text-lg">
                  Get Started Free
                </Button>
              </SignInButton>
              <Button variant="outline" size="lg" className="rounded-xl px-8 py-6 text-lg bg-transparent">
                Learn More
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-card rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <div className="w-6 h-6 bg-primary rounded-md"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Tracking</h3>
                <p className="text-muted-foreground">Add transactions quickly with our streamlined interface</p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <div className="w-6 h-6 bg-primary rounded-md"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Categories</h3>
                <p className="text-muted-foreground">Organize expenses by categories for better insights</p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <div className="w-6 h-6 bg-primary rounded-md"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Insights</h3>
                <p className="text-muted-foreground">See your financial overview with live balance updates</p>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </div>
  )
}
