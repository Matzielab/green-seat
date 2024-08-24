import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { DashboardData, getDashboardData } from "app/actions/getDashboardData";
import { useAuth } from "hooks/useAuth";
import { LoadingIndicator } from "./LoadingIndicator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: string;
}> = ({ title, value, icon }) => (
  <div className="bg-gray-700 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-50 truncate">
              {title}
            </dt>
            <dd className="text-3xl font-semibold text-gray-100">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export const DashboardDataBento: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async (userId: string) => {
      try {
        const data = await getDashboardData(userId);
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (user) fetchData(user.uid);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingIndicator size="large" />
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Meetings"
          value={dashboardData.totalMeetings}
          icon="🤝"
        />

        <StatCard
          title="Environmental reports"
          value={dashboardData.numberOfEnvironmentalReports}
          icon="🌱"
        />

        <StatCard
          title="Total Files"
          value={dashboardData.totalFiles}
          icon="📁"
        />

        <StatCard
          title="Meetings by Me"
          value={dashboardData.createdByMe}
          icon="🥰"
        />

        <StatCard
          title="Meetings This Week"
          value={dashboardData.createdThisWeek}
          icon="🕖"
        />
        <StatCard
          title="Meetings This Month"
          value={dashboardData.createdThisMonth}
          icon="📅"
        />

        <div className="bg-gray-700 overflow-hidden shadow rounded-lg col-span-full lg:col-span-3">
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-100 mb-4">
              Meetings Over Time
            </h2>
            <Bar
              data={{
                labels: dashboardData.meetingsOverTime.labels,
                datasets: [
                  {
                    label: "Meetings",
                    data: dashboardData.meetingsOverTime.data,
                    backgroundColor: "#10b981",
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: {
                      color: "white",
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: {
                      color: "white",
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
