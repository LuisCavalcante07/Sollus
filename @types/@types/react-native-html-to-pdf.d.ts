declare module 'react-native-html-to-pdf' {
  interface PDFOptions {
      html: string;
      fileName: string;
      directory?: string;
  }

  interface PDFResponse {
      filePath?: string;
      base64?: string;
      status?: string;
  }

  const RNHTMLtoPDF: {
      convert: (options: PDFOptions) => Promise<PDFResponse>;
  };

  export default RNHTMLtoPDF;
}
