import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPenSquare,
  faPlus,
  faTrash,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { type } from "os";

type SubjectInfoProps = {
  ma: number;
  ten: string;
  ngaybd: string;
  ngaykt: string;
  soluong: number;
  onDelete?: () => void;
  onUpdate?: () => void;
  getSV?: () => void;
  addStudent?: () => void;
};

function SubjectInfo(subject: SubjectInfoProps) {
  return (
    <tr onClick={subject.getSV}>
      <td>{subject.ma}</td>
      <td >{subject.ten}</td>
      <td>{subject.ngaybd.toString()}</td>
      <td>{subject.ngaykt.toString()}</td>
      <td>{subject.soluong}</td>
      <td>
        <button
          type="submit"
          onClick={subject.onDelete}
          className="btn btn-seconnary"
          style={{ marginRight: 5 }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button onClick={subject.onUpdate} className="btn btn-seconnary">
          <FontAwesomeIcon icon={faPenSquare} />
        </button>
        <button onClick={subject.addStudent} className="btn btn-seconnary">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </td>
    </tr>
  );
}

export default SubjectInfo;
