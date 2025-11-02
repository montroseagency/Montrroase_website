export interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  role: "admin" | "client"
  company?: string
  avatar?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  email: string
  company: string
  package: string
  monthly_fee: number
  start_date: string
  status: "active" | "pending" | "paused" | "cancelled"
  payment_status: "paid" | "overdue" | "pending" | "none"
  platforms: string[]
  account_manager: string
  next_payment?: string
  total_spent: number
  notes?: string
  created_at: string
  updated_at: string
  user_first_name?: string
  user_last_name?: string
  user_email?: string
  user_avatar?: string
  current_plan?: string
  paypal_subscription_id?: string
}

export interface Task {
  id: string
  title: string
  description: string
  client: string
  client_name: string
  assigned_to: string
  status: "pending" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high"
  due_date: string
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface ContentPost {
  id: string
  client: string
  client_name: string
  social_account?: string
  social_account_username?: string
  platform: "instagram" | "youtube" | "tiktok"
  title: string
  content: string
  scheduled_date: string
  status: "draft" | "pending-approval" | "approved" | "posted"
  images: ContentImage[]
  admin_message?: string
  post_url?: string
  engagement_rate?: number
  likes: number
  comments: number
  shares: number
  views: number
  approved_by?: string
  approved_by_name?: string
  approved_at?: string
  posted_at?: string
  created_at: string
  updated_at: string
}

export interface ContentImage {
  id: string
  image: string
  image_url: string
  caption?: string
  order: number
  created_at: string
}

export interface SocialMediaAccount {
  id: string
  client: string
  client_name: string
  platform: "instagram" | "tiktok" | "youtube" | "twitter" | "linkedin" | "facebook"
  account_id: string
  username: string
  is_active: boolean
  last_sync?: string
  created_at: string
  updated_at: string
  followers_count?: number
  engagement_rate?: number
  posts_count?: number
}

export interface RealTimeMetrics {
  id: string
  account: string
  account_username: string
  account_platform: string
  date: string
  followers_count: number
  following_count: number
  posts_count: number
  engagement_rate: number
  reach: number
  impressions: number
  profile_views: number
  website_clicks: number
  daily_growth: number
  created_at: string
}

export interface PerformanceData {
  id: string
  client: string
  client_name: string
  month: string
  followers: number
  engagement: number
  reach: number
  clicks: number
  impressions: number
  growth_rate: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender: string
  sender_name: string
  receiver: string
  receiver_name: string
  content: string
  read: boolean
  timestamp: string
}

export interface Invoice {
  id: string
  client: string
  client_name: string
  invoice_number: string
  amount: number
  due_date: string
  status: "paid" | "pending" | "overdue"
  paid_at?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  total_revenue: number
  active_clients: number
  pending_tasks: number
  overdue_payments: number
  total_followers_delivered: number
  monthly_growth_rate: number
}

export interface ClientDashboardStats {
  total_followers: number
  engagement_rate: number
  posts_this_month: number
  reach: number
  growth_rate: number
  next_payment_amount: number
  next_payment_date: string
}

export interface BillingPlan {
  id: string
  name: string
  price: number
  features: string[]
  paypal_plan_id: string
}
