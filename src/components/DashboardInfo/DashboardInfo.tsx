
import "./dashboardInfo.scss";
import { withRouter } from 'react-router-dom';
import { CRow, CCol } from "@coreui/react";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";
function DashboardInfo(props: any) {

    return (
        <CRow>
            <CCol sm="6" lg="3">


                <CChartBar
                    type="bar"
                    className="mt-3 mx-3"
                    style={{ height: "70px" }}
                    data={{
                        labels: [
                            'january',
                            'february',
                            'march',
                            'april',
                            'may',
                            'june',
                            'july',
                            'august',
                            'september',
                            'october',
                            'november',
                            'december',
                            'january',
                            'february',
                            'march',
                            'april',
                        ],
                        datasets: [
                            {
                                label: 'my_first_dataset',
                                backgroundColor: "rgba(255,255,255,.2)",
                                borderColor: "rgba(255,255,255,.55)",
                                data: [
                                    78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
                                    67, 82,
                                ],
                                barPercentage: 0.6,
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                    drawTicks: false,
                                },
                                ticks: {
                                    display: false,
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                    drawBorder: false,
                                    drawTicks: false,
                                },
                                ticks: {
                                    display: false,
                                },
                            },
                        },
                    }}
                />
            </CCol>
            {/* <CCol sm="6" lg="3">
                <CWidgetProgressIcon
                    color="warning"
                    icon={<CIcon name="cil-people" height="30" />}
                    value="211"
                    title="appointments"
                    progressValue={75}
                    progressWhite
                    className="mb-4 card_filter"
                />
            </CCol> */}
            {/* <CCol sm="6" lg="3">
                <CWidgetProgressIcon
                    icon={<CIcon name="cil-chartPie" height="30" />}
                    value="28"
                    title="tasks"
                    progressValue={40}
                    color="danger"
                    progressWhite
                    className="mb-4 card_filter"
                />
            </CCol> */}

            <CCol sm="6" lg="3">

                <CChartLine
                    type="line"
                    className="mt-3 mx-3"
                    style={{ height: "70px" }}
                    data={{
                        labels: [
                            'january',
                            'february',
                            'march',
                            'april',
                            'may',
                            'june',
                            'july',
                        ],
                        datasets: [
                            {
                                label: 'my_first_dataset',
                                backgroundColor: "transparent",
                                borderColor: "rgba(255,255,255,.55)",
                                pointBackgroundColor: "red",
                                data: [1, 18, 9, 17, 34, 22, 11],
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                    drawBorder: false,
                                },
                                ticks: {
                                    display: false,
                                },
                            },
                            y: {
                                min: -9,
                                max: 39,
                                display: false,
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    display: false,
                                },
                            },
                        },
                        elements: {
                            line: {
                                borderWidth: 1,
                            },
                            point: {
                                radius: 4,
                                hitRadius: 10,
                                hoverRadius: 4,
                            },
                        },
                    }}
                />
            </CCol>
        </CRow>
    );
}

export default withRouter(DashboardInfo);
