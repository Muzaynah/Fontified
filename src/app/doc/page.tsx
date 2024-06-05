// src/app/document-editor/page.tsx or pages/document-editor/index.tsx
"use client";

import React, { useRef } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";

// Register the Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF1cWWhPYVJzWmFZfVpgdVVMYFRbQXBPMyBoS35RckVmWHhec3BUQ2hZWEd2"
);

const DocumentEditorPage = () => {
  const editorObj = useRef<DocumentEditorContainerComponent | null>(null);

  const onSave = () => {
    editorObj.current?.documentEditor.save("Sample", "Docx");
  };

  return (
    <div style={{ margin: "2%" }}>
      <style jsx global>{`
        @import url("https://cdn.syncfusion.com/ej2/20.3.56/bootstrap5.css");
      `}</style>
      <button onClick={onSave} style={{ marginBottom: 10 }}>
        Save
      </button>
      <DocumentEditorContainerComponent
        ref={editorObj}
        height="590"
        enableToolbar={true}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      >
        <Inject services={[Toolbar]} />
      </DocumentEditorContainerComponent>
    </div>
  );
};

export default DocumentEditorPage;
