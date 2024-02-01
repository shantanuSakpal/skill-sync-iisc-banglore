import { useState } from 'react';

function DragAndDropFileInput() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-dashed border-2 flex justify-center p-4 ${dragging ? 'bg-gray-200' : 'bg-white'}`}
    >
      <div className='m-2'>
      <p className="text-sm font-semibold mb-2">Drag & Drop Files Here</p>
      <input
        type="file"
        onChange={(e) => setFiles(Array.from(e.target.files))}
        className="hidden"
      />
      <h2
        onClick={() => document.querySelector('input[type="file"]').click()}
        className=" text-blue-700 px-4 py-1 rounded-md cursor-pointer"
      >
        Select Files
      </h2>

      {files.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Selected Files:</h2>
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}

export default DragAndDropFileInput;
