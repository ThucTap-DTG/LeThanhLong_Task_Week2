import React, {
  Component,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  createContext,
  useRef
} from "react";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { error } from "console";
import { title } from "process";
import { useNavigate } from "react-router-dom";
import { Subject } from "../../type/Subject";
import { Student } from "../../type/Student";
import { Sinhvien_Monhoc } from "../../type/Sinhvien_Monhoc";
import SubjectInfo from "./SubjectInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form } from "react-bootstrap";
import ModalForm from "../Modals/ModalForm";
import CusPagination from "../Pagination/CusPagination";
import {
  ShowContext,
  ShowModalProvider,
  useShow,
} from "../../context/ShowModalContext";
import {
  PaginationContext,
  PaginationProvider,
  usePagination,
} from "../../context/PaginationContext";
import StudentInfo from "../student/StudentInfo";

const GetSubject: React.FC = () => {
  const [subject, setSubject] = useState<Subject[]>([]);
  const [student, setStudent] = useState<Student[]>([]);
  const [studentFilter, setStudentFilter] = useState<Student[]>([]);
  const [sinhvien_monhoc, setSinhVien_Monhoc] = useState<Sinhvien_Monhoc[]>([]);

  const [searchText, setSearchText] = useState("");

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  //const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [ten, setTen] = useState("");
  const [ngaybd, setNgaybd] = useState("");
  const [ngaykt, setNgaykt] = useState("");
  const [soluong, setSoluong] = useState(0);

  const [titleModal, setTitleModal] = useState("");

  //const [check, setCheck] = useState<Subject | null>(null);
  const [subjectID, setSubjectID] = useState<number>(1);
  const [studentID, setStudentID] = useState<number>(0);

  const SLSinhVien = useRef(0);


  const [color, setColor] = useState("");
  const [checkAddStudent, setCheckAddStudent] = useState(false);

  //const [studentInSubject, setStudentInSubject] = useState<Student[]>([]);

  //Sử dụng showContext
  const { show, setShow } = useShow();
  const { page, setPage, limit, setLimit, totalPage, setTotalPage } = usePagination();

  //Phân trang
  // const [page, setPage] = useState(1);
  // const limit = 3;
  // const [totalPage, setTotalPage] = useState(0);

  const [typeModal, setTypeModal] = useState<number>(0);

  useEffect(() => {
    getPageNumber();
  }, []);

  useEffect(() => {
    fetchSinhvien_Monhoc();
  }, [checkAddStudent]);

  useEffect(() => {
    fetchSubject(searchText);
    fetchStudent();
    fetchSinhvien_Monhoc();
  }, [searchText, page]);

  //Lấy số trang
  const getPageNumber = async () => {
    try {
      const response = await fetch(`http://localhost:3030/monhoc`);
      const lst = await response.json();
      const countRecord = lst.length;
      const temp = Math.ceil(Number(countRecord) / limit);
      setTotalPage(temp);
    } catch (error) {
      console.log(error);
    }
  };

  //Xóa
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3030/monhoc/${id}`);
      setSubject(subject.filter((post) => post.id !== id));
      alert("Data delete Successfully!");
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.log(error);
    }
  };

  //Cập nhật lại page khi phân trang
  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };

  const fetchStudent = async () => {
    const response = await fetch(`http://localhost:3030/students`);
    const data = await response.json();
    setStudent(data);
  };

  const fetchSinhvien_Monhoc = async () => {
    try {
      const response = await fetch("http://localhost:3030/monhoc_sinhvien");
      const data = await response.json();
      setSinhVien_Monhoc(data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  //===================================================================================
  const fetchSubject = async (searchText: string) => {
    if (searchText.trim() === "") {
      const response = await fetch(
        `http://localhost:3030/monhoc?_page=${page}&_limit=${limit}`
      );
      const data = await response.json();
      setSubject(data);
    } else {
      const filtered = subject.filter(
        (subject) =>
          subject.ngaybd.toLowerCase().includes(searchText.toLowerCase()) ||
          subject.ngaykt.toLowerCase().includes(searchText.toLowerCase()) ||
          subject.soluong.toString().includes(searchText.toLowerCase()) ||
          subject.ten.toLowerCase().includes(searchText.toLowerCase()) ||
          subject.id.toString().includes(searchText.toLowerCase())
      );
      setSubject(filtered);
    }
  };

  //Event khi search
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    fetchSubject(searchText);
  };

  //Show modals khi sửa
  const handleShow = (subject: Subject | null) => {
    setSelectedSubject(subject);
    setTitleModal("Update Subject");
    setTen(subject ? subject.ten : "");
    setNgaybd(subject ? subject.ngaybd : "");
    setNgaykt(subject ? subject.ngaykt : "");
    setSoluong(subject ? subject.soluong : 0);
    setTypeModal(2);
    setShow(true);
  };

  //Ẩn modals
  const handleClose = () => {
    setSelectedSubject(null);
    setId(0);
    setTen("");
    setNgaybd("");
    setNgaykt("");
    setSoluong(0);
    setShow(false);
  };
  const handleCreate = () => {
    setShow(true);
    setTitleModal("Create Subject");
    setTypeModal(2);
  }

  //Thêm hoặc sửa dữ liệu
  const handleSubmit = async () => {
    //event.preventDefault();
    try {
      let ngaybdtemp = ngaybd.toString();
      let ngaykttemp = ngaybd.toString();
      console.log(ten);
      if (selectedSubject !== null) {
        await axios.put(`http://localhost:3030/monhoc/${selectedSubject.id}`, {
          ten,
          ngaybd,
          ngaykt,
          soluong,
        });
      } else {
        // Create new subject
        await axios.post("http://localhost:3030/monhoc", {
          ten,
          ngaybd,
          ngaykt,
          soluong,
        });
      }
      fetchSubject(searchText);
      handleClose();
    } catch (error) {
      console.error("Error creating/updating subject:", error);
    }
  };

  const showDanhSachSinhVien = (subject: Subject) => {
    setSubjectID(subject.id);
    setTitleModal("Danh sách sinh viên");
    SLSinhVien.current = (subject.soluong);
    //console.log(SLSinhVien.current);
    setShow(true);
    setTypeModal(1);
    const IDStudentRegister = sinhvien_monhoc
      .filter((sub) => sub.monhoc_id === subjectID)
      .map((registration) => registration.sinhvien_id);

    const temp = student.filter((student) =>
    IDStudentRegister.every((id) => id !== student.id));
    setStudentFilter(temp);  
  }
  //Event số lượng
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const soluong = isNaN(value) ? 0 : value;
    setSoluong(soluong);
  };

  const handleSubjectClick = (subjectID: number) => {
    setSubjectID(subjectID);
  };
  const SelectStudent = (IDStudent: number) => {
      setStudentID(IDStudent);
      setColor("red");
  }
  const addStudent = async () => {
    const filteredRows = sinhvien_monhoc.filter(
      (item) => item.monhoc_id === subjectID
    );
    // console.log("ID mon hoc: " + subjectID)

    // console.log("So sinh vien theo mon hoc" + filteredRows.length);  
    if(filteredRows.length + 1 > SLSinhVien.current){
      alert("Số lượng sinh viên đã đủ");
      setShow(false);
    }
    else{
      const monhoc_id = subjectID;
      const sinhvien_id = studentID;
      //console.log(subjectID, studentID);
      await axios.post("http://localhost:3030/monhoc_sinhvien", {
        monhoc_id, sinhvien_id
      });
      setCheckAddStudent(true);
      //alert("Add students to the course successfully !");
      setShow(false);
    }
  }
  //====================================================================================
  return (
    <div
      className="table-container"
      style={{ marginTop: 10, borderRadius: 10 }}
    >
      <br />
      <div className="row">
        <div className="col-md-2">
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
          <ModalForm
            show={show}
            onHide={handleClose}
            title={titleModal}
            onSave={typeModal !== 1 ? handleSubmit : addStudent}
          >
            {typeModal !== 1 ?
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Subject name</Form.Label>
                <Form.Control
                  type="Text"
                  value={ten}
                  placeholder="Subject name"
                  autoFocus
                  onChange={(e) => setTen(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Start day</Form.Label>
                <Form.Control
                  type="date"
                  value={ngaybd}
                  placeholder="Start day"
                  onChange={(e) => setNgaybd(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>End day</Form.Label>
                <Form.Control
                  type="date"
                  value={ngaykt}
                  placeholder="End day"
                  onChange={(e) => setNgaykt(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="Text"
                  value={soluong}
                  placeholder="Quantity"
                  onChange={handleChangeQuantity}
                />
              </Form.Group>
            </Form> : 
                <table className='table'>
                <thead>
                  <tr>      
                    <th>MSSV</th>
                    <th>Họ và Tên</th>
                    <th>Đại chỉ</th>
                  </tr>
                </thead>  
                <tbody>
                  {studentFilter.map((temp) => (
                    //   <StudentInfo key={student.id} id = {student.id} name = {student.name} 
                    //   address = {student.address} 
                    //  /> 
                      <tr key={temp.id} onClick={() => SelectStudent(temp.id)}>
                        <td>{temp.id}</td>
                        <td>{temp.name}</td>
                        <td>{temp.address}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            }
          </ModalForm>
        </div>
        <div className="col-md-10">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchInputChange}
            placeholder="Search"
            className="form-control"
            style={{ width: 300 }}
          />{" "}
          <br />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <table className="table table-success table-striped table-subject">
            <thead>
              <tr>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Số lượng học viên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {subject.map((subject) => (
                <SubjectInfo
                  key={subject.id}
                  ma={subject.id}
                  ten={subject.ten}
                  ngaybd={subject.ngaybd}
                  ngaykt={subject.ngaykt}
                  soluong={subject.soluong}
                  onDelete={() => {
                    handleDelete(subject.id);
                  }}
                  onUpdate={() => {
                    handleShow(subject);
                  }}
                  getSV={() => {
                    handleSubjectClick(subject.id);
                  }}
                  addStudent={() => {
                    showDanhSachSinhVien(subject);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          {subjectID && (
            <div>
              <table className="table table-success table-striped table-student">
                <thead>
                  <tr>
                    <th>MSSV</th>
                    <th>Họ và Tên</th>
                    <th>Đại chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  {sinhvien_monhoc
                    .filter((sv_mh) => sv_mh.monhoc_id === subjectID)
                    .map((sv_mh) => {
                      const studentTemp = student.find(
                        (studentTemp) => studentTemp.id === sv_mh.sinhvien_id
                      );
                      if (studentTemp) {
                        return (
                          <tr>
                            <td>{studentTemp.id}</td>
                            <td>{studentTemp.name}</td>
                            <td>{studentTemp.address}</td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <CusPagination
        page={page}
        handlePageChange={handleSetPage}
        totalPage={totalPage}
      />
    </div>
  );
};

export default GetSubject;
