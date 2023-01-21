import React from "react";
import style from "../styles/fileitem.module.scss";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ImageIcon from "@mui/icons-material/Image";
import HtmlIcon from "@mui/icons-material/Html";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { FolderSpecial } from "@mui/icons-material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Image from "next/image";

const FileItem = ({ val }) => {
  return (
    <div className={style.fileItem}>
      <div className={style.fileItemWrapper}>
        {val.mimeType !== "application/vnd.google-apps.folder" && (
          <span
            className={style.download}
            onClick={() => {
              window.open(
                `https://drive.google.com/uc?export=download&id=${val.id}`
              );
            }}
          >
            <CloudDownloadIcon />
          </span>
        )}
        <span className={style.ext}>
          {val.mimeType === "video/x-matroska"
            ? "MKV"
            : val.mimeType === "application/pdf"
            ? "PDF"
            : val.mimeType === "image/png"
            ? "PNG"
            : val.mimeType === "text/html"
            ? "HTML"
            : val.mimeType === "video/mp4"
            ? "MP4"
            : val.mimeType === "application/x-rar"
            ? "RAR"
            : val.mimeType === "application/vnd.google-apps.folder"
            ? "DIR"
            : val.mimeType === "application/json"
            ? "JSON"
            : "OTHERS"}
        </span>
        <div className={style.fileLogo}>
          {val.mimeType === "video/x-matroska" ? (
            // <MovieCreationIcon className={style.middleIcon} />
            <Image src="/video.png" className={style.middleIcon} width={70} height={70} />
          ) : val.mimeType === "application/pdf" ? (
            <Image src="/pdf.png" className={style.middleIcon} width={70} height={70} />
          ) : val.mimeType === "image/png" ? (
            <ImageIcon className={style.middleIcon} />
          ) : val.mimeType === "text/html" ? (
            <HtmlIcon className={style.middleIcon} />
          ) : val.mimeType === "text/plain" ? (
            <Image src="/text.png" className={style.middleIcon} width={70} height={70} />
            // <HtmlIcon className={style.middleIcon} />
          ) : val.mimeType === "video/mp4" ? (
            // <MovieCreationIcon className={style.middleIcon} />
            <Image src="/video.png" className={style.middleIcon} width={70} height={70} />
          ) : val.mimeType === "application/x-rar" ? (
            <Image src="/zip.png" className={style.middleIcon} width={70} height={70} />
          ) : val.mimeType === "application/vnd.google-apps.folder" ? (
            // <FolderSpecial className={style.middleIcon} />
            <Image src="/folder.png" className={style.middleIcon} width={60} height={60} />
          ) : val.mimeType === "application/json" ? (
            <DataObjectIcon className={style.middleIcon} />
          ) : (
            <DeviceUnknownIcon className={style.middleIcon} />
          )}
        </div>
        <div className={style.name}>
        {val.mimeType === "video/x-matroska" ? (
            <MovieCreationIcon className={style.icon} />
          ) : val.mimeType === "application/pdf" ? (
            <PictureAsPdfIcon className={style.icon} />
          ) : val.mimeType === "image/png" ? (
            <ImageIcon className={style.icon} />
          ) : val.mimeType === "text/html" ? (
            <HtmlIcon className={style.icon} />
          ) : val.mimeType === "video/mp4" ? (
            <MovieCreationIcon className={style.icon} />
          ) : val.mimeType === "application/x-rar" ? (
            <FolderZipIcon className={style.icon} />
          ) : val.mimeType === "application/vnd.google-apps.folder" ? (
            <FolderSpecial className={style.icon} />
          ) : val.mimeType === "application/json" ? (
            <DataObjectIcon className={style.icon} />
          ) : (
            <DeviceUnknownIcon className={style.icon} />
          )}
          <span>{val.name}</span>
        </div>

        {/* <span className={style.mimeType}>{val.mimeType}</span> */}
      </div>
    </div>
  );
};

export default FileItem;
