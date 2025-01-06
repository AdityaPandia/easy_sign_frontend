
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { UploadFile, History } from "@mui/icons-material";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState([]); // All uploaded documents
  const [unsignedDocuments, setUnsignedDocuments] = useState([]); // Unsigned documents
  const [signedDocuments, setSignedDocuments] = useState([]); // Signed documents
  const [error, setError] = useState("");
  const [signing, setSigning] = useState(false);
  const [signerNames, setSignerNames] = useState([]); // List of signer names for each unsigned document
  const [signedFileUrl, setSignedFileUrl] = useState("");

  useEffect(() => {

    const fetchDocuments = async () => {
      try {
        // Get the token from localStorage or sessionStorage (wherever it is stored)
        const token = localStorage.getItem('authToken');

        if (!token) {
          setError("User is not authenticated.");
          return;
        }

        const response = await axios.get("https://easy-sign-backend.vercel.app/api/files/documents", {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token to Authorization header
          },
        });

        const { unsigned, signed } = response.data;
        setUploadHistory(response.data); // General file list
        setUnsignedDocuments(unsigned); // Set unsigned files
        setSignedDocuments(signed); // Set signed files
        setSignerNames(new Array(unsigned.length).fill("")); // Initialize signer names array
      } catch (err) {
        console.error("Error fetching documents:", err.message);
        setError("Failed to fetch documents.");
      }
    };


    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setError("");

      // Get the token from localStorage or sessionStorage (wherever it is stored)
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await axios.post("https://easy-sign-backend.vercel.app/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,  // Add token to Authorization header
        },
      });

      setUploading(false);
      setFile(null);
      setUnsignedDocuments((prev) => [response.data.file, ...prev]); // Add uploaded file to unsigned documents
    } catch (err) {
      setUploading(false);
      console.error("Upload failed:", err.message);
      setError("An error occurred while uploading the file.");
    }
  };


  const handleSignerNameChange = (index, value) => {
    const updatedSignerNames = [...signerNames];
    updatedSignerNames[index] = value;
    setSignerNames(updatedSignerNames);
  };


  const handlePdfSign = async (fileId, index) => {
    if (!signerNames[index]) {
      setError("Signer name is required.");
      return;
    }

    try {
      setSigning(true);
      setError("");

      // Get the token from localStorage or sessionStorage (wherever it is stored)
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await axios.post("https://easy-sign-backend.vercel.app/api/files/sign-pdf", {
        fileId,
        signerName: signerNames[index],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Add token to Authorization header
        },
      });

      const signedDocument = {
        ...unsignedDocuments[index],
        signerName: signerNames[index],
        signedFilePath: response.data.signedFilePath,
      };

      // Update states for signed documents and remove from unsigned
      setSignedDocuments((prev) => [signedDocument, ...prev]);
      setUnsignedDocuments((prev) => prev.filter((_, i) => i !== index));
      setSignerNames((prev) => prev.filter((_, i) => i !== index));
      setSignedFileUrl(response.data.signedFilePath);
      setSigning(false);
    } catch (err) {
      setSigning(false);
      console.error("Signing failed:", err.message);
      setError("An error occurred while signing the PDF.");
    }
  };


  const handleDocxSign = async (fileId, index) => {
    if (!signerNames[index]) {
      setError("Signer name is required.");
      return;
    }
    try {
      // /uploads/1735105726686.docx
    } catch (err) {
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Dashboard
      </Typography>

      {/* Upload Section */}
      <Card sx={{ maxWidth: 800, margin: "0 auto", marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Upload a Document <UploadFile />
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload File"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Unsigned Documents Section */}
      <Card sx={{ maxWidth: 800, margin: "0 auto", marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Unsigned Documents <History />
          </Typography>
          {unsignedDocuments.length === 0 ? (
            <Typography>No unsigned documents.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>File Size (Bytes)</TableCell>
                    <TableCell>Uploaded At</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>


                  {unsignedDocuments.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.fileName}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          : "N/A"}
                      </TableCell>

                      <TableCell>
                        <TextField
                          label="Signer Name"
                          variant="outlined"
                          size="small"
                          value={signerNames[index] || ""}
                          onChange={(e) => handleSignerNameChange(index, e.target.value)}
                          sx={{ marginRight: 1 }}
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            item.fileName.endsWith(".docx")
                              ? handleDocxSign(item.id, index)
                              : handlePdfSign(item.id, index)
                          }
                          disabled={signing}
                        >
                          {signing ? "Signing..." : item.fileName.endsWith(".docx") ? "Sign DOC" : "Sign PDF"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Signed Documents Section */}
      <Card sx={{ maxWidth: 800, margin: "0 auto" }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Signed Documents
          </Typography>
          {signedDocuments.length === 0 ? (
            <Typography>No signed documents.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Signed By</TableCell>
                    <TableCell>Signed At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {signedDocuments.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.fileName}</TableCell>
                      <TableCell>{item.signerName}</TableCell>
                      <TableCell>{new Date(item.signedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          href={`https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${item.signedFilePath}`} // S3 file URL
                          target="_blank"
                          rel="noopener noreferrer"
                          download={item.fileName} // Enables file download
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
