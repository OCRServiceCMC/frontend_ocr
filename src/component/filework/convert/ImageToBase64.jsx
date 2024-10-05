import React, { useState } from 'react';
import { LuUploadCloud } from "react-icons/lu";

const FileConverter = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [base64String, setBase64String] = useState('');
    const [convertedText, setConvertedText] = useState('');
    const [pdfGenerated, setPdfGenerated] = useState(false);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState(null);
    const [loadingPDF, setLoadingPDF] = useState(false);
    const [loadingText, setLoadingText] = useState(false);
    const [loadingSavePDF, setLoadingSavePDF] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [isCopiedText, setIsCopiedText] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    // Hàm xử lý khi người dùng tải lên hình ảnh
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedImage(file);
        setError(null);
        setPdfGenerated(false);
        setPdfUrl('');
        setConvertedText('');
        setPdfFile(null);

        // Lấy tên file không có phần mở rộng
        const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        setFileName(nameWithoutExtension);

        // Tạo URL xem trước cho hình ảnh và chuyển đổi sang Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
            const base64Data = reader.result.split(',')[1];
            setBase64String(base64Data);
        };
        reader.readAsDataURL(file);
    };
    

    // Hàm định dạng văn bản nhận được từ OCR
    const formatResponseText = (rawText) => {
        let formattedText = rawText;

        // Loại bỏ chuỗi văn bản đầu "{'hw': [], 'doc': '"
        const prefix = "{'hw': [], 'doc': '";
        const suffix = "'}";
        if (formattedText.startsWith(prefix) && formattedText.endsWith(suffix)) {
            formattedText = formattedText.substring(prefix.length, formattedText.length - suffix.length);
        }

        // Thay thế các ký tự đặc biệt nếu cần thiết
        formattedText = formattedText.replace(/\\n/g, '\n').replace(/\\t/g, ' - ');
        formattedText = formattedText.replace(/\s\s+/g, ' ');
        return formattedText;
    };

    // Hàm chuyển đổi Base64 sang văn bản bằng OCR
    const convertBase64ToText = async () => {
        if (!base64String) {
            setError("Không có chuỗi Base64 để chuyển đổi.");
            return;
        }

        const token = sessionStorage.getItem("authToken");
        if (!token) {
            setError("Người dùng chưa được xác thực.");
            return;
        }

        const requestBody = {
            contentBase64: base64String
        };

        try {
            setLoadingText(true);
            const response = await fetch('http://103.145.63.232:8081/api/ocr/convertBase64ToText', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();

                if (!data.data || !data.data.json_ocr_out || data.data.json_ocr_out.trim() === "") {
                    throw new Error(data.data.info_text || "Không thể nhận dạng văn bản từ hình ảnh.");
                }

                const formattedText = formatResponseText(data.data.json_ocr_out);
                setConvertedText(formattedText);
                setError(null);
            } else {
                throw new Error("Chuyển đổi Base64 sang văn bản thất bại.");
            }
        } catch (err) {
            setError(err.message);
            setConvertedText('');
        } finally {
            setLoadingText(false);
        }
    };

    // Hàm sao chép văn bản đã chuyển đổi
    const handleCopyText = () => {
        navigator.clipboard.writeText(convertedText).then(() => {
            setIsCopiedText(true);
            setTimeout(() => setIsCopiedText(false), 2000);
        }).catch(err => {
            alert("Sao chép văn bản thất bại: ", err);
        });
    };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-5 bg-gray-100">
            <h1 className="flex mb-6 text-3xl font-bold text-center md:text-4xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-3 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                OCR Hình Ảnh Sang Văn Bản
            </h1>

            <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row md:space-x-6">
                    {/* Left Column: Image Upload and Preview */}
                    <div className="flex-1">
                        {/* Upload Image */}
                        <div className="mb-6">
                            <label className="flex items-center pb-2 text-lg font-medium text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-2"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                                Chọn ảnh để chuyển đổi:
                            </label>
                            <div className="relative w-full mt-1">
                                {/* Input gốc được ẩn */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                
                                {/* Giao diện tùy chỉnh */}
                                <div className="flex items-center px-4 py-2 bg-white border rounded-lg shadow cursor-pointer hover:bg-gray-50">
                                    <img
                                        alt="File Icon"
                                        className="w-8 h-8 mr-2"
                                        src="https://img.icons8.com/dusk/64/000000/file.png"
                                    />
                                    <span className="text-gray-500 text-xl">Chọn file ảnh...</span>
                                </div>
                            </div>
                        </div>

                        {/* Display Image Preview */}
                        {imagePreviewUrl && (
                            <div className="flex justify-center mb-6">
                                <img
                                    src={imagePreviewUrl}
                                    alt="Preview"
                                    className="w-1/2 h-auto max-w-md rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        {/* Buttons */}
                        {base64String && (
                            <div className="flex flex-col items-center justify-center mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                                {/* Convert to Text Button */}
                                <button
                                    onClick={convertBase64ToText}
                                    disabled={loadingText}
                                    className="flex items-center justify-center w-full px-4 py-2 text-white transition-all duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-700 md:w-auto"
                                >
                                    {loadingText ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5h-9A1.5 1.5 0 0 0 6 6v12a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 18V6a1.5 1.5 0 0 0-1.5-1.5zM9 9h6M9 12h6M9 15h3" />
                                        </svg>
                                    }
                                    {loadingText ? "Đang nhận dạng..." : "Chuyển ảnh sang Văn bản"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Converted Text */}
                    {convertedText && (
                        <div className="flex-1 mt-8 md:mt-0">
                            <label className="flex items-center mt-10 justify-between mb-2 font-medium text-gray-700">
                                <span className="flex text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                    </svg>
                                    Văn bản nhận dạng:
                                </span>
                                <button
                                    onClick={handleCopyText}
                                    className={`flex items-center px-4 py-2 text-white transition-all duration-300 rounded-lg ${isCopiedText ? 'bg-green-500' : 'bg-yellow-500'} hover:bg-yellow-700`}
                                >
                                    {isCopiedText ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                        </svg>
                                    }
                                    {isCopiedText ? "Đã sao chép!" : "Sao chép"}
                                </button>
                            </label>
                            <textarea
                                value={convertedText}
                                readOnly
                                rows={15}
                                className="w-full p-4 overflow-auto bg-gray-100 border border-gray-300 rounded-lg"
                            />
                        </div>
                    )}
                </div>

                {/* Display Error */}
                {error && (
                    <div className="p-4 mt-4 text-red-800 bg-red-100 border border-red-400 rounded-lg">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileConverter;
