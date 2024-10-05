import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUploadMerge = () => {
    const [message, setMessage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileList, setFileList] = useState([]);
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

    const handleMergeFiles = async () => {
        if (selectedFiles.length === 0) {
            setMessage('Please select files to merge.');
            return;
        }

        const fileNames = selectedFiles.map(file => file.fileName).join(', ');
        const outputFileName = 'MergedPDF.pdf';
        const token = sessionStorage.getItem("authToken");

        try {
            // Merge files
            const response = await axios.post(
                `http://103.145.63.232:8081/api/pdf/merge?fileNames=${encodeURIComponent(fileNames)}&outputFileName=${encodeURIComponent(outputFileName)}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setMessage('Files merged successfully!');
                setTimeout(() => {
                    navigate('/storage');
                }, 2000);
            }
        } catch (error) {
            console.error('Error during file merging:', error);
            setMessage(`There was an error during the file merging process: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen m-auto rounded-lg shadow-lg bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            <p className="text-center text-xl font-semibold">Select files to merge</p>
            <p className="mt-4 text-center">Select <strong>PDF</strong> files to merge</p>

            <select
                multiple
                onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                    const files = selectedOptions.map(selectedFileName =>
                        fileList.find(f => f.fileName === selectedFileName)
                    );
                    setSelectedFiles(files);
                    setMessage(`Selected files: ${files.map(file => file.fileName).join(', ')}`);
                }}
                className="mt-4 px-4 py-2 border rounded bg-white text-gray-700 focus:outline-none focus:border-blue-500 hover:bg-gray-100"
            >
                {fileList.map(file => (
                    <option key={file.fileID} value={file.fileName}>
                        {file.fileName}
                    </option>
                ))}
            </select>

            {message && (
                <div className="mt-4 text-center text-green-600 font-semibold">
                    {message}
                </div>
            )}
            <button
                onClick={handleMergeFiles}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Merge Files
            </button>
            <div className="mt-2 text-sm text-center">
                Supported formats:
                <span className="inline-block bg-red-500 text-white px-2 py-1 rounded ml-1 transition duration-300 hover:bg-red-600">PDF</span>
            </div>
        </div>
    );
};

export default FileUploadMerge;
