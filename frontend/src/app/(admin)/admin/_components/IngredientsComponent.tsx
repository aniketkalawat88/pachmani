import React, { useState, ChangeEvent } from 'react';

interface Image {
  name: string;
  url: string;
  userDefinedName: string;
}
interface IngredientsComponentProps {
  ingradData:  [{ image: { fileId: string; url: string }; name: string }];
}

const IngredientsComponent: React.FC<IngredientsComponentProps> = () => {
  const [images, setImages] = useState<Image[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const updatedImages = files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        userDefinedName: ''
      }));
      setImages(updatedImages);
      console.log('Uploaded Images:', updatedImages);
    }
  };

  const handleImageClick = (image: Image) => {
    console.log('Selected Image:', image);
  };

  const handleNameChange = (index: number, newName: string) => {
    const updatedImages = images.map((image, i) => 
      i === index ? { ...image, userDefinedName: newName } : image
    );
    setImages(updatedImages);
    console.log('Updated Images:', updatedImages);
  };

  return (
    <div className=" w-full">
      <h2 className="block text-sm text-gray-700 font-medium">Ingradients</h2>
      <input
        type="file"
        accept="image/"
        multiple
        onChange={handleImageChange}
        className="border border-gray-300 outline-none p-2.5 rounded-lg w-full my-1.5"
      />
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border p-2 cursor-pointer">
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-32 mb-2 object-cover rounded-sm"
              onClick={() => handleImageClick(image)}
            />
            <input
              type="text"
              placeholder="Enter Ingradients name"
              value={image.userDefinedName}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-full border px-2 py-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsComponent;
