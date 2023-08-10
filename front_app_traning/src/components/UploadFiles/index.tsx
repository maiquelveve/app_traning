import { Box, Button, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { useDropzone } from "react-dropzone";

export const UploadFiles: React.FC =  () => {

  const { getInputProps, getRootProps, acceptedFiles, fileRejections } = useDropzone({ 
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"]
    }
  });
  
  const acceptedFileItems = acceptedFiles.map(file => ( { preview: URL.createObjectURL(file) } ))[0];
  const fileRejectionItems = fileRejections.map(({ errors }) => (errors))[0];


  // PROPS A RECEBER
  // eslint-disable-next-line react/display-name
  const ButtonSelectedFile: React.FC<IAppProps> = (prop) => { 
    return (
      <Button
        {...prop}
        fullWidth
        variant="text"
      >
        Selecione uma Imagem
      </Button>
    );
  };

  return (
    <Box>
      <input {...getInputProps()} />
      <Box>
        {(!acceptedFileItems && !fileRejectionItems) &&
          <ButtonSelectedFile {...getRootProps()} />
          // <Button
          //   {...getRootProps({className: "dropzone"})}
          //   fullWidth
          //   variant="text"
          // >
          //   Selecione uma Imagem
          // </Button>
        }
        <Box>
          {acceptedFileItems &&
            <Box 
              {...getRootProps()}
              display="flex" 
              flexDirection="row" 
              alignItems="center" 
              justifyContent="center" 
            >
              <Box 
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
