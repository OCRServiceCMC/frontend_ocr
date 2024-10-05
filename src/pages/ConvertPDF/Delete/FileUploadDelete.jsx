import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUploadDelete = () => {
    const [startPage, setStartPage] = useState('');
    const [endPage, setEndPage] = useState('');
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileList, setFileList] = useState([]); // Lưu trữ danh sách file
    const navigate = useNavigate();

    // Fetch file list từ API
    useEffect(() => {
        const fetchFileList = async () => {
            const token = sessionStorage.getItem("authToken");
            try {
                const response = await axios.get('http://103.145.63.232:8081/api/auth/user/files/list', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Lọc các file có đuôi .pdf
                const pdfFiles = response.data.filter(file => file.fileName.toLowerCase().endsWith('.pdf'));
                setFileList(pdfFiles);
            } catch (error) {
                console.error('Error fetching file list:', error);
                setMessage('Unable to fetch file list.');
            }
        };

        fetchFileList();
    }, []);

    const handleDeletePages = async () => {
        const token = sessionStorage.getItem("authToken");

        if (selectedFile) {
            // Thực hiện xóa trang từ file đã chọn từ select box
            const fileName = selectedFile.fileName || selectedFile.name; // Check both scenarios
            if (startPage && endPage) {
                try {
                    const response = await axios.post(
                        `http://103.145.63.232:8081/api/pdf/deletePagesByRange?fileName=${encodeURIComponent(fileName)}&startPage=${startPage}&endPage=${endPage}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.status === 200) {
                        setMessage('Pages deleted successfully!');
                        setTimeout(() => {
                            navigate('/storage');
                        }, 2000); // Redirect after 2 seconds
                    }
                } catch (error) {
                    console.error('Error during page deletion:', error);
                    setMessage('There was an error during the page deletion process.');
                }
            } else {
                setMessage('Please specify both start page and end page.');
            }
        } else {
            setMessage('Please select a file first.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen m-auto rounded-lg shadow-lg bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            <p className="text-center text-xl font-semibold">Select a file to delete pages</p>
            <p className="mt-4 text-center">Select a <strong>PDF</strong> file to delete pages</p>

            <select
                onChange={(e) => {
                    const selectedFileName = e.target.value;
                    const file = fileList.find(f => f.fileName === selectedFileName);
                    setSelectedFile(file);
                }}
                className="mt-4 px-4 py-2 border rounded"
            >
                <option value="">-- Select a file --</option>
                {fileList.map(file => (
                    <option key={file.fileID} value={file.fileName}>
                        {file.fileName}
                    </option>
                ))}
            </select>

            <div className="mt-4">
                <input
                    type="number"
                    placeholder="Start Page"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    className="mr-2 px-2 py-1 border rounded"
                />
                <input
                    type="number"
                    placeholder="End Page"
                    value={endPage}
                    onChange={(e) => setEndPage(e.target.value)}
                    className="px-2 py-1 border rounded"
                />
            </div>
            {message && (
                <div className="mt-4 text-center text-green-600 font-semibold">
                    {message}
                </div>
            )}
            <button
                onClick={handleDeletePages}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Delete Pages
            </button>
            <div className="mt-2 text-sm text-center">
                Supported formats:
                <span className="inline-block bg-red-500 text-white px-2 py-1 rounded ml-1 transition duration-300 hover:bg-red-600">PDF</span>
            </div>
        </div>
    );
};

export default FileUploadDelete;
