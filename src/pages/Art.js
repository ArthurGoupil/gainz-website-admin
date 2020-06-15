import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/Art.css';
import Loader from '../components/Utils/Loader';
import RegularInput from '../components/Inputs/RegularInput';
import CurrencyInput from '../components/Inputs/CurrencyInput';
import DimensionInput from '../components/Inputs/DimensionInput';
import TitleInput from '../components/Inputs/TitleInput';
import Checkbox from '../components/Utils/Checkbox';
import Modal from '../components/Utils/Modal';
import MainContainer from '../components/Utils/MainContainer';
import BackButton from '../components/Utils/BackButton';

const Art = ({ artType }) => {
  const { shortId } = useParams();
  const [sellPriceWidth, setSellPriceWidth] = useState(0);

  const [art, setArt] = useState(null);
  const [name, setName] = useState(null);
  const [creationYear, setCreationYear] = useState(null);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [isSold, setIsSold] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [isOnHome, setIsOnHome] = useState(null);

  const [sellPriceIsUnknown, setSellPriceIsUnknown] = useState(null);

  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [displayModal, setDisplayModal] = useState(false);

  const artSellRef = useCallback((node) => {
    if (node !== null) {
      setSellPriceWidth(node.getBoundingClientRect().width);
      console.log(node.getBoundingClientRect().width);
    }
  });

  // useEffect(() => {
  //   if (artSellRef.current) {
  //     if (!originalArtSellWidth.current)
  //       originalArtSellWidth.current = artSellRef.current.scrollWidth;
  //     if (customer === art.customer && sellPrice === art.sellPrice) {
  //       setSellPriceWidth(originalArtSellWidth.current);
  //     } else setSellPriceWidth(artSellRef.current.scrollWidth);
  //   }
  // }, [sellPriceWidth, customer, sellPrice]);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/${artType}/${shortId}`
        );
        setArt(response.data);
        setName(response.data.name);
        setPrice(response.data.price);
        setCreationYear(response.data.creationYear);
        setType(response.data.type);
        setIsSold(response.data.isSold);
        setCustomer(response.data.customer);
        setSellPrice(response.data.sellPrice);
        if (response.data.sellPrice === null) setSellPriceIsUnknown(true);
        setIsOnHome(response.data.isOnHome);

        if (response.data.format === 'normal') {
          setWidth(response.data.width);
          setHeight(response.data.height);
        } else {
          setWidth(response.data.widthOfEach);
          setHeight(response.data.heightOfEach);
        }

        setIsLoading(false);
        setTimeout(() => {
          setIsReadyToDisplay(true);
        }, 100);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchArt();
  }, [artType, shortId]);

  const getArtMultiplier = (format) => {
    if (format === 'triptyque') {
      return (
        <>
          &#160;<b>(x3)</b>
        </>
      );
    } else if (format === 'diptyque') {
      return (
        <>
          &#160;<b>(x2)</b>
        </>
      );
    }
  };

  const resetData = (art) => {
    setName(art.name);
    setCreationYear(art.creationYear);
    setType(art.type);
    setPrice(art.price);
    setIsSold(art.isSold);
    setCustomer(art.customer);
    setSellPrice(art.sellPrice);
    setIsOnHome(art.isOnHome);

    if (art.sellPrice === null) setSellPriceIsUnknown(true);
    else setSellPriceIsUnknown(false);

    if (art.format === 'normal') {
      setWidth(art.width);
      setHeight(art.height);
    } else {
      setWidth(art.widthOfEach);
      setHeight(art.heightOfEach);
    }
  };

  useEffect(() => {
    if (art) {
      if (sellPriceIsUnknown) setSellPrice(null);
      else setSellPrice(art.sellPrice);
    }
  }, [sellPriceIsUnknown]);

  return (
    <>
      <div className='page-container d-flex'>
        {!isLoading ? (
          <MainContainer flexBox='main-container d-flex flex-column align-center space-between'>
            <BackButton artType={artType} />
            <div className='art-image-container d-flex justify-center'>
              <div className='art-image' alt={art.name} />
            </div>
            <div className='d-flex flex-column align-center'>
              <TitleInput
                value={art.name}
                changeValue={setName}
                isEditing={isEditing}
                isCanceling={isCanceling}
              />
              <div className='infos-margin-bottom d-flex align-center space-between'>
                <div className='infos-margin-right'>
                  <RegularInput
                    label='Année'
                    stateValue={creationYear}
                    changeValue={setCreationYear}
                    isEditing={isEditing}
                    number
                  />
                </div>
                |
                <div className='infos-margin-left infos-margin-right'>
                  <RegularInput
                    label='Type'
                    stateValue={type}
                    changeValue={setType}
                    isEditing={isEditing}
                  />
                </div>
                |
                <div className='infos-margin-left d-flex align-center'>
                  <DimensionInput
                    label='Dimensions'
                    stateValue={width}
                    changeValue={setWidth}
                    isEditing={isEditing}
                    unit='cm'
                  />
                  &#160;
                  <DimensionInput
                    label='x'
                    stateValue={height}
                    changeValue={setHeight}
                    isEditing={isEditing}
                    unit='cm'
                  />
                  {getArtMultiplier(art.format)}
                </div>
              </div>
              <div
                className='infos-margin-bottom d-flex align-center justify-center'
                style={{ width: '100%' }}
              >
                <div className='infos-margin-right'>
                  <CurrencyInput
                    label='Prix'
                    stateValue={price}
                    changeValue={setPrice}
                    isEditing={isEditing}
                    currency='€'
                  />
                </div>
                |
                <div
                  className={`${
                    isSold && 'infos-margin-right'
                  } infos-margin-left`}
                >
                  <Checkbox
                    label='Vendu'
                    checked={isSold}
                    setChecked={setIsSold}
                    isEditing={isEditing}
                    isCanceling={isCanceling}
                  />
                </div>
                <div
                  ref={artSellRef}
                  className='d-flex align-center'
                  style={{
                    maxWidth: isSold ? '75%' : 0,
                    overflow: 'hidden',
                    transition: 'all 0.5s',
                    transitionProperty: 'max-width, opacity',
                    opacity: isSold ? 1 : 0,
                  }}
                >
                  <span className='infos-margin-right'>|</span>
                  <RegularInput
                    minWidth='60px'
                    label='Vendu à'
                    labelStyle={{ marginRight: '3px', whiteSpace: 'nowrap' }}
                    stateValue={customer}
                    changeValue={setCustomer}
                    isEditing={isEditing}
                  />
                  &#160;
                  <CurrencyInput
                    minWidth='30px'
                    label='pour'
                    labelStyle={{ marginRight: '3px', whiteSpace: 'nowrap' }}
                    stateValue={sellPrice}
                    changeValue={setSellPrice}
                    isEditing={isEditing}
                    currency='€'
                    disabled={sellPriceIsUnknown}
                  />
                  <div className='infos-margin-right infos-margin-left'>
                    <Checkbox
                      label='Prix inconnu'
                      labelStyle={{ marginRight: '8px', whiteSpace: 'nowrap' }}
                      checked={sellPriceIsUnknown}
                      setChecked={setSellPriceIsUnknown}
                      isEditing={isEditing}
                      isCanceling={isCanceling}
                    />
                  </div>
                </div>
              </div>
              {width / height === 1 && art.format === 'normal' && (
                <div className='is-on-home-container'>
                  <Checkbox
                    label='Sur la home'
                    checked={isOnHome}
                    setChecked={setIsOnHome}
                    isEditing={isEditing}
                    isCanceling={isCanceling}
                  />
                </div>
              )}
            </div>
            <div className='d-flex'>
              <button
                className='button update-button'
                style={{ marginRight: '10px' }}
                onClick={() => {
                  if (isEditing) {
                  } else setIsEditing(true);
                }}
              >
                {isEditing ? 'Confirmer' : "Modifier l'oeuvre"}
              </button>
              <button
                className='button delete-button'
                onClick={() => {
                  if (isEditing) {
                    resetData(art);
                    setIsEditing(false);
                  } else setDisplayModal(true);
                }}
              >
                <FontAwesomeIcon icon={`${isEditing ? 'times' : 'trash'}`} />
              </button>
            </div>
            <Modal
              icon='trash'
              iconColor='rgb(252, 80, 80)'
              question={
                <div className='d-flex flex-column'>
                  <span>
                    Es-tu sûr de vouloir supprimer <b>{art.name}</b> ?
                  </span>
                  <span style={{ fontSize: '1rem' }}>
                    On peut toujours récupérer un tableau supprimé 😉
                  </span>
                </div>
              }
              posLabel='Oui'
              negLabel='Non'
              onNegClick={() => setDisplayModal(false)}
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
            />
            <style>
              {`
              .art-image {
                background-image: url(${art.smallImage});
              } 

              .update-button {
                width: ${!isEditing ? '135px' : '90px'};
                white-space: nowrap;
              }
          
              .main-container {
                opacity: ${isReadyToDisplay ? 1 : 0};
                transition: opacity 0.5s;
              }

            `}
            </style>
          </MainContainer>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Art;
