import React, {useCallback, useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import './style.css';

const Dropzone = ({ onFileUploaded, isImageSelected, preSelectedImage }) => {

  const editingProduct = useSelector(state => state.editingProduct);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(()=>{
    //console.log(preSelectedImage);
    setSelectedImage(preSelectedImage);
    onFileUploaded(preSelectedImage);
  }, []);

  useEffect(()=>{
    if(editingProduct){
      setSelectedImage(editingProduct.imageProd);
      onFileUploaded(editingProduct.imageProd);
    }
  }, [editingProduct])

  useEffect(()=>{
    if(!isImageSelected){
      setSelectedImage('');
    } else {
      setSelectedImage(preSelectedImage);
    }
  },[isImageSelected]);

  const onDrop = useCallback((acceptedFiles) => {
      const reader = new FileReader()

      reader.readAsDataURL(acceptedFiles[0]);

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const base64 = reader.result;

        setSelectedImage(base64);
        
        onFileUploaded(base64);
      }  
    
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/*'})

  return (
    <div className = 'dropzone' {...getRootProps()}>
      <input accept = 'image/*' {...getInputProps()} />
      {
        selectedImage ?
          <img src={selectedImage} alt="Imagem do produto"/>
          :(
            isDragActive ?
              <p>
                  <FiUpload />
                  Solte aqui a imagem ...
              </p> :
              <p>
                  <FiUpload />
                  Arraste ou clique para selecionar a imagem do produto {isImageSelected}
              </p>
          )
      }
    </div>
  )
}

export default Dropzone;