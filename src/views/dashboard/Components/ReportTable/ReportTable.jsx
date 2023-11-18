/* eslint-disable react/prop-types */
// import React, { useState, useEffect } from "react";
// import { Table } from "antd";
// import { getSensorsDataHCCAP } from "services/sensor";
// import "./ReportTable.css";

// const ReportTable = ({ date, day }) => {
//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };
//   const [loading, setLoading] = useState(false);
//   const [hccpColumns, setHccpColumns] = useState([]);
//   const [hccpData, setHccpData] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     console.log(date, day);
//     getSensorsDataHCCAP({ date, day })
//       .then((res) => {
//         console.log("res", res);
//         setLoading(false);
//         setHccpData(res.data);
//       })
//       .catch((err) => {
//         setLoading(false);
//       });
//   }, [date, day]);

//   const uniqueDates = [
//     ...new Set(
//       hccpData.flatMap((sensor) => sensor.dates.map((date) => date.date))
//     ),
//   ];
//   const uniqueIntervals = [
//     ...new Set(
//       hccpData.flatMap((sensor) =>
//         sensor.dates.flatMap((date) =>
//           date.intervals.map((interval) => interval.interval)
//         )
//       )
//     ),
//   ];
//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>Sensor Name</th>
//             {uniqueDates.map((date) => (
//               <th key={date} colSpan={uniqueIntervals.length}>
//                 {date}
//               </th>
//             ))}
//           </tr>
//           <tr>
//             <th></th>
//             {uniqueDates.map((date) =>
//               uniqueIntervals.map((interval) => (
//                 <th key={`${date}-${interval}`}>{interval}</th>
//               ))
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {hccpData.map((sensor) => (
//             <tr key={sensor.name}>
//               <td>{sensor.name}</td>
//               {uniqueDates.map((date) =>
//                 uniqueIntervals.map((interval) => (
//                   <td key={`${date}-${interval}`}>
//                     {sensor.dates
//                       .find((item) => item.date === date)
//                       ?.intervals.find((item) => item.interval === interval)
//                       ?.value || 0}
//                   </td>
//                 ))
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </>
//   );
// };

// export default ReportTable;

import React from 'react'
import './ReportTable.css'
import { useGlobalInfo } from 'src/global-context/GlobalContext'

const ReportTable = ({ date, day }) => {
  // Dummy data for sensors
  const dummyData = [
    {
      name: 'Heater 1',
      dates: [
        {
          date: '2023-01-01',
          intervals: [
            { interval: '1:00', value: 25 },
            { interval: '2:00', value: 30 },
            { interval: '3:00', value: 25 },
            { interval: '4:00', value: 30 },
            { interval: '5:00', value: 25 },
            { interval: '6:00', value: 30 },
            // Add more intervals as needed
          ],
        },
        // Add more dates as needed
      ],
    },
    {
      name: 'temp 1 ',
      dates: [
        {
          date: '2023-01-01',
          intervals: [
            { interval: '1:00', value: 20 },
            { interval: '2:00', value: 22 },
            { interval: '3:00', value: 20 },
            { interval: '4:00', value: 22 },
            { interval: '5:00', value: 20 },
            { interval: '6:00', value: 22 },
          ],
        },
      ],
    },
    {
      name: 'Heating 1',
      dates: [
        {
          date: '2023-01-01',
          intervals: [
            { interval: '1:00', value: 20 },
            { interval: '2:00', value: 35 },
            { interval: '3:00', value: 20 },
            { interval: '4:00', value: 35 },
            { interval: '5:00', value: 20 },
            { interval: '6:00', value: 35 },
          ],
        },
      ],
    },
  ]

  // Extract unique dates and intervals from the dummy data
  const uniqueDates = [
    ...new Set(dummyData.flatMap((sensor) => sensor.dates.map((date) => date.date))),
  ]
  const uniqueIntervals = [
    ...new Set(
      dummyData.flatMap((sensor) =>
        sensor.dates.flatMap((date) => date.intervals.map((interval) => interval.interval)),
      ),
    ),
  ]
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <>
      <table className="w-100 hccp_report_table">
        <thead>
          <tr>
            <th className={`${darkMode ? 'table-data-dark' : 'table-data-light'}`}>Sensor Name</th>
            {uniqueDates.map((date) => (
              <th
                key={date}
                colSpan={uniqueIntervals.length}
                className={` ${darkMode ? 'table-data-dark' : 'table-data-light'}`}
              >
                {date}
              </th>
            ))}
          </tr>
          <tr className={`${darkMode ? 'table-data-dark' : 'table-data-light'}`}>
            <th></th>
            {uniqueDates.map((date) =>
              uniqueIntervals.map((interval) => <th key={`${date}-${interval}`}>{interval}</th>),
            )}
          </tr>
        </thead>
        <tbody>
          {dummyData.map((sensor) => (
            <tr key={sensor.name}>
              <td className={`p-5 ${darkMode ? 'table_container_dark' : 'table_container_light'}`}>
                {sensor.name}
              </td>
              {uniqueDates.map((date) =>
                uniqueIntervals.map((interval) => (
                  <td
                    key={`${date}-${interval}`}
                    style={{
                      backgroundColor:
                        sensor.dates
                          .find((item) => item.date === date)
                          ?.intervals.find((item) => item.interval === interval)?.value > 25
                          ? '#FF0000'
                          : sensor.dates
                              .find((item) => item.date === date)
                              ?.intervals.find((item) => item.interval === interval)?.value === 25
                          ? '#90EE90'
                          : '#90EE90',
                    }}
                  >
                    {sensor.dates
                      .find((item) => item.date === date)
                      ?.intervals.find((item) => item.interval === interval)?.value || 0}
                  </td>
                )),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ReportTable
