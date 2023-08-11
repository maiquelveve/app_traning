import { useDropzone } from "react-dropzone";
import { Alert, AlertTitle, Badge, Box, IconButton, Typography } from "@mui/material";
import { AddAPhoto, CheckCircle } from "@mui/icons-material";
import { LoadingSimple } from "..";

export const UploadFilesImg: React.FC<IUploadFileImgProps> =  ({ onSaveFile, isLoading=false }) => {
  const { getInputProps, getRootProps, acceptedFiles, fileRejections } = useDropzone({ 
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
    maxFiles: 1,
  });
  
  const acceptedFileItems = acceptedFiles.map(file => ({ file, preview: URL.createObjectURL(file) }))[0];
  const fileRejectionItems = fileRejections.map(({ errors }) => (errors))[0];

  const handleSaveFile = () => {
    acceptedFiles.pop();
    onSaveFile(acceptedFileItems.file);
  };

  return (
    <Box>
      <input {...getInputProps()} />
      {isLoading ? 
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
        >
          <LoadingSimple size={25} /> 
        </Box>  
        : 
        <Box>
          {(!acceptedFileItems && !fileRejectionItems) &&
            <IconButton aria-label="delete" {...getRootProps()} size="large" >
              <AddAPhoto fontSize="large" color="primary" />
            </IconButton>
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
                  mr={1}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#444"
                  }}
                >
                  <Badge 
                    {...getRootProps()} 
                    sx={{ cursor: "pointer" }}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    badgeContent={"x"} 
                    color="error" 
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        backgroundImage: `url(${acceptedFileItems.preview})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%"
                      }} 
                    />
                  </Badge>
                </Box>
                <IconButton 
                  onClick={handleSaveFile} 
                  sx={{  flexDirection: "column" }}
                  size="large" 
                >
                  <CheckCircle color="primary" />
                  <Typography textAlign="center" variant="subtitle2" color="green">
                    SALVAR
                  </Typography>
                </IconButton>
              </Box>
            }
            {fileRejectionItems &&
              <Box 
                {...getRootProps()}
                display="flex" 
                flexDirection="column" 
                sx={{ cursor: "pointer" }}
              >
                <Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>
                  <AlertTitle>Tipo Arquivo invalido</AlertTitle>
                  Extensões permitidas — <strong>JPEG, PNG, JPG</strong>
                </Alert>
              </Box>
            }
          </Box>
        </Box>  
      }
    </Box>
  );
};
