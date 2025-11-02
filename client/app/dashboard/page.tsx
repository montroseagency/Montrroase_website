"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getClientDashboardStats, getSocialAccounts, getContentPosts, getTasks } from "@/lib/api"
import type { ClientDashboardStats, SocialMediaAccount, ContentPost, Task } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, FileText, Target, LogOut, Instagram, Youtube } from "lucide-react"

export default function DashboardPage() {
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<ClientDashboardStats | null>(null)
  const [socialAccounts, setSocialAccounts] = useState<SocialMediaAccount[]>([])
  const [contentPosts, setContentPosts] = useState<ContentPost[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData()
    }
  }, [isAuthenticated])

  const loadDashboardData = async () => {
    try {
      const [statsData, accountsData, postsData, tasksData] = await Promise.all([
        getClientDashboardStats(),
        getSocialAccounts(),
        getContentPosts(),
        getTasks(),
      ])
      setStats(statsData)
      setSocialAccounts(accountsData)
      setContentPosts(postsData.slice(0, 5))
      setTasks(tasksData.slice(0, 5))
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Montrose Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user.first_name || user.username}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_followers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across all platforms</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.engagement_rate.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground">Average engagement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posts This Month</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.posts_this_month}</div>
                <p className="text-xs text-muted-foreground">Content published</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.growth_rate.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground">Monthly growth</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Your linked social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {socialAccounts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No accounts connected yet</p>
              ) : (
                <div className="space-y-3">
                  {socialAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {account.platform === "instagram" && <Instagram className="h-5 w-5 text-pink-600" />}
                        {account.platform === "youtube" && <Youtube className="h-5 w-5 text-red-600" />}
                        <div>
                          <p className="font-medium">{account.username}</p>
                          <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                        </div>
                      </div>
                      <Badge variant={account.is_active ? "default" : "secondary"}>
                        {account.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Content */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>Your latest content posts</CardDescription>
            </CardHeader>
            <CardContent>
              {contentPosts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No content posts yet</p>
              ) : (
                <div className="space-y-3">
                  {contentPosts.map((post) => (
                    <div key={post.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{post.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 capitalize">{post.platform}</p>
                        </div>
                        <Badge
                          variant={
                            post.status === "posted" ? "default" : post.status === "approved" ? "secondary" : "outline"
                          }
                        >
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>Pending and active tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tasks assigned</p>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.priority === "high"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Info */}
          {stats && (
            <Card>
              <CardHeader>
                <CardTitle>Next Payment</CardTitle>
                <CardDescription>Your upcoming payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="font-medium">${stats.next_payment_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <span className="font-medium">{new Date(stats.next_payment_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
