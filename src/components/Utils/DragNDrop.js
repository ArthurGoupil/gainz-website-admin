import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import '../../styles/Utils/DragNDrop.css';

const DragNDrop = ({ photo, setPhoto }) => {
  const [isOnDrag, setIsOnDrag] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        alert(
          "Erreur : le format du fichier n'est pas accepté ou le fichier est corrompu."
        );
      } else
        setPhoto(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          })
        );
    },
    onDragEnter: () => {
      setIsOnDrag(true);
    },
    onDragLeave: () => {
      setIsOnDrag(false);
    },
    onDropAccepted: () => {
      setIsOnDrag(false);
    },
    multiple: false,
  });

  return (
    <section className='dropzone-container'>
      <div
        {...getRootProps({
          className: isOnDrag
            ? 'dropzone on-drag d-flex justify-center align-center'
            : 'dropzone off-drag d-flex justify-center align-center',
        })}
      >
        <input {...getInputProps()} />
        <div>
          {photo
            ? "Glisse une image ici ou clique pour changer d'image"
            : 'Glisse une image ici ou clique pour en ajouter une'}
        </div>
      </div>
    </section>
  );
};

export default DragNDrop;
