import type {
  User,
  Client,
  Task,
  ContentPost,
  PerformanceData,
  Message,
  Invoice,
  SocialMediaAccount,
  DashboardStats,
  ClientDashboardStats,
  BillingPlan,
} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

// Helper function to create headers with auth token
function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (includeAuth) {
    const token = getAuthToken()
    if (token) {
      headers["Authorization"] = `Token ${token}`
    }
  }

  return headers
}

// Authentication APIs
export async function register(data: {
  email: string
  password: string
  name: string
  role?: "admin" | "client"
  company?: string
}): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to register")
  }

  return response.json()
}

export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to login")
  }

  return response.json()
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
    method: "POST",
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to logout")
  }
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/me/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch current user")
  }

  return response.json()
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/change-password/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to change password")
  }
}

// Dashboard APIs
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats")
  }

  return response.json()
}

export async function getClientDashboardStats(): Promise<ClientDashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard/client-stats/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch client dashboard stats")
  }

  return response.json()
}

// Client APIs
export async function getClients(): Promise<Client[]> {
  const response = await fetch(`${API_BASE_URL}/clients/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch clients")
  }

  return response.json()
}

export async function getClient(id: string): Promise<Client> {
  const response = await fetch(`${API_BASE_URL}/clients/${id}/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch client")
  }

  return response.json()
}

// Task APIs
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return response.json()
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to create task")
  }

  return response.json()
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update task")
  }

  return response.json()
}

// Content APIs
export async function getContentPosts(): Promise<ContentPost[]> {
  const response = await fetch(`${API_BASE_URL}/content/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch content posts")
  }

  return response.json()
}

export async function createContentPost(data: FormData): Promise<ContentPost> {
  const token = getAuthToken()
  const headers: HeadersInit = {}
  if (token) {
    headers["Authorization"] = `Token ${token}`
  }

  const response = await fetch(`${API_BASE_URL}/content/`, {
    method: "POST",
    headers,
    body: data,
  })

  if (!response.ok) {
    throw new Error("Failed to create content post")
  }

  return response.json()
}

export async function updateContentPost(id: string, data: Partial<ContentPost>): Promise<ContentPost> {
  const response = await fetch(`${API_BASE_URL}/content/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update content post")
  }

  return response.json()
}

// Performance APIs
export async function getPerformanceData(clientId?: string): Promise<PerformanceData[]> {
  const url = clientId ? `${API_BASE_URL}/performance/?client_id=${clientId}` : `${API_BASE_URL}/performance/`

  const response = await fetch(url, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch performance data")
  }

  return response.json()
}

// Social Media APIs
export async function getSocialAccounts(): Promise<SocialMediaAccount[]> {
  const response = await fetch(`${API_BASE_URL}/social-accounts/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch social accounts")
  }

  return response.json()
}

export async function getRealTimeMetrics(): Promise<{ data: any[] }> {
  const response = await fetch(`${API_BASE_URL}/metrics/realtime/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch real-time metrics")
  }

  return response.json()
}

// Message APIs
export async function getMessages(): Promise<Message[]> {
  const response = await fetch(`${API_BASE_URL}/messages/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch messages")
  }

  return response.json()
}

export async function sendMessageToAdmin(content: string): Promise<Message> {
  const response = await fetch(`${API_BASE_URL}/messages/send-to-admin/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error("Failed to send message")
  }

  return response.json()
}

// Invoice APIs
export async function getInvoices(): Promise<Invoice[]> {
  const response = await fetch(`${API_BASE_URL}/invoices/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch invoices")
  }

  return response.json()
}

// Billing APIs
export async function getAvailablePlans(): Promise<BillingPlan[]> {
  const response = await fetch(`${API_BASE_URL}/billing/plans/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch billing plans")
  }

  return response.json()
}

export async function getCurrentSubscription(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/billing/subscription/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch subscription")
  }

  return response.json()
}

export async function createSubscription(planId: string): Promise<{ approval_url: string }> {
  const response = await fetch(`${API_BASE_URL}/billing/create-subscription/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ plan_id: planId }),
  })

  if (!response.ok) {
    throw new Error("Failed to create subscription")
  }

  return response.json()
}

// OAuth APIs
export async function initiateInstagramOAuth(): Promise<{ authorization_url: string }> {
  const response = await fetch(`${API_BASE_URL}/oauth/instagram/initiate/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to initiate Instagram OAuth")
  }

  return response.json()
}

export async function initiateYouTubeOAuth(): Promise<{ authorization_url: string }> {
  const response = await fetch(`${API_BASE_URL}/oauth/youtube/initiate/`, {
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to initiate YouTube OAuth")
  }

  return response.json()
}

// Contact form (for landing page)
export async function submitContactForm(data: {
  name: string
  email: string
  company?: string
  message: string
}) {
  // This endpoint might not exist in your Django backend yet
  // You may need to create it or use a different approach
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to submit contact form")
  }

  return response.json()
}
