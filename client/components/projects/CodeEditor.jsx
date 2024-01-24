import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-text'; // Add text mode for English
import 'ace-builds/src-noconflict/theme-github';

function CodeEditor({ currentProject }) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentProject.iscode ? currentProject.language: 'english');

  const languageOptions = [
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'english', label: 'English' },
  ];

  const handleLanguageChange = (selectedValue) => {
    setSelectedLanguage(selectedValue);
  };

  const isCodeEditor = currentProject.iscode && selectedLanguage !== 'english';

  return (
    <div>
      {/* Dropdown for language selection */}
      <label className="text-xl font-bold p-1">Select Language:</label>
      <select
        className="p-1 border rounded-md"
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Code editor with selected language */}
      {isCodeEditor ? (
        <AceEditor
          mode={selectedLanguage}
          theme="github"
          value={currentProject.boilerplate}
          editorProps={{ $blockScrolling: true }}
          style={{ marginTop: '10px', width: '100%', height: '300px' }}
        />
      ) : (
        <textarea
          value={currentProject.boilerplate}
          readOnly
          style={{ marginTop: '10px', width: '100%', height: '300px', border: '1px solid #ccc', padding: '10px' }}
        />
      )}
    </div>
  );
}

export default CodeEditor;
