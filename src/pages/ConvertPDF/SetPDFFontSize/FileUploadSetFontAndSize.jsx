import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUploadSetFontAndSize = () => {
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileList, setFileList] = useState([]); // Store the list of files
    const [text, setText] = useState('');
    const [fontName, setFontName] = useState('TIMES_ROMAN');
    const [x, setX] = useState(100);
    const [y, setY] = useState(700);
    const [fontSize, setFontSize] = useState(300);
    const navigate = useNavigate();

    // Fetch the file list from the API
    useEffect(() => {
        const fetchFileList = async () => {
            const token = sessionStorage.getItem("authToken");
            try {
                const response = await axios.get('http://103.145.63.232:8081/api/auth/user/files/list', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Filter to include only PDF files
                const pdfFiles = response.data.filter(file => file.fileName.toLowerCase().endsWith('.pdf'));
                setFileList(pdfFiles);
            } catch (error) {
                console.error('Error fetching file list:', error);
                setMessage('Unable to fetch file list.');
            }
        };

        fetchFileList();
    }, []);

    const handleSetFontSize = async () => {
        if (!selectedFile) {
            setMessage('Please select a file first.');
            return;
        }

        const fileName = selectedFile.fileName || selectedFile.name; // Handle file from select box
        const token = sessionStorage.getItem("authToken");

        try {
            // Set font size for the PDF
            const response = await axios.post(
                `http://103.145.63.232:8081/api/pdf/setFontAndSize?fileName=${encodeURIComponent(fileName)}&text=${encodeURIComponent(text)}&fontName=${encodeURIComponent(fontName)}&x=${x}&y=${y}&fontSize=${fontSize}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setMessage('Font and size set successfully in PDF!');
                setTimeout(() => {
                    navigate('/storage');
                }, 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            console.error('Error during setting font and size in PDF:', error);
            setMessage(`There was an error setting the font size in the PDF: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen m-auto rounded-lg shadow-lg bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            <p className="text-center text-xl font-semibold">Select a file to set font and size</p>
            <p className="mt-4 text-center">Select a <strong>PDF</strong> file to set font and size</p>

            <select
                onChange={(e) => {
                    const selectedFileName = e.target.value;
                    const file = fileList.find(f => f.fileName === selectedFileName);
                    setSelectedFile(file);
                    setMessage(`Selected file: ${file.fileName}`);
                }}
                className="mt-4 px-4 py-2 border rounded bg-white text-gray-700 focus:outline-none focus:border-blue-500 hover:bg-gray-100"
            >
                <option value="">-- Select a file --</option>
                {fileList.map(file => (
                    <option key={file.fileID} value={file.fileName}>
                        {file.fileName}
                    </option>
                ))}
            </select>

            <div className="mt-4 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Text to Add"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="mb-2 px-2 py-1 border rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Font Name"
                    value={fontName}
                    onChange={(e) => setFontName(e.target.value)}
                    className="mb-2 px-2 py-1 border rounded w-full"
                />
                <input
                    type="number"
                    placeholder="X Coordinate"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    className="mb-2 px-2 py-1 border rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Y Coordinate"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    className="mb-2 px-2 py-1 border rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Font Size"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="mb-2 px-2 py-1 border rounded w-full"
                />
            </div>
            {message && (
                <div className="mt-4 text-center text-green-600 font-semibold">
                    {message}
                </div>
            )}
            <button
                onClick={handleSetFontSize}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Set Font Size
            </button>
            <div className="mt-2 text-sm text-center">
                Supported formats:
                <span className="inline-block bg-red-500 text-white px-2 py-1 rounded ml-1 transition duration-300 hover:bg-red-600">PDF</span>
            </div>
        </div>
    );
};

export default FileUploadSetFontAndSize;
