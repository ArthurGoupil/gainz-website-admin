import React, { useState, useEffect, useRef } from 'react';

import SelectBox from '../../components/Utils/SelectBox';
import RegularInput from '../Inputs/RegularInput';
import DimensionInput from '../Inputs/DimensionInput';
import CurrencyInput from '../Inputs/CurrencyInput';
import Checkbox from '../../components/Utils/Checkbox';

const AddArtTextForm = ({
  name,
  setName,
  creationYear,
  setCreationYear,
  format,
  setFormat,
  type,
  setType,
  width,
  setWidth,
  height,
  setHeight,
  price,
  setPrice,
  isSold,
  setIsSold,
  sellPrice,
  setSellPrice,
  sellPriceIsUnknown,
  setSellPriceIsUnknown,
  customer,
  setCustomer,
  setSecondImage,
  setThirdImage,
  errorFields,
}) => {
  const artSellRef = useRef();
  const [sellPriceWidth, setSellPriceWidth] = useState(0);

  useEffect(() => {
    if (artSellRef.current) setSellPriceWidth(artSellRef.current.scrollWidth);
  }, [sellPriceWidth, customer, sellPrice]);

  const labelStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginRight: '20px',
    textAlign: 'right',
  };

  return (
    <>
      <div className='d-flex space-around flex-wrap'>
        <div className='add-art-margin-right'>
          <RegularInput
            minWidth='200px'
            label='Nom'
            labelStyle={labelStyle}
            stateValue={name}
            changeValue={setName}
            isEditing={true}
            isAnError={errorFields.includes('name') && !name}
          />
        </div>
        <RegularInput
          minWidth='43px'
          label='Année de création'
          labelStyle={labelStyle}
          stateValue={creationYear}
          changeValue={setCreationYear}
          isEditing={true}
          isAnError={errorFields.includes('creationYear') && !creationYear}
          number
        />
      </div>
      <div className='d-flex space-around flex-wrap'>
        <div className='format-container add-art-margin-right d-flex'>
          <div className='d-flex align-center'>
            <div style={labelStyle}>Format</div>
            <SelectBox
              label='Normal'
              labelStyle={{ marginLeft: '5px', marginRight: '15px' }}
              selected={format === 'normal'}
              setSelected={setFormat}
              onClick={() => {
                setFormat('normal');
                setSecondImage(null);
                setThirdImage(null);
              }}
            />
            <SelectBox
              label='Diptyque'
              labelStyle={{ marginLeft: '5px', marginRight: '15px' }}
              selected={format === 'diptyque'}
              setSelected={setFormat}
              onClick={() => {
                setFormat('diptyque');
                setThirdImage(null);
              }}
            />
            <SelectBox
              label='Triptyque'
              labelStyle={{ marginLeft: '5px' }}
              selected={format === 'triptyque'}
              setSelected={setFormat}
              onClick={() => setFormat('triptyque')}
            />
          </div>
        </div>
        <RegularInput
          minWidth='200px'
          label='Type'
          labelStyle={labelStyle}
          placeholder='Peinture sur toile, collages...'
          stateValue={type}
          changeValue={setType}
          isEditing={true}
          isAnError={errorFields.includes('type') && !type}
        />
      </div>
      <div className='art-width-container d-flex space-between'>
        <div className='add-art-margin-right'>
          <DimensionInput
            minWidth='50px'
            label={
              format === 'normal' ? 'Largeur' : 'Largeur de chaque panneau'
            }
            labelStyle={labelStyle}
            stateValue={width}
            changeValue={setWidth}
            isEditing={true}
            unit='cm'
            isAnError={errorFields.includes('width') && !width}
          />
        </div>
        <DimensionInput
          minWidth='50px'
          label={format === 'normal' ? 'Hauteur' : 'Hauteur de chaque panneau'}
          labelStyle={labelStyle}
          stateValue={height}
          changeValue={setHeight}
          isEditing={true}
          unit='cm'
          isAnError={errorFields.includes('height') && !height}
        />
      </div>
      <div className='d-flex'>
        <div
          className={`${
            isSold && 'add-art-margin-right-big'
          } d-flex align-center`}
          style={{ transition: 'margin-right 0.5s' }}
        >
          <div className='add-art-margin-right-small'>
            <CurrencyInput
              minWidth='60px'
              label='Prix'
              labelStyle={labelStyle}
              stateValue={price}
              changeValue={setPrice}
              isEditing={true}
              currency='€'
              disabled={false}
              isAnError={errorFields.includes('price') && !price && price !== 0}
            />
          </div>
          <Checkbox
            label='Déjà vendu'
            checked={isSold}
            setChecked={setIsSold}
            isEditing={true}
          />
        </div>
        <div
          ref={artSellRef}
          className='add-art-sell-container d-flex align-center'
          style={{
            width: isSold ? `${sellPriceWidth}px` : 0,
            transition: 'all 0.5s',
            transitionProperty: 'width, opacity',
            opacity: isSold ? 1 : 0,
          }}
        >
          <div className='add-art-margin-right-small'>
            <RegularInput
              minWidth='140px'
              label='Vendu à'
              labelStyle={{ ...labelStyle, whiteSpace: 'nowrap' }}
              stateValue={customer}
              changeValue={setCustomer}
              isEditing={true}
              isAnError={errorFields.includes('customer') && !customer}
            />
          </div>
          <div className='add-art-margin-right-small'>
            <CurrencyInput
              minWidth='60px'
              label='pour'
              labelStyle={{ ...labelStyle, whiteSpace: 'nowrap' }}
              stateValue={sellPrice}
              changeValue={setSellPrice}
              isEditing={true}
              currency='€'
              disabled={sellPriceIsUnknown}
              isAnError={
                errorFields.includes('sellPrice') &&
                !sellPrice &&
                sellPrice !== 0 &&
                !sellPriceIsUnknown
              }
            />
          </div>
          <Checkbox
            label='Prix inconnu'
            labelStyle={{
              whiteSpace: 'nowrap',
              marginRight: '8px',
            }}
            checked={sellPriceIsUnknown}
            setChecked={setSellPriceIsUnknown}
            isEditing={true}
          />
        </div>
      </div>
    </>
  );
};

export default AddArtTextForm;
