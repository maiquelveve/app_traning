interface IDeleteFileProps {
  pathFile: string;
}

interface IFindFileProps {
  pathFile: string;
}

interface IWriteFileProps {
  pathFilename: string;
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
