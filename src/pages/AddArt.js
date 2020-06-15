import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../styles/AddArt.css';
import MainContainer from '../components/Utils/MainContainer';
import BackButton from '../components/Utils/BackButton';

import DragNDrop from '../components/Utils/DragNDrop';
import Loader from '../components/Utils/Loader';
import AddArtTextForm from '../components/AddArt/AddArtTextForm';

const AddArt = ({ user, artType }) => {
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);

  const [name, setName] = useState(null);
  const [creationYear, setCreationYear] = useState(null);
  const [type, setType] = useState('');
  const [format, setFormat] = useState('normal');
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [price, setPrice] = useState(null);
  const [isSold, setIsSold] = useState(false);
  const [sellPrice, setSellPrice] = useState(null);
  const [sellPriceIsUnknown, setSellPriceIsUnknown] = useState(false);
  const [customer, setCustomer] = useState(null);

  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);

  const [errorFields, setErrorFields] = useState([]);
  const [formIsLoading, setFormIsLoading] = useState(false);

  // console.log('nom', name);
  // console.log('année', creationYear);
  // console.log('format', format);
  // console.log('type', type);
  // console.log('width', width);
  // console.log('height', height);
  // console.log('price', price);
  // console.log('isSold', isSold);
  // console.log('sellPrice', sellPrice);
  // console.log('sellPriceIsUnknown', sellPriceIsUnknown);
  // console.log('customer', customer);

  const getErrorsArr = () => {
    const errorsArr = [];

    if (!name) errorsArr.push('name');
    if (!creationYear) errorsArr.push('creationYear');
    if (!format) errorsArr.push('format');
    if (!type) errorsArr.push('type');
    if (!width) errorsArr.push('width');
    if (!height) errorsArr.push('height');
    if (!price && price !== 0) errorsArr.push('price');
    if (isSold && !customer) errorsArr.push('customer');
    if (isSold && !sellPriceIsUnknown && !sellPrice && sellPrice !== 0)
      errorsArr.push('sellPrice');
    if (!firstImage) errorsArr.push('firstImage');
    if (format !== 'normal' && !secondImage) errorsArr.push('secondImage');
    if (format === 'triptyque' && !thirdImage) errorsArr.push('thirdImage');

    setErrorFields(errorsArr);

    return errorsArr;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (getErrorsArr().length === 0) {
      setFormIsLoading(true);

      const formData = new FormData();

      if (firstImage) formData.append('firstImage', firstImage);
      if (secondImage) formData.append('secondImage', secondImage);
      if (thirdImage) formData.append('thirdImage', thirdImage);

      try {
        const response = await axios.post(
          'http://localhost:3100/paintings/add',
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + user.token,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(response.data);
      } catch (e) {
        console.error(e.message);
      }
      setFormIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsReadyToDisplay(true);
    }, 200);
  }, []);

  useEffect(() => {
    if (sellPriceIsUnknown) setSellPrice(null);
  }, [sellPriceIsUnknown]);

  return (
    <div
      className='page-container'
      style={{
        opacity: isReadyToDisplay ? 1 : 0,
        transition: ' opacity 0.5s',
      }}
    >
      <MainContainer>
        <BackButton artType={artType} />
        <div className='add-art-top-container d-flex flex-column align-center space-around'>
          <AddArtTextForm
            name={name}
            setName={setName}
            creationYear={creationYear}
            setCreationYear={setCreationYear}
            format={format}
            setFormat={setFormat}
            type={type}
            setType={setType}
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            price={price}
            setPrice={setPrice}
            isSold={isSold}
            setIsSold={setIsSold}
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
            sellPriceIsUnknown={sellPriceIsUnknown}
            setSellPriceIsUnknown={setSellPriceIsUnknown}
            customer={customer}
            setCustomer={setCustomer}
            setSecondImage={setSecondImage}
            setThirdImage={setThirdImage}
            errorFields={errorFields}
          />
        </div>
        <div className='add-art-bottom-container d-flex flex-column align-center'>
          <div
            className='d-flex'
            style={{ width: '100%', height: '80%', marginBottom: '20px' }}
          >
            <div className='drag-n-drop-container d-flex'>
              <div className='first-drag-n-drop'>
                <DragNDrop photo={firstImage} setPhoto={setFirstImage} />
              </div>
              <div className='second-drag-n-drop'>
                <DragNDrop photo={secondImage} setPhoto={setSecondImage} />
              </div>

              <div className='third-drag-n-drop'>
                <DragNDrop photo={thirdImage} setPhoto={setThirdImage} />
              </div>
            </div>
            <div className='art-preview-background d-flex justify-center align-center'>
              <div
                className='d-flex justify-center align-center'
                style={{ width: '80%', height: '60%', position: 'relative' }}
              >
                <div
                  className='d-flex justify-center align-center'
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                  }}
                >
                  {firstImage && (
                    <img
                      src={firstImage.preview}
                      className='art-preview'
                      style={{
                        marginRight: format !== 'normal' ? '7px' : 0,
                      }}
                    />
                  )}
                  {secondImage && (
                    <img
                      src={secondImage.preview}
                      className='art-preview'
                      style={{
                        marginRight: format === 'triptyque' ? '7px' : 0,
                      }}
                    />
                  )}
                  {thirdImage && (
                    <img src={thirdImage.preview} className='art-preview' />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              className='submit add-art-button d-flex justify-center align-center'
              onClick={handleSubmit}
            >
              <div
                style={{
                  visibility: !formIsLoading ? 'visible' : 'hidden',
                }}
              >
                <span>Ajouter le tableau </span>
                <span style={{ fontWeight: 'normal' }}>
                  <>
                    (catégorie{' '}
                    <i>
                      {artType === 'paintings'
                        ? 'peinture'
                        : 'travail sur papier'}
                    </i>
                    )
                  </>
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  visibility: formIsLoading ? 'visible' : 'hidden',
                }}
              >
                <Loader height='30px' width='30px' />
              </div>
            </button>
          </div>
        </div>
      </MainContainer>
      <style>
        {`
          .art-preview {
            max-width: ${
              format === 'normal'
                ? '100%'
                : format === 'diptyque'
                ? '50%'
                : '33%'
            };
            max-height: 100%;
          }

          .first-drag-n-drop {
            margin-right: ${format !== 'normal' ? '20px' : 0};
            width:
              ${
                format === 'normal'
                  ? '100%'
                  : format === 'diptyque'
                  ? '50%'
                  : '33%'
              };
            transition: all 0.5s;
            transition-property: width, margin-right;
            border: ${
              errorFields.includes('firstImage') && !firstImage
                ? '2px red solid'
                : 'none'
            };
            border-radius: var(--miniRadius);
          }

          .second-drag-n-drop {
            margin-right: ${format === 'triptyque' ? '20px' : 0};
            width:
              ${
                format === 'normal' ? 0 : format === 'diptyque' ? '50%' : '33%'
              };
            transition: all 0.5s;
            transition-property: width, margin-right;
            border: ${
              errorFields.includes('secondImage') && !secondImage
                ? '2px red solid'
                : 'none'
            };
            border-radius: var(--miniRadius);
            overflow: hidden;
          }

          .third-drag-n-drop {
            width:
              ${format === 'normal' ? 0 : format === 'diptyque' ? 0 : '33%'};
            transition: width 0.5s;
            border: ${
              errorFields.includes('thirdImage') && !thirdImage
                ? '2px red solid'
                : 'none'
            };
            border-radius: var(--miniRadius);
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default AddArt;
