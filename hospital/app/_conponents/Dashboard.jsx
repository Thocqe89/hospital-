"use client"
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip, Legend, Cell, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Users, ScrollText } from 'lucide-react';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      genderData: [],
      monthlyData: [],
      activeIndex: 0
    };
  }

  componentDidMount() {
    GlobalApi.getPatiented()
      .then(response => {
        const patientsData = response.data.data;
        const genderData = this.calculateGenderData(patientsData);
        const monthlyData = this.calculateMonthlyData(patientsData);
        this.setState({ patients: patientsData, genderData, monthlyData });
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }

  calculateGenderData(data) {
    const genderCounts = data.reduce((acc, patient) => {
      const gender = patient.attributes.gender;
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(genderCounts).map(gender => ({
      name: gender,
      value: genderCounts[gender],
    }));
  }

  calculateMonthlyData(data) {
    const monthlyCounts = data.reduce((acc, patient) => {
      const createdAt = new Date(patient.attributes.createdAt);
      const year = createdAt.getFullYear(); // Extract the year
      const month = createdAt.getMonth() + 1; // Extract the month (1-indexed)
      const monthYear = `${year}-${String(month).padStart(2, '0')}`;
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {});

    // Determine the range of years based on the data
    const minYear = Math.min(...Object.keys(monthlyCounts).map(monthYear => parseInt(monthYear.split('-')[0])));
    const maxYear = Math.max(...Object.keys(monthlyCounts).map(monthYear => parseInt(monthYear.split('-')[0])));

    // Generate all months for each year within the range
    const allMonths = [];
    for (let year = minYear; year <= maxYear; year++) {
      for (let month = 1; month <= 12; month++) {
        allMonths.push(`${year}-${String(month).padStart(2, '0')}`);
      }
    }

    // Populate monthly data with zero counts for missing months
    const monthlyData = allMonths.map(monthYear => ({
      name: monthYear,
      value: monthlyCounts[monthYear] || 0,
    }));

    return monthlyData;
  }

  COLORS = ['#040404','#E37006','#0D7A68' ,'#0D7A68'  ];

  onPieEnter = (_, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { genderData, monthlyData, activeIndex } = this.state;

    return (
      <div>
        <div className="px-4 sm:px-10 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full h-96">
              <h3 className='flex gap-3 '>
                <Users className='text-primary ' />
                ເພດ
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                    outerRadius={140} // Adjusted for donut style
                    innerRadius={100} // Adjusted for donut style
                    startAngle={80}
                    endAngle={550}
                    fill="#0D7A68"
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={this.onPieEnter}
                  >
                    {
                      genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
                      ))
                    }
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full h-96">
              <h3 className='flex gap-3 items-center'>
                <ScrollText className='text-primary ' />
                ຄົນເຈັບ
              </h3>
              <ResponsiveContainer className='text-primary' width="100%" height="100%">
                <BarChart  width="100%" height="100%" data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="8 8" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend  />
                  <Bar dataKey="value" fill="#0D7A68" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
