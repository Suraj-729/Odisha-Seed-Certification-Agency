import React from 'react';

const SeedDetailsTable = ({ data }) => {
  return (
    <div className='panel'>
      <h1>Seed Details</h1>
      <table>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeedDetailsTable;
