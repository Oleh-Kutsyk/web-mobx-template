import React from 'react';

const wrapperStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const, // fix issue https://github.com/cssinjs/jss/issues/1344
  justifyContent: 'center',
  alignItems: 'center',
};
const titleStyle = { marginTop: '0' };
const descriptionStyle = { marginBottom: '0' };

export const AccessDenied: React.FC = () => {
  return (
    <div style={wrapperStyle}>
      <h1 style={titleStyle}>Access Denied :(</h1>
      <h3 style={descriptionStyle}>Please check your link or permissions</h3>
    </div>
  );
};
