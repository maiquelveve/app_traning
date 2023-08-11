import { useDropzone } from "react-dropzone";
import { Box, Button, Typography } from "@mui/material";

export const UploadFilesImg: React.FC<IUploadFileImgProps> =  ({ onSaveFile }) => {
  const { getInputProps, getRootProps, acceptedFiles, fileRejections  } = useDropzone({ 
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
    maxFiles: 1,
  });
  
  const acceptedFileItems = acceptedFiles.map(file => ({ file, preview: URL.createObjectURL(file) }))[0];
  const fileRejectionItems = fileRejections.map(({ errors }) => (errors))[0];

  return (
    <Box>
      <input {...getInputProps()} />
      <Box>
        {(!acceptedFileItems && !fileRejectionItems) &&
          <Button
            {...getRootProps()}
            fullWidth
            variant="text"
          >
            Selecione uma Imagem
          </Button>
        }
        <Box>
          {acceptedFileItems &&
            <Box 
              display="flex" 
              flexDirection="row" 
              alignItems="center" 
              justifyContent="center" 
            >
              <Box 
                {...getRootProps()}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#444"
                }}
              >
                <Box 
                  sx={{
                    width: "36px",
                    height: "36px",
                    borderRadius: 1,
                    backgroundImage: `url(${acceptedFileItems.preview})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%"
                  }} 
                />
              </Box>
              <Button
                fullWidth
                variant="text"
                onClick={() => onSaveFile(acceptedFileItems.file)}
              >
                Enviar Imagem
              </Button>
            </Box>
          }
          {fileRejectionItems &&
            <Box 
              {...getRootProps()}
              display="flex" 
              flexDirection="column" 
              sx={{ cursor: "pointer" }}
            >
              <Typography 
                textAlign="center"
                variant="button"
                color="red"
              >
                Tipo Arquivo invalido.
              </Typography>
              <Typography 
                textAlign="center"
                variant="caption"
                color="red"
              >
                Escolha um arquivo JPEG, PNG, JPG.
              </Typography>
            </Box>
          }
        </Box>
      </Box>  
    </Box>
  );
};
