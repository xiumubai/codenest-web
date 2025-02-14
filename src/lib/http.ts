import { toast } from 'sonner';

interface RequestOptions extends RequestInit {
  timeout?: number;
  showError?: boolean;
}

interface RequestResponse<T> {
  data: T;
  message?: string;
  code?: number | string;
}

interface ErrorResponse {
  message: string;
  code?: number | string;
}

// 获取 token
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

// 超时控制
const timeoutPromise = (timeout: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('请求超时'));
    }, timeout);
  });
};

// 处理响应错误
const handleResponseError = (error: any, showError = true) => {
  const message = error.message || '服务器错误，请稍后重试';
  if (showError && typeof window !== 'undefined') {
    toast.error('请求失败', {
      description: message,
    });
  }
  throw error;
};

// 处理响应状态
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error((data as ErrorResponse).message || '请求失败') as Error & {
      status?: number;
      code?: string | number;
    };
    error.status = response.status;
    error.code = (data as ErrorResponse).code;
    throw error;
  }
  
  return data;
};

// HTTP 请求工具类
class Http {
  private baseURL: string;

  constructor() {
    this.baseURL = '';
  }

  // 请求方法
  private async request<T>(path: string, options: RequestOptions = {}): Promise<RequestResponse<T>> {
    const {
      timeout = 5000,
      showError = true,
      headers: customHeaders = {},
      ...restOptions
    } = options;

    // 构建请求头
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...customHeaders as Record<string, string>,
    });

    // 添加 token
    const token = getToken();
    if (token) {
      headers.set('Authorization', token);
    }

    try {
      // 构建完整的请求 URL
      const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;

      // 发起请求，带超时控制
      const response = await Promise.race([
        fetch(url, {
          ...restOptions,
          headers,
        }),
        timeoutPromise(timeout),
      ]) as Response;

      return await handleResponse(response);
    } catch (error: any) {
      return handleResponseError(error, showError);
    }
  }

  // GET 请求
  async get<T>(path: string, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  // POST 请求
  async post<T>(path: string, data?: any, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT 请求
  async put<T>(path: string, data?: any, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE 请求
  async delete<T>(path: string, options?: RequestOptions): Promise<RequestResponse<T>> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

// 创建实例
export const http = new Http();

// 导出类型
export type { RequestOptions, ErrorResponse }; 