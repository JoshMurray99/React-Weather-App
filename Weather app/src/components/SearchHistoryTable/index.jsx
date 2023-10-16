import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function SearchHistoryTable({ searchHistoryData }) {
    
  return (
    <TableContainer sx={{width: 675, mt: 5}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Current Temp °C</TableCell>
            <TableCell>Temp Min °C</TableCell>
            <TableCell>Temp Max °C</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchHistoryData.map((search, index) => (
            <TableRow key={index}>
              <TableCell>{search.location}</TableCell>
              <TableCell>{search.timestamp.toLocaleString()}</TableCell>
              <TableCell>{Math.round(search.currentTemp)}</TableCell>
              <TableCell>{Math.round(search.tempMin)}</TableCell>
              <TableCell>{Math.round(search.tempMax)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
