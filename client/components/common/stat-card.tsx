interface StatCardProps {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
    trend?: {
      value: string;
      isPositive: boolean;
    };
  }
  
  export default function StatCard({ value, label, icon, trend }: StatCardProps) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-card border border-neutral-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              {value}
            </p>
            <p className="text-sm text-neutral-600">
              {label}
            </p>
            {trend && (
              <div className={`mt-2 inline-flex items-center text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <svg 
                  className={`w-3 h-3 mr-1 ${trend.isPositive ? '' : 'rotate-180'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                {trend.value}
              </div>
            )}
          </div>
          {icon && (
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }