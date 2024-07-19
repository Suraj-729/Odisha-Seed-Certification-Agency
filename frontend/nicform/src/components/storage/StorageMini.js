import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
// import style from 'StorageMini.module.css';

const SignatureCapture = () => {
  const sigCanvas = useRef({});
  const [message, setMessage] = useState('');

  const clear = () => sigCanvas.current.clear();

  const save = async () => {
    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    const blob = await fetch(signature).then(res => res.blob());

    const formData = new FormData();
    formData.append('signature', blob, 'signature.png');

    try {
      const response = await axios.post('http://localhost:8000/upload-signature', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Signature uploaded successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Error uploading signature');
      console.error(error);
    }
  };

  return (
    <div>
      <SignatureCanvas
        
        ref={sigCanvas}
        canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save</button>
      <p>{message}</p>
    </div>
  );
};

export default SignatureCapture;
