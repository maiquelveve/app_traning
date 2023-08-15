interface IDeleteFileDirProps {
  pathFile: string;
}

interface IWriteFileProps {
  filename: string;
  fileBuffer:  Buffer;
}

interface INewFilenamesProps {
  originalname: string;
}

interface IFilesValidationsProps {
  file: Express.Multer.File | undefined
  allowMimes: string[];
  limit?: number;
}
