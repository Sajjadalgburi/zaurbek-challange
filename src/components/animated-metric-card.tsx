import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedMetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedMetricCard({
  title,
  value,
  description,
  change,
  icon,
  className,
  delay = 0,
}: AnimatedMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && (
            <div className="h-4 w-4 text-muted-foreground">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-2xl font-bold"
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </motion.div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
          {change && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.4 }}
              className={cn(
                "text-xs mt-1 font-medium",
                change.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {change.isPositive ? '+' : '-'}{change.value.toFixed(2)}% from last period
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}