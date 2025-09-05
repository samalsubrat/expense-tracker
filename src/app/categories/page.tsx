import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { CategoryAnalytics } from "@/app/components/category-analytics"

export default async function CategoriesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground mt-1">Analyze your spending patterns by category</p>
          </div>

          {/* Category Analytics */}
          <CategoryAnalytics userId={userId} />
        </div>
      </div>
    </div>
  )
}
