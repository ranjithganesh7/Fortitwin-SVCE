"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function ReportChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Communication",
          "Problem Solving",
          "Adaptability",
          "Leadership",
          "Emotional Intelligence",
          "Teamwork",
        ],
        datasets: [
          {
            label: "Your Profile",
            data: [92, 85, 70, 65, 78, 80],
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 2,
            pointBackgroundColor: "#000",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#000",
          },
          {
            label: "Average Candidate",
            data: [70, 65, 60, 55, 60, 65],
            backgroundColor: "rgba(200, 200, 200, 0.2)",
            borderColor: "rgba(200, 200, 200, 1)",
            borderWidth: 2,
            pointBackgroundColor: "#ccc",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#ccc",
          },
        ],
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false,
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            angleLines: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            pointLabels: {
              color: "#000",
              font: {
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
        },
        elements: {
          line: {
            tension: 0.2,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
