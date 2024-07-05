import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ src, cropWidth, cropHeight }) => {
  const [crop, setCrop] = useState({ aspect: cropWidth / cropHeight });
  const [croppedImage, setCroppedImage] = useState(null);


  const onCropComplete = (crop) => {
    alert(20)
    if (crop.width && crop.height) {
      getCroppedImage();
    }
  };

  const getCroppedImage = () => {
    alert(20)
    const image = new Image();
    image.crossOrigin = 'anonymous'; // Allow cross-origin access
    image.src = src;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    const scaledCropWidth = cropWidth * scaleX;
    const scaledCropHeight = cropHeight * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      scaledCropWidth,
      scaledCropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    canvas.toBlob(
      (blob) => {
        setCroppedImage(URL.createObjectURL(blob));
        alert(URL.createObjectURL(blob))
      },
      'image/jpeg',
      1
    );
  };

  return (
    <div>
      <ReactCrop
        src={src}
        crop={crop}
        onChange={setCrop}
        onComplete={onCropComplete}
        ruleOfThirds
      />
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  );
};

export default ImageCropper;
