interface StepCardProps {
    step: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
  }
  
  export default function StepCard({ step, title, description, icon }: StepCardProps) {
    return (
      <div className="relative">
        {/* Step Number Badge */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
          {step}
        </div>
  
        {/* Card */}
        <div className="bg-white rounded-2xl p-8 pt-10 shadow-card border border-neutral-100 hover:shadow-card-hover transition-all duration-300 h-full">
          {icon && (
            <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
              {icon}
            </div>
          )}
          <h3 className="text-xl font-bold text-neutral-900 mb-3">
            {title}
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }