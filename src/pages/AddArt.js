import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import '../styles/AddArt.css';
import MainContainer from '../components/Utils/MainContainer';
import BackButton from '../components/Utils/BackButton';

import DragNDrop from '../components/Utils/DragNDrop';
import Loader from '../components/Utils/Loader';
import AddArtTextForm from '../components/AddArt/AddArtTextForm';
import MessageModal from '../components/Utils/Modal';

const AddArt = ({ user, artType }) => {
  const history = useHistory();

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
  const [displayMessageModal, setDisplayMessageModal] = useState(false);
  const [messageModalText, setMessageModalText] = useState('');
  const [messageModalIcon, setModalMessageIcon] = useState('');
  const [messageModalIconColor, setModalMessageIconColor] = useState('');
  const [messageModalButtonLabel, setMessageModalButtonLabel] = useState('');
  const [
    messageModalOutsideClickType,
    setMessageModalOutsideClickType,
  ] = useState('close');

  const getFrenchArtType = (artType, { pronoun }, { plural }) => {
    let frenchArtType;
    let result;
    if (artType === 'paintings') {
      if (pronoun && plural) frenchArtType = 'des peintures';
      else if (pronoun) frenchArtType = 'La peinture';
      else if (plural) frenchArtType = 'peintures';
      else frenchArtType = 'peinture';
    } else {
      if (pronoun && plural) frenchArtType = 'des travaux sur papier';
      else if (pronoun) frenchArtType = 'Le travail sur papier';
      else if (plural) frenchArtType = 'travaux sur papier';
      else frenchArtType = 'travail sur papier';
    }
    return frenchArtType;
  };
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

      formData.append('name', name);
      formData.append('creationYear', creationYear);
      formData.append('type', type);
      formData.append('format', format);
      formData.append('width', width);
      formData.append('height', height);
      formData.append('price', price);
      formData.append('isSold', isSold);
      formData.append('sellPrice', sellPrice);
      formData.append('sellPriceIsUnknown', sellPriceIsUnknown);
      formData.append('customer', customer);

      try {
        const response = await axios.post(
          `http://localhost:3100/${artType}/add`,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + user,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setMessageModalText(
          <>
            {getFrenchArtType(artType, { pronoun: true }, { plural: false })}{' '}
            <b>{name}</b> a bien été ajouté{artType === 'paintings' && 'e'} au
            site web.
          </>
        );
        setModalMessageIcon('check');
        setModalMessageIconColor('rgb(0, 213, 7)');
        setMessageModalButtonLabel(`Ok`);
        setMessageModalOutsideClickType('add-success');
        setDisplayMessageModal(true);
        console.log(response.data);
      } catch (e) {
        if (
          e.response.data.message ===
          `${artType.slice(0, artType.length - 1)} already exists!`
        ) {
          setMessageModalText(
            <>
              <div>
                {getFrenchArtType(
                  artType,
                  { pronoun: true },
                  { plural: false }
                )}{' '}
                <b>{name}</b> existe déjà.
              </div>
              <div>Choisis un autre nom.</div>
            </>
          );
          setModalMessageIcon('exclamation');
          setModalMessageIconColor('rgb(252, 80, 80)');
          setMessageModalButtonLabel(`J'ai compris`);
          setMessageModalOutsideClickType('close');
          setDisplayMessageModal(true);
        } else {
          setMessageModalText(<>Une erreur est survenue. Réessaie.</>);
          setDisplayMessageModal(true);
        }
        console.error({ e });
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
            user={user}
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
                      alt='Première preview'
                      src={firstImage.preview}
                      className='art-preview'
                      style={{
                        marginRight: format !== 'normal' ? '7px' : 0,
                      }}
                    />
                  )}
                  {secondImage && (
                    <img
                      alt='Deuxième preview'
                      src={secondImage.preview}
                      className='art-preview'
                      style={{
                        marginRight: format === 'triptyque' ? '7px' : 0,
                      }}
                    />
                  )}
                  {thirdImage && (
                    <img
                      alt='Troisième preview'
                      src={thirdImage.preview}
                      className='art-preview'
                    />
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
                      {getFrenchArtType(
                        artType,
                        { pronoun: false },
                        { plural: false }
                      )}
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
        <MessageModal
          icon={messageModalIcon}
          iconColor={messageModalIconColor}
          question={messageModalText}
          posLabel={messageModalButtonLabel}
          onPosClick={() => {
            if (messageModalOutsideClickType === 'close')
              setDisplayMessageModal(false);
            else if (messageModalOutsideClickType === 'add-success')
              history.push(`/${artType}`);
          }}
          onOutsideClick={() => {
            if (messageModalOutsideClickType === 'close')
              setDisplayMessageModal(false);
            else if (messageModalOutsideClickType === 'add-success')
              history.push(`/${artType}`);
          }}
          displayModal={displayMessageModal}
          setDisplayModal={setDisplayMessageModal}
        />
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
