import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUrl } from '../features/qrSlice';
import QrScanner from 'react-qr-scanner';

const QRScannerComponent = () => {
  const [scanning, setScanning] = useState(false);
  const [permissionError, setPermissionError] = useState(null);
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.qr.urls);

  const handleScan = (data) => {
    if (data) {
      dispatch(saveUrl(data.text));
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);
    if (err.name === 'NotAllowedError') {
      setPermissionError('Camera access was denied. Please enable it in your browser settings.');
      setScanning(false);
    }
  };

  const startScanning = () => {
    setPermissionError(null);
    setScanning(true);
  };

  return (
    <div className="p-4 text-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={startScanning}
      >
        Open Camera to Scan QR Code
      </button>

      {permissionError && (
        <div className="mt-2 text-red-600 font-medium">{permissionError}</div>
      )}

      {scanning && (
        <div className="mt-4">
          <QrScanner
            delay={300}
            style={{ width: '100%' }}
            onScan={handleScan}
            onError={handleError}
            constraints={{
              video: {
                facingMode: navigator.userAgent.includes('Mobile') ? { exact: 'environment' } : 'user',
              },
            }}
          />
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-bold">Scanned URLs:</h2>
        <ul>
          {urls.map((url, index) => (
            <li key={index} className="text-blue-600 underline">{url}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QRScannerComponent;
