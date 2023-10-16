import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

import { useState, useEffect } from 'react';

export default function SearchHistoryTable({ searchHistoryData }) {
  const [groupedData, setGroupedData] = useState([])

  useEffect(() => {
    function groupSearchHistoryData() {
      const grouped = searchHistoryData.reduce((acc, obj) => {
        const location = obj.location;
        if (!acc[location]) {
          acc[location] = [];
        }
        acc[location].push(obj);
        return acc;
      }, {});
      const groupedArray = Object.keys(grouped).map((key) => ({ [key]: grouped[key] }));

      setGroupedData(groupedArray)
    }
    groupSearchHistoryData();
  }, [searchHistoryData]);
    
  return (
    <Box sx={{ mt: 4}}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant='h6'>
            Search History By Location
            </Typography>
            </TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {groupedData.map((group, index) => {
          const location = Object.keys(group)[0];
          const entries = group[location];

          return (
            <TableRow key={index}>
              
              <TableCell>
                <Accordion>
                  <AccordionSummary>
                  <Typography sx={{ fontSize: 18 }}>
                  <ArrowDownward/> {location} 
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Current Temp (°C)</TableCell>
                          <TableCell>Temp Min (°C)</TableCell>
                          <TableCell>Temp Max (°C)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {entries.map((entry, entryIndex) => (
                          <TableRow key={entryIndex}>
                            <TableCell>{entry.timestamp.toLocaleString()}</TableCell>
                            <TableCell>{Math.round(entry.currentTemp)}</TableCell>
                            <TableCell>{Math.round(entry.tempMin)}</TableCell>
                            <TableCell>{Math.round(entry.tempMax)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    </Box>
  );
}
