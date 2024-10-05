import React from "react";
import Img from "../assets/pitech-3bJXBKAn.jpg"
import Logo from "../assets/3GP_LOGO.png"

const Footer = () => {
  return (
    <footer className="px-16 bg-white border-t border-gray-300">
      {/* Additional Footer Content */}
      <div className="justify-between pt-8 mt-12 border-t border-gray-300 md:flex md:">
        <div className="flex flex-col items-start mb-8 sm:flex sm:flex-row sm:justify-between">
          <div className="flex flex-col h-full space-y-8 justify-between">
            <div className="flex w-full border-b pb-8 border-gray-300">
              <img
                src={Logo}
                alt="Logo"
                className="hidden w-16 mr-2 sm:block"
              />
              <div className="">
                <h5 className="flex flex-col text-xl text-center font-pacifico sm:text-start text-text">GPOCR</h5>
                <div className="max-w-md">Công cụ chuyển ảnh thành văn bản cho chữ in và chữ viết tay Anh - Việt có độ chính xác cao.</div>
              </div>
            </div>
            <div className="text-gray-600 flex pb-8">
              <div className="items-center hidden ml-3 space-y-3 sm:flex sm:flex-col w-14">
                <a
                  href="#"
                  className="text-gray-500 transition-colors duration-300 hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775a4.92 4.92 0 0 0 2.165-2.724 9.84 9.84 0 0 1-3.127 1.194 4.916 4.916 0 0 0-8.379 4.482 13.94 13.94 0 0 1-10.125-5.138 4.916 4.916 0 0 0 1.523 6.564 4.902 4.902 0 0 1-2.229-.616v.06a4.917 4.917 0 0 0 3.946 4.817 4.931 4.931 0 0 1-2.224.084 4.918 4.918 0 0 0 4.59 3.415A9.863 9.863 0 0 1 1.64 21.31a13.905 13.905 0 0 0 7.548 2.213c9.058 0 14.007-7.504 14.007-14.006 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 transition-colors duration-300 hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.675 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h21.348C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0zM7.21 20.452H3.797V9h3.413v11.452zM5.504 7.454C4.336 7.454 3.393 6.51 3.393 5.343c0-1.167.943-2.111 2.111-2.111 1.168 0 2.112.944 2.112 2.111 0 1.167-.944 2.111-2.112 2.111zm14.949 13H17.04v-5.775c0-1.378-.027-3.152-1.92-3.152-1.922 0-2.217 1.5-2.217 3.047v5.88H9.491V9h3.281v1.561h.045c.456-.865 1.571-1.778 3.233-1.778 3.455 0 4.095 2.277 4.095 5.242v6.427z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/OCRServiceCMC"
                  className="text-gray-500 transition-colors duration-300 hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.628-5.373-12-12-12S0 5.445 0 12.073c0 5.303 3.438 9.73 8.063 11.263.589.108.803-.255.803-.568v-2.015c-3.262.708-3.943-1.578-3.943-1.578-.537-1.362-1.312-1.724-1.312-1.724-1.072-.732.08-.718.08-.718 1.185.082 1.807 1.235 1.807 1.235 1.055 1.822 2.77 1.295 3.448.993.106-.773.413-1.294.752-1.591-2.606-.297-5.344-1.303-5.344-5.798 0-1.281.459-2.327 1.214-3.147-.122-.296-.527-1.496.114-3.119 0 0 .987-.314 3.231 1.202.938-.261 1.946-.393 2.946-.398 1.001.005 2.009.137 2.948.398 2.242-1.516 3.227-1.202 3.227-1.202.643 1.623.238 2.823.116 3.119.758.82 1.213 1.866 1.213 3.147 0 4.506-2.742 5.497-5.356 5.785.426.368.805 1.092.805 2.202v3.266c0 .317.211.683.805.568C20.565 21.804 24 17.377 24 12.073z" />
                  </svg>
                </a>
              </div>
              <div className="space-y-1"> 
                <div className="font-extrabold">Hỗ trợ kỹ thuật:</div>
                <ul className="">
                  <li className="flex ">
                    <div className="mr-2 hidden sm:block font-medium">Tô Quang Đức: </div> toquangduc2004@gmail.com
                  </li>
                  <li className="flex ">
                    <div className="mr-2 hidden sm:block font-medium">Nguyễn Đình An: </div> yunomix2834@gmail.com
                  </li>
                  <li className="flex ">
                    <div className="mr-2 hidden sm:block font-medium">Mobile:</div>
                    <p className="flex"> 0346567085 - 0942316498</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full">
          {/* need to add content */}
          <div className="space-y-3">
            <h1 className="font-extrabold">Thông tin liên hệ</h1>
            <p>Địa chỉ: Pitech lab 24 Hoàng Quốc Việt, nhà số 25 (Tòa nhà RECON), phòng 502.</p>
            <p>Trung tâm đào tạo lập trình viên và kỹ sư AI thực chiến đỉnh cao.</p>
            <p>Email: imt.pitech@gmail.com</p>
            <p>Điện thoại: 0904140022</p>
            <img src={Img} alt="info-pitech" className="max-w-64" />
          </div>
        </div>
      </div>

      {/* Bottom Footer Content */}
      <div className="pt-8 mt-8 text-sm text-center text-gray-500 border-t border-gray-300">
        {/* <div className="flex flex-col mb-4 md:flex md:flex-row md:justify-center md:space-x-8">
          <a
            href="#"
            className="transition-colors duration-300 hover:text-primary"
          >
            Thông báo về quyền riêng tư
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-primary"
          >
            Điều khoản & Điều kiện
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-primary"
          >
            Thông tin xuất bản
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-primary"
          >
            Liên hệ với chúng tôi
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-primary"
          >
            Tiếng Việt
          </a>
        </div> */}
        <div className="flex justify-center space-x-8">
          <a
            href="/login"
            className="mb-6 transition-colors duration-300 hover:text-primary"
          >
            GPOCR ©2024.
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;