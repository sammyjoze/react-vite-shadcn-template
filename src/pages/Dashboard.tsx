import { useNavigate } from 'react-router-dom'
import { Home, Shield } from 'lucide-react'
import { DesignaliCreative } from '@/components/creative'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <DesignaliCreative />
    </div>
  )
} 