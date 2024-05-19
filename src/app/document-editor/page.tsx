// src/app/document-editor/page.tsx or pages/document-editor/index.tsx
"use client";
import Nav from "../components/Navbar";

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
    editorObj.current?.documentEditor.save("Document", "Docx");
  };

  return (
    <div id="top" className=" bg-black text-white min-h-screen pb-20">
      <div className="absolute z-0 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="fixed top-0 left-0 w-full h-full">
          <div className="absolute z-0 -top-3/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-transparent to-fuchsia-400 w-full opacity-40% h-full rounded-full blur-[250px]"></div>
        </div>
      </div>
      <Nav />
      <div className="container mx-auto px-4 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold">Create, Edit and Save Documents</h1>
      </div>

      <div className="m-12 flex flex-col">
        <style jsx global>{`
          @import url("https://cdn.syncfusion.com/ej2/20.3.56/bootstrap5.css");
        `}</style>

        <DocumentEditorContainerComponent
          ref={editorObj}
          height="800"
          enableToolbar={true}
          serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        >
          <Inject services={[Toolbar]} />
        </DocumentEditorContainerComponent>
      </div>
      <div className="flex justify-center">
        <button
          className="text-xl border-2 bg-black text-center justify-center items-center hover:text-black hover:bg-white px-4 py-2 rounded-full mr-4 border-white text-white"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DocumentEditorPage;
