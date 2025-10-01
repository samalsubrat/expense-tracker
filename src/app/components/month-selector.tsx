"use client"

import { useCallback, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Period {
  year: number
  month: number
  monthName: string
  display: string
  value: string
}

interface MonthSelectorProps {
  userId: string
  onPeriodChange: (year: number, month: number) => void
  currentYear: number
  currentMonth: number
}

export function MonthSelector({ userId, onPeriodChange, currentYear, currentMonth }: MonthSelectorProps) {
  const [periods, setPeriods] = useState<Period[]>([])
  const [currentPeriod, setCurrentPeriod] = useState<Period | null>(null)
  const [selectedValue, setSelectedValue] = useState<string>("")

  const fetchPeriods = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${userId}/periods`)
      if (response.ok) {
        const data = await response.json()
        setPeriods(data.periods)
        setCurrentPeriod(data.currentPeriod)
        
        // Set initial selected value
        const value = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
        setSelectedValue(value)
      }
    } catch (error) {
      console.error("Error fetching periods:", error)
    }
  }, [userId, currentYear, currentMonth])

  useEffect(() => {
    fetchPeriods()
  }, [fetchPeriods])

  useEffect(() => {
    // Update selected value when current year/month changes
    const value = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
    setSelectedValue(value)
  }, [currentYear, currentMonth])

  const handlePeriodSelect = (value: string) => {
    setSelectedValue(value)
    const [year, month] = value.split('-').map(Number)
    onPeriodChange(year, month)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    let newYear = currentYear
    let newMonth = currentMonth

    if (direction === 'prev') {
      newMonth--
      if (newMonth < 1) {
        newMonth = 12
        newYear--
      }
    } else {
      newMonth++
      if (newMonth > 12) {
        newMonth = 1
        newYear++
      }
    }

    const value = `${newYear}-${newMonth.toString().padStart(2, '0')}`
    setSelectedValue(value)
    onPeriodChange(newYear, newMonth)
  }

  const getCurrentMonthDisplay = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    return `${monthNames[currentMonth - 1]} ${currentYear}`
  }

  return (
    <div className="flex items-center gap-2 mb-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateMonth('prev')}
        className="h-9 w-9 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Select value={selectedValue} onValueChange={handlePeriodSelect}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder={getCurrentMonthDisplay()} />
        </SelectTrigger>
        <SelectContent>
          {/* Current month if not in periods */}
          {currentPeriod && !periods.some(p => p.value === currentPeriod.value) && (
            <SelectItem value={currentPeriod.value}>
              {currentPeriod.display} (Current)
            </SelectItem>
          )}
          {periods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.display}
              {period.value === currentPeriod?.value && " (Current)"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateMonth('next')}
        className="h-9 w-9 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Quick jump to current month */}
      {currentPeriod && selectedValue !== currentPeriod.value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePeriodSelect(currentPeriod.value)}
          className="text-xs"
        >
          Current Month
        </Button>
      )}
    </div>
  )
}