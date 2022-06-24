import React from 'react'
import { useParams } from "react-router-dom";
import { Line, defaults } from 'react-chartjs-2'
import useFetch from "../useFetch";
import useAuth from "../hooks/useAuth";
defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const LineChart = () => {
    const { auth } = useAuth();
    const theToken = auth?.token;
    const { id } = useParams();

    const { data: user, error, isPending } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/patient/measurements/?date=2022-06-22')
    // console.log("data:", user[0].ecg)


    return (
        <section>


            <div>
                {user && (
                    <Line
                        data={{
                            labels: [70, 75, 77, 83, 85, 90, 100],
                            datasets: [
                                {
                                    label: 'EKG',
                                    // data: [user.limits.ecg_low, user.limits.ecg_high],
                                    data: [70, 75, 77, 83, 85, 90, 100],
                                    backgroundColor: [
                                        'rgba(0, 0, 0, 0)',
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
                                {
                                    label: 'EKG_low',
                                    // data: [user.limits.ecg_low, user.limits.ecg_high],
                                    data: [60, 60, 60, 60, 60, 60, 60],
                                    backgroundColor: [
                                        'rgba(0, 0, 0, 0)',
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
                                {
                                    label: 'EKG_high',
                                    // data: [user.limits.ecg_low, user.limits.ecg_high],
                                    data: [100, 100, 100, 100, 100, 100, 100],
                                    backgroundColor: 'rgba(0, 0, 0, 0)',

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
                                            beginAtZero: false,
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
                    <Line
                        data={{
                            labels: [45, 47, 49, 51, 52, 50, 49, 50],
                            datasets: [
                                {
                                    label: 'Humidity',
                                    data: [45, 47, 49, 51, 52, 50, 49, 50],
                                    backgroundColor: [
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(255, 99, 132, 0.2)',
                                        'rgba(0, 0, 0, 0)',
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
                                {
                                    label: 'Humidity_high',
                                    data: [50, 50, 50, 50, 50, 50, 50, 50],
                                    backgroundColor: [
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(255, 99, 132, 0.2)',
                                        'rgba(0, 0, 0, 0)',
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
                                {
                                    label: 'Humidity_low',
                                    data: [35, 35, 35, 35, 35, 35, 35, 35,],
                                    backgroundColor: [
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(255, 99, 132, 0.2)',
                                        'rgba(0, 0, 0, 0)',
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
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
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
                                            beginAtZero: false,
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
                    <Line
                        data={{
                            labels: [35, 35.2, 35.3, 35.4, 36, 36.2, 36.3, 36.5],
                            datasets: [
                                {
                                    label: 'Temperature',
                                    data: [35, 35.2, 35.3, 35.4, 36, 36.2, 36.3, 36.5],
                                    backgroundColor: [
                                        'rgba(0, 0, 0, 0)',
                                        // 'rgba(255, 99, 132, 0.2)',
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
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(153, 102, 255, 1)',
                                        // 'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Temperature_high',
                                    data: [37.2, 37.2, 37.2, 37.2, 37.2, 37.2, 37.2, 37.2,],
                                    backgroundColor: [
                                        'rgba(0, 0, 0, 0)',
                                        // 'rgba(255, 99, 132, 0.2)',
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
                                        // 'rgba(255, 99, 132, 1)',
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
                                {
                                    label: 'Temperature_low',
                                    data: [36.1, 36.1, 36.1, 36.1, 36.1, 36.1, 36.1, 36.1],
                                    backgroundColor: [
                                        'rgba(0, 0, 0, 0)',
                                        // 'rgba(255, 99, 132, 0.2)',
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
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                // {
                                //     label: 'Quantity',
                                //     data: [47, 52, 67, 58, 9, 50],
                                //     backgroundColor: 'orange',
                                //     borderColor: 'red',
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
                                            beginAtZero: false,
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
                    <Line
                        data={{
                            labels: [75, 76, 78, 77, 78, 80, 83, 86],
                            datasets: [
                                {
                                    label: 'Pulse',
                                    data: [75, 76, 78, 77, 78, 80, 83, 86],
                                    backgroundColor: [
                                        'rgba(0, 0, 0, 0)',
                                        // 'rgba(255, 99, 132, 0.2)',
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
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(255, 99, 132, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(54, 162, 235, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        // 'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(153, 102, 255, 1)',
                                        // 'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Pulse_high',
                                    data: [100, 100, 100, 100, 100, 100, 100, 100],
                                    backgroundColor: [
                                        'rgba(0, 0, 0, 0)',
                                        // 'rgba(255, 99, 132, 0.2)',
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
                                        // 'rgba(255, 99, 132, 1)',
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
                                {
                                    label: 'Pulse_low',
                                    data: [60, 60, 60, 60, 60, 60, 60, 60],
                                    backgroundColor: [
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(255, 99, 132, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(54, 162, 235, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(255, 206, 86, 0.2)',
                                        // 'rgba(75, 192, 192, 0.2)',
                                        'rgba(0, 0, 0, 0)',
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
                                        // 'rgba(75, 192, 192, 1)',
                                        // 'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
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
                                            beginAtZero: false,
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

export default LineChart