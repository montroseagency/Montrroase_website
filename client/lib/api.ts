// API Service for Montrroase Next.js Client
// Singleton class that handles all HTTP communication with backend

class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    // Only set token from localStorage in browser context
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    } else {
      this.token = null;
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Token ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
          throw new Error('Authentication failed');
        }

        const errorData = await response.json().catch(() => ({}));
        console.error('Error data from API:', errorData);
        const error: any = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        error.response = { data: errorData };
        throw error;
      }

      // Handle empty responses (like DELETE)
      if (response.status === 204) {
        return null as T;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return null as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Helper method to handle paginated responses from Django REST Framework
  private handlePaginatedResponse<T>(response: any): T {
    // Check if response is paginated (has 'results' field)
    if (response && typeof response === 'object' && 'results' in response) {
      // Return just the results array for backward compatibility
      return response.results as T;
    }
    // If not paginated, return as-is
    return response as T;
  }

  // ============ AUTHENTICATION METHODS ============

  async login(email: string, password: string) {
    const response = await this.request<{
      user: any;
      token: string;
    }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }

    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    role: string;
    company?: string;
  }) {
    const response = await this.request<{
      user: any;
      token: string;
    }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }

    return response;
  }

  async logout(): Promise<void> {
    if (this.token) {
      await this.request('/auth/logout/', {
        method: 'POST',
      });
    }

    this.clearToken();
  }

  async getCurrentUser() {
    return await this.request('/auth/me/');
  }

  async getMe() {
    // Alias for getCurrentUser for backward compatibility
    return await this.getCurrentUser();
  }

  // ============ EMAIL VERIFICATION METHODS ============

  async sendVerificationCode(data: {
    email: string;
    name: string;
    purpose?: 'registration' | 'password_reset';
  }) {
    return await this.request('/auth/send-verification-code/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyAndRegister(data: {
    email: string;
    password: string;
    name: string;
    role: string;
    company?: string;
    verification_code: string;
  }) {
    const response = await this.request<{
      user: any;
      token: string;
    }>('/auth/verify-and-register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }

    return response;
  }

  async resendVerificationCode(data: {
    email: string;
    name: string;
    purpose?: 'registration' | 'password_reset';
  }) {
    return await this.request('/auth/resend-verification-code/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProfile(profileData: any) {
    return await this.request('/auth/me/', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
  }

  async updateProfileWithAvatar(profileData: any, avatarFile?: File) {
    const formData = new FormData();

    // Add profile fields
    Object.keys(profileData).forEach(key => {
      if (profileData[key] !== null && profileData[key] !== undefined) {
        formData.append(key, profileData[key]);
      }
    });

    // Add avatar if provided
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    const url = `${this.baseURL}/auth/me/`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${this.token}`,
        // Don't set Content-Type for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update profile');
    }

    return await response.json();
  }

  async changePassword(data: { current_password: string; new_password: string }) {
    return await this.request('/auth/change-password/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============ DASHBOARD STATS METHODS ============

  async getDashboardStats() {
    return await this.request('/dashboard/stats/');
  }

  async getClientDashboardStats() {
    return await this.request('/dashboard/client-stats/');
  }

  // ============ CLIENT MANAGEMENT METHODS ============

  async getClients() {
    const response = await this.request('/clients/');
    return this.handlePaginatedResponse(response);
  }

  async getClient(id: string) {
    return await this.request(`/clients/${id}/`);
  }

  async updateClient(id: string, data: any) {
    return await this.request(`/clients/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async updatePaymentStatus(id: string, paymentStatus: string) {
    return await this.request(`/clients/${id}/update_payment_status/`, {
      method: 'POST',
      body: JSON.stringify({ payment_status: paymentStatus }),
    });
  }

  // ============ TASK MANAGEMENT METHODS ============

  async getTasks() {
    const response = await this.request('/tasks/');
    return this.handlePaginatedResponse(response);
  }

  async createTask(taskData: any) {
    return await this.request('/tasks/', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id: string, data: any) {
    return await this.request(`/tasks/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTask(id: string) {
    return await this.request(`/tasks/${id}/`, {
      method: 'DELETE',
    });
  }

  async bulkUpdateTasks(data: {
    task_ids: string[];
    status?: string;
    assigned_to?: string;
    priority?: string;
  }) {
    return await this.request('/tasks/bulk_update/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============ CONTENT MANAGEMENT METHODS ============

  async getContent() {
    const response = await this.request('/content/');
    return this.handlePaginatedResponse(response);
  }

  async createContent(contentData: any) {
    // If contentData is FormData, send it directly
    if (contentData instanceof FormData) {
      const url = `${this.baseURL}/content/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(this.token && { Authorization: `Token ${this.token}` }),
          // Don't set Content-Type for FormData - browser will set it with boundary
        },
        body: contentData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    }

    // Otherwise use the regular request method
    return await this.request('/content/', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
  }

  async updateContent(id: string, contentData: any) {
    // Support both FormData and regular JSON updates
    if (contentData instanceof FormData) {
      const url = `${this.baseURL}/content/${id}/`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          ...(this.token && { Authorization: `Token ${this.token}` }),
        },
        body: contentData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    }

    return await this.request(`/content/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(contentData),
    });
  }

  async deleteContent(id: string) {
    return await this.request(`/content/${id}/`, {
      method: 'DELETE',
    });
  }

  async bulkDeleteContent(data: { content_ids: string[] }) {
    return await this.request('/content/bulk_delete/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async approveContent(id: string) {
    return await this.request(`/content/${id}/approve/`, {
      method: 'POST',
    });
  }

  async rejectContent(id: string) {
    return await this.request(`/content/${id}/reject/`, {
      method: 'POST',
    });
  }

  async markContentPosted(id: string, data: {
    post_url: string;
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
  }) {
    return await this.request(`/content/${id}/mark_posted/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async bulkApproveContent(data: {
    content_ids: string[];
    action: 'approve' | 'reject';
    feedback?: string;
  }) {
    return await this.request('/content/bulk_approve/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async bulkMarkContentPosted(data: { content_ids: string[] }) {
    return await this.request('/content/bulk_mark_posted/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async setContentDraft(id: string) {
    return await this.request(`/content/${id}/set_draft/`, {
      method: 'POST',
    });
  }

  async getContentByPlatform(platform: 'instagram' | 'youtube' | 'tiktok') {
    return await this.request(`/content/by_platform/?platform=${platform}`);
  }

  async getContentCalendarView(startDate?: string, endDate?: string) {
    let url = '/content/calendar_view/';
    const params = new URLSearchParams();

    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return await this.request(url);
  }

  // ============ CONTENT REQUEST METHODS ============

  async getContentRequests() {
    const response = await this.request('/content-requests/');
    return this.handlePaginatedResponse(response);
  }

  async getContentRequest(id: string) {
    return await this.request(`/content-requests/${id}/`);
  }

  async createContentRequest(requestData: FormData | any) {
    if (requestData instanceof FormData) {
      const url = `${this.baseURL}/content-requests/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(this.token && { Authorization: `Token ${this.token}` }),
        },
        body: requestData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    }

    return await this.request('/content-requests/', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async updateContentRequest(id: string, data: any) {
    return await this.request(`/content-requests/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteContentRequest(id: string) {
    return await this.request(`/content-requests/${id}/`, {
      method: 'DELETE',
    });
  }

  async startContentRequestProgress(id: string) {
    return await this.request(`/content-requests/${id}/start_progress/`, {
      method: 'POST',
    });
  }

  async markContentRequestCompleted(id: string) {
    return await this.request(`/content-requests/${id}/mark_completed/`, {
      method: 'POST',
    });
  }

  async rejectContentRequest(id: string, reason: string) {
    return await this.request(`/content-requests/${id}/reject/`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // ============ PERFORMANCE & ANALYTICS METHODS ============

  async getPerformanceData(clientId?: string) {
    const endpoint = clientId ? `/performance/?client_id=${clientId}` : '/performance/';
    const response = await this.request(endpoint);
    return this.handlePaginatedResponse(response);
  }

  async getMonthlyReport(month?: string) {
    const endpoint = month ? `/performance/monthly_report/?month=${month}` : '/performance/monthly_report/';
    return await this.request(endpoint);
  }

  async getAnalyticsOverview() {
    return await this.request('/analytics/overview/');
  }

  async getClientPerformanceReport(clientId: string) {
    return await this.request(`/analytics/client/${clientId}/`);
  }

  // ============ MESSAGING METHODS ============

  async getMessages() {
    const response = await this.request('/messages/');
    return this.handlePaginatedResponse(response);
  }

  async sendMessage(receiverId: string, content: string) {
    // Handle special case for sending to admin
    if (receiverId === 'admin') {
      return await this.request('/messages/send-to-admin/', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    }

    // For admin sending to client
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    if (user.role === 'admin') {
      return await this.request('/messages/send-to-client/', {
        method: 'POST',
        body: JSON.stringify({ client_id: receiverId, content }),
      });
    }

    // Default behavior for direct user-to-user messages
    return await this.request('/messages/', {
      method: 'POST',
      body: JSON.stringify({ receiver: receiverId, content }),
    });
  }

  async markMessageRead(messageId: string) {
    return await this.request(`/messages/${messageId}/mark_read/`, {
      method: 'POST',
    });
  }

  async getConversations() {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    if (user.role === 'admin') {
      const response = await this.request('/messages/admin-conversations/');
      // Admin conversations endpoint returns a custom format
      if (response && typeof response === 'object' && 'conversations' in response) {
        return (response as any).conversations;
      }
      return response;
    }
    const response = await this.request('/messages/conversations/');
    return this.handlePaginatedResponse(response);
  }

  async getConversationMessages(userId: string) {
    const response = await this.request(`/messages/conversation/${userId}/`);
    return this.handlePaginatedResponse(response);
  }

  // ============ NOTIFICATION METHODS ============

  async getNotifications() {
    const response = await this.request('/notifications/');
    return this.handlePaginatedResponse(response);
  }

  async markNotificationRead(id: string) {
    return await this.request(`/notifications/${id}/mark_read/`, {
      method: 'POST',
    });
  }

  async markAllNotificationsRead() {
    return await this.request('/notifications/mark_all_read/', {
      method: 'POST',
    });
  }

  // ============ INVOICE METHODS ============

  async getInvoices() {
    const response = await this.request('/invoices/');
    return this.handlePaginatedResponse(response);
  }

  async markInvoicePaid(id: string) {
    return await this.request(`/invoices/${id}/mark_paid/`, {
      method: 'POST',
    });
  }

  async createInvoice(invoiceData: any) {
    return await this.request('/invoices/', {
      method: 'POST',
      body: JSON.stringify(invoiceData),
    });
  }

  // ============ SOCIAL MEDIA ACCOUNT METHODS ============

  async getConnectedAccounts() {
    const response = await this.request('/social-accounts/');
    // Check if this is the OAuth view response format
    if (response && typeof response === 'object' && 'accounts' in response) {
      return (response as any).accounts;
    }
    return this.handlePaginatedResponse(response);
  }

  async initiateOAuth(platform: string) {
    return await this.request(`/oauth/${platform}/initiate/`);
  }

  async handleOAuthCallback(platform: string, code: string, state: string) {
    return await this.request(`/oauth/${platform}/callback/`, {
      method: 'POST',
      body: JSON.stringify({ code, state }),
    });
  }

  async disconnectAccount(accountId: string) {
    return await this.request(`/social-accounts/${accountId}/disconnect/`, {
      method: 'POST',
    });
  }

  async triggerManualSync(accountId: string) {
    return await this.request(`/social-accounts/${accountId}/sync/`, {
      method: 'POST',
    });
  }

  async getSyncStatus(accountId: string) {
    return await this.request(`/social-accounts/${accountId}/status/`);
  }

  // ============ REAL-TIME METRICS METHODS ============

  async getRealTimeMetrics() {
    const response = await this.request('/metrics/realtime/');
    // Real-time metrics has a custom response format
    if (response && typeof response === 'object' && 'data' in response) {
      return (response as any).data;
    }
    return response;
  }

  // ============ FILE UPLOAD METHODS ============

  async uploadFile(file: File, clientId: string, fileType: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('client', clientId);
    formData.append('file_type', fileType);

    const url = `${this.baseURL}/files/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Token ${this.token}` }),
        // Don't set Content-Type for FormData, let browser set it
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // ============ PAYPAL BILLING METHODS ============

  async getAvailablePlans() {
    return await this.request('/billing/plans/');
  }

  async getCurrentSubscription() {
    return await this.request('/billing/subscription/');
  }

  async createSubscription(data: { price_id: string; plan_name: string }) {
    return await this.request('/billing/create-subscription/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async approveSubscription(data: { subscription_id: string }) {
    return await this.request('/billing/approve-subscription/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelSubscription(data?: { reason?: string }) {
    return await this.request('/billing/cancel-subscription/', {
      method: 'POST',
      body: JSON.stringify(data || {}),
    });
  }

  async payInvoice(invoiceId: string) {
    return await this.request(`/billing/invoices/${invoiceId}/pay/`, {
      method: 'POST',
    });
  }

  async capturePayment(data: { order_id: string }) {
    return await this.request('/billing/capture-payment/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPaymentMethods() {
    return await this.request('/billing/payment-methods/');
  }

  async createSetupIntent() {
    return await this.request('/billing/create-setup-intent/', {
      method: 'POST',
    });
  }

  async setDefaultPaymentMethod(paymentMethodId: string) {
    return await this.request(`/billing/payment-methods/${paymentMethodId}/set-default/`, {
      method: 'POST',
    });
  }

  async deletePaymentMethod(paymentMethodId: string) {
    return await this.request(`/billing/payment-methods/${paymentMethodId}/delete/`, {
      method: 'DELETE',
    });
  }

  // ============ BANK TRANSFER METHODS ============

  async getAdminBankSettings() {
    return await this.request('/admin/bank-settings/');
  }

  async updateAdminBankSettings(data: {
    admin_full_name: string;
    iban: string;
    bank_name?: string;
    swift_code?: string;
    additional_info?: string;
  }) {
    return await this.request('/admin/bank-settings/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitPaymentVerification(data: {
    plan: string;
    amount: number;
    client_full_name: string;
  }) {
    return await this.request('/billing/submit-verification/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPendingVerifications() {
    return await this.request('/admin/pending-verifications/');
  }

  async approvePaymentVerification(verificationId: string, planId: string) {
    return await this.request(`/admin/approve-verification/${verificationId}/`, {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
    });
  }

  // ============ ADMIN METHODS ============

  async getAdminBillingSettings() {
    return await this.request('/admin/billing-settings/');
  }

  async deleteAdminAccount() {
    return await this.request('/admin/delete-account/', {
      method: 'POST',
    });
  }

  // ============ UTILITY METHODS ============

  async getAllPaginatedData<T>(endpoint: string, maxPages: number = 10): Promise<T[]> {
    let allData: T[] = [];
    let nextUrl: string | null = endpoint;
    let pageCount = 0;

    while (nextUrl && pageCount < maxPages) {
      const response: any = await this.request<any>(nextUrl.replace(this.baseURL, ''));

      if (response && typeof response === 'object' && 'results' in response) {
        allData = allData.concat(response.results as T[]);
        nextUrl = response.next;
      } else {
        allData = allData.concat(response as T[]);
        nextUrl = null;
      }

      pageCount++;
    }

    return allData;
  }

  async healthCheck() {
    return await this.request('/health/');
  }

  // Token management
  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  // ============ REDEEM CODE METHODS ============

  async redeemCode(code: string) {
    return await this.request('/wallet/redeem/', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  async getMyRedeemedCodes() {
    return await this.request('/wallet/my-redeemed-codes/');
  }

  async getRedeemCodes() {
    return await this.request('/redeem-codes/');
  }

  async createRedeemCode(data: any) {
    return await this.request('/redeem-codes/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateRedeemCode(id: string, data: any) {
    return await this.request(`/redeem-codes/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getRedeemCodeStats() {
    return await this.request('/redeem-codes/stats/');
  }

  // ============ SERVICE MANAGEMENT API ============

  async getMyServices() {
    return await this.request('/service-settings/my_services/');
  }

  async activateService(serviceType: 'marketing' | 'website' | 'courses') {
    return await this.request('/service-settings/activate_service/', {
      method: 'POST',
      body: JSON.stringify({ service_type: serviceType }),
    });
  }

  async deactivateService(serviceType: 'marketing' | 'website' | 'courses') {
    return await this.request('/service-settings/deactivate_service/', {
      method: 'POST',
      body: JSON.stringify({ service_type: serviceType }),
    });
  }

  async updateServiceSettings(settingsId: string, settings: any) {
    return await this.request(`/service-settings/${settingsId}/update_settings/`, {
      method: 'PATCH',
      body: JSON.stringify({ settings }),
    });
  }

  async getAllServiceSettings() {
    return await this.request('/service-settings/');
  }

  // ============ COURSE API ============

  async getCourses() {
    return await this.request('/courses/');
  }

  async getCourse(id: string) {
    return await this.request(`/courses/${id}/`);
  }

  async createCourse(data: any) {
    return await this.request('/courses/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCourse(id: string, data: any) {
    return await this.request(`/courses/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCourse(id: string) {
    return await this.request(`/courses/${id}/`, {
      method: 'DELETE',
    });
  }

  // ============ COURSE PURCHASE API ============

  async purchaseCourse(courseId: string, paymentMethod: 'wallet' | 'paypal' = 'paypal') {
    return await this.request(`/courses/${courseId}/purchase/`, {
      method: 'POST',
      body: JSON.stringify({ payment_method: paymentMethod }),
    });
  }

  async confirmPayPalCoursePurchase(courseId: string, paypalOrderId: string, paypalPayerId?: string) {
    return await this.request(`/courses/${courseId}/confirm_paypal_purchase/`, {
      method: 'POST',
      body: JSON.stringify({
        paypal_order_id: paypalOrderId,
        paypal_payer_id: paypalPayerId,
      }),
    });
  }

  async getMyCoursePurchases() {
    return await this.request('/courses/my_purchases/');
  }

  // ============ AGENT FEATURE METHODS (PHASE 6) ============

  // Website Agent Methods
  async getWebsiteVersions() {
    return await this.request('/website-versions/');
  }

  async getWebsiteVersion(id: string) {
    return await this.request(`/website-versions/${id}/`);
  }

  async uploadWebsiteVersion(formData: FormData) {
    const url = `${this.baseURL}/website-versions/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Token ${this.token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Upload failed');
    }

    return await response.json();
  }

  async updateWebsiteVersion(id: string, data: any) {
    return await this.request(`/website-versions/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async approveWebsiteVersion(id: string) {
    return await this.request(`/website-versions/${id}/approve/`, {
      method: 'POST',
    });
  }

  async deployWebsiteVersion(id: string, deploymentUrl: string) {
    return await this.request(`/website-versions/${id}/deploy/`, {
      method: 'POST',
      body: JSON.stringify({ deployment_url: deploymentUrl }),
    });
  }

  async addVersionFeedback(id: string, feedback: string) {
    return await this.request(`/website-versions/${id}/add_feedback/`, {
      method: 'POST',
      body: JSON.stringify({ feedback }),
    });
  }

  async getMyWebsiteUploads() {
    return await this.request('/website-versions/my_uploads/');
  }

  // Marketing Agent Methods - Campaigns
  async getCampaigns() {
    return await this.request('/campaigns/');
  }

  async getCampaign(id: string) {
    return await this.request(`/campaigns/${id}/`);
  }

  async createCampaign(data: any) {
    return await this.request('/campaigns/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCampaign(id: string, data: any) {
    return await this.request(`/campaigns/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCampaign(id: string) {
    return await this.request(`/campaigns/${id}/`, {
      method: 'DELETE',
    });
  }

  async addContentToCampaign(id: string, contentPostIds: string[]) {
    return await this.request(`/campaigns/${id}/add_content/`, {
      method: 'POST',
      body: JSON.stringify({ content_post_ids: contentPostIds }),
    });
  }

  async updateCampaignMetrics(id: string, metrics: {
    actual_reach?: number;
    actual_engagement?: number;
    actual_spend?: number;
  }) {
    return await this.request(`/campaigns/${id}/update_metrics/`, {
      method: 'POST',
      body: JSON.stringify(metrics),
    });
  }

  async changeCampaignStatus(id: string, status: string) {
    return await this.request(`/campaigns/${id}/change_status/`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  }

  async getMyCampaigns() {
    return await this.request('/campaigns/my_campaigns/');
  }

  async getCampaignAnalytics() {
    return await this.request('/campaigns/analytics/');
  }

  // Marketing Agent Methods - Content Scheduling
  async getScheduledContent(params?: {
    start_date?: string;
    end_date?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = queryParams ? `/content-schedule/?${queryParams}` : '/content-schedule/';
    return await this.request(endpoint);
  }

  async getScheduledContentItem(id: string) {
    return await this.request(`/content-schedule/${id}/`);
  }

  async scheduleContent(data: any) {
    return await this.request('/content-schedule/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateScheduledContent(id: string, data: any) {
    return await this.request(`/content-schedule/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteScheduledContent(id: string) {
    return await this.request(`/content-schedule/${id}/`, {
      method: 'DELETE',
    });
  }

  async getContentCalendar(params?: {
    start_date?: string;
    end_date?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams(params as any).toString();
    const endpoint = queryParams ? `/content-schedule/calendar/?${queryParams}` : '/content-schedule/calendar/';
    return await this.request(endpoint);
  }

  async approveScheduledContent(id: string) {
    return await this.request(`/content-schedule/${id}/approve/`, {
      method: 'POST',
    });
  }

  async publishScheduledContent(id: string, data: {
    post_url: string;
    platform_post_id?: string;
  }) {
    return await this.request(`/content-schedule/${id}/publish/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelScheduledContent(id: string) {
    return await this.request(`/content-schedule/${id}/cancel/`, {
      method: 'POST',
    });
  }

  async getUpcomingScheduledContent() {
    return await this.request('/content-schedule/upcoming/');
  }

  async getOverdueScheduledContent() {
    return await this.request('/content-schedule/overdue/');
  }

  // ============ WALLET PAYMENT METHODS (PHASE 7) ============

  // Wallet operations
  async getWallet() {
    return await this.request('/wallet/');
  }

  async payFromWallet(data: {
    amount: number;
    description: string;
    paid_for_service?: string;
  }) {
    return await this.request('/wallet/pay/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async topUpWallet(data: {
    amount: number;
    payment_method: 'paypal' | 'stripe' | 'bank_transfer';
    payment_reference?: string;
  }) {
    return await this.request('/wallet/topup/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async checkWalletAffordability(serviceCost: number) {
    return await this.request('/wallet/check_affordability/', {
      method: 'POST',
      body: JSON.stringify({ service_cost: serviceCost }),
    });
  }

  async getWalletTransactions(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return await this.request(`/wallet/transactions/${params}`);
  }

  // Auto-recharge operations
  async getAutoRechargeSettings() {
    return await this.request('/wallet-auto-recharge/');
  }

  async configureAutoRecharge(data: {
    is_enabled: boolean;
    threshold_amount: number;
    recharge_amount: number;
    payment_method_id?: string;
    payment_method_type?: 'paypal' | 'card';
  }) {
    return await this.request('/wallet-auto-recharge/configure/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async triggerAutoRecharge() {
    return await this.request('/wallet-auto-recharge/trigger/', {
      method: 'POST',
    });
  }

  async disableAutoRecharge() {
    return await this.request('/wallet-auto-recharge/disable/', {
      method: 'POST',
    });
  }

  // ============ AGENT MANAGEMENT METHODS ============

  async getAgentsWithRequests() {
    return await this.request('/client-access-requests/agents_with_requests/');
  }

  async assignClientToAgent(agentId: string, clientId: string) {
    return await this.request('/client-access-requests/assign_client/', {
      method: 'POST',
      body: JSON.stringify({ agent_id: agentId, client_id: clientId }),
    });
  }

  async transferClient(clientId: string, newAgentId: string) {
    return await this.request('/client-access-requests/transfer_client/', {
      method: 'POST',
      body: JSON.stringify({ client_id: clientId, new_agent_id: newAgentId }),
    });
  }

  async unassignClient(clientId: string) {
    return await this.request('/client-access-requests/unassign_client/', {
      method: 'POST',
      body: JSON.stringify({ client_id: clientId }),
    });
  }

  async approveClientRequest(requestId: string, reviewNote?: string) {
    return await this.request(`/client-access-requests/${requestId}/approve/`, {
      method: 'POST',
      body: JSON.stringify({ review_note: reviewNote }),
    });
  }

  async denyClientRequest(requestId: string, reviewNote: string) {
    return await this.request(`/client-access-requests/${requestId}/deny/`, {
      method: 'POST',
      body: JSON.stringify({ review_note: reviewNote }),
    });
  }

  // ============ GENERIC API METHODS ============

  async get(endpoint: string) {
    return await this.request(endpoint);
  }

  async post(endpoint: string, data: any) {
    return await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint: string, data: any) {
    return await this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return await this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Export a singleton instance
export default new ApiService();
