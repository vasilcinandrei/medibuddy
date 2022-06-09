import React from 'react'
import { useParams } from "react-router-dom";
import { Bar, defaults } from 'react-chartjs-2'
import useFetch from "../useFetch";
import useAuth from "../hooks/useAuth";
defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const BarChart = () => {
    const { auth } = useAuth();
    const theToken = auth?.token;
    const { id } = useParams();
    const { data: user, error, isPending } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/patients/' + id)
    // console.log("limits:", user.limits.ecg_low)
    return (
        <section>


            <div>
                {user && (
                    <Bar
                        data={{
                            labels: ['ecg_low', 'ecg_high'],
                            datasets: [
                                {
                                    label: 'EKG',
                                    data: [user.limits.ecg_low, user.limits.ecg_high],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(75, 192, 192, 0.2)',
                                        // 'rgba(75, 192, 192, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(255, 99, 132, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(153, 102, 255, 1)',
                                        // 'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                // {
                                //   label: 'Quantity',
                                //   data: [47, 52, 67, 58, 9, 50],
                                //   backgroundColor: 'orange',
                                //   borderColor: 'red',
                                // },
                            ],
                        }}
                        height={300}
                        width={100}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            legend: {
                                labels: {
                                    fontSize: 25,
                                },
                            },
                        }}
                    />
                )}

            </div>
            <div>
                {user && (
                    <Bar
                        data={{
                            labels: ['humidity_low', 'humidity_high'],
                            datasets: [
                                {
                                    label: 'Humidity',
                                    data: [user.limits.humidity_low, user.limits.humidity_high],
                                    backgroundColor: [
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(75, 192, 192, 0.2)',
                                        // 'rgba(75, 192, 192, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(153, 102, 255, 1)',
                                        // 'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                // {
                                //   label: 'Quantity',
                                //   data: [47, 52, 67, 58, 9, 50],
                                //   backgroundColor: 'orange',
                                //   borderColor: 'red',
                                // },
                            ],
                        }}
                        height={300}
                        width={100}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            legend: {
                                labels: {
                                    fontSize: 25,
                                },
                            },
                        }}
                    />
                )}

            </div>
            <div>
                {user && (
                    <Bar
                        data={{
                            labels: ['temperature_low', 'temeprature_high'],
                            datasets: [
                                {
                                    label: 'Temperature',
                                    data: [user.limits.temperature_low, user.limits.temperature_high],
                                    backgroundColor: [
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(75, 192, 192, 0.2)',
                                        // 'rgba(75, 192, 192, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(153, 102, 255, 1)',
                                        // 'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                // {
                                //   label: 'Quantity',
                                //   data: [47, 52, 67, 58, 9, 50],
                                //   backgroundColor: 'orange',
                                //   borderColor: 'red',
                                // },
                            ],
                        }}
                        height={300}
                        width={100}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            legend: {
                                labels: {
                                    fontSize: 25,
                                },
                            },
                        }}
                    />
                )}

            </div>
            <div>
                {user && (
                    <Bar
                        data={{
                            labels: ['pulse_low', 'pulse_high'],
                            datasets: [
                                {
                                    label: 'Pulse',
                                    data: [user.limits.pulse_low, user.limits.pulse_high],
                                    backgroundColor: [
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(153, 102, 255, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                        // 'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        // 'rgba(153, 102, 255, 1)',
                                        // 'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                // {
                                //   label: 'Quantity',
                                //   data: [47, 52, 67, 58, 9, 50],
                                //   backgroundColor: 'orange',
                                //   borderColor: 'red',
                                // },
                            ],
                        }}
                        height={300}
                        width={100}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            legend: {
                                labels: {
                                    fontSize: 25,
                                },
                            },
                        }}
                    />
                )}

            </div>
        </section>
    )
}

export default BarChart