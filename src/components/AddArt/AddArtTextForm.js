import React, { useRef } from 'react';

import SelectBox from '../../components/Utils/SelectBox';
import RegularInput from '../../components/Art/RegularInput';
import DimensionInput from '../../components/Art/DimensionInput';
import CurrencyInput from '../../components/Art/CurrencyInput';
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
  const sellPriceWidthRef = useRef();

  if (artSellRef.current && !sellPriceWidthRef.current)
    sellPriceWidthRef.current = artSellRef.current.scrollWidth;

  const labelStyle = {
    fontSize: '2rem',
    lineHeight: '2rem',
    fontWeight: 'bold',
    marginRight: '20px',
    textAlign: 'right',
  };

  return (
    <>
      <div className='d-flex space-around flex-wrap'>
        <div className='add-art-margin-right'>
          <RegularInput
            width='200px'
            label='Nom'
            labelStyle={labelStyle}
            value={''}
            changeValue={setName}
            isEditing={true}
            isAnError={errorFields.includes('name') && !name}
          />
        </div>
        <RegularInput
          width='43px'
          label='Année de création'
          labelStyle={labelStyle}
          value=''
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
              onClick={() => {
                setFormat('diptyque');
                setThirdImage(null);
              }}
            />
            <SelectBox
              label='Triptyque'
              labelStyle={{ marginLeft: '5px' }}
              selected={format === 'triptyque'}
              onClick={() => setFormat('triptyque')}
            />
          </div>
        </div>
        <RegularInput
          width='200px'
          label='Type'
          labelStyle={labelStyle}
          placeholder='Peinture sur toile, collages...'
          value={''}
          changeValue={setType}
          isEditing={true}
          isAnError={errorFields.includes('type') && !type}
        />
      </div>
      <div className='art-width-container d-flex space-between'>
        <div className='add-art-margin-right'>
          <DimensionInput
            label={
              format === 'normal' ? 'Largeur' : 'Largeur de chaque panneau'
            }
            labelStyle={labelStyle}
            value={0}
            changeValue={setWidth}
            isEditing={true}
            unit='cm'
            isAnError={errorFields.includes('width') && !width}
          />
        </div>
        <DimensionInput
          label={format === 'normal' ? 'Hauteur' : 'Hauteur de chaque panneau'}
          labelStyle={labelStyle}
          value={0}
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
              width='60px'
              label='Prix'
              labelStyle={labelStyle}
              value=''
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
            width: isSold ? `${sellPriceWidthRef.current + 2}px` : 0,
            transition: 'all 0.5s',
            transitionProperty: 'width, opacity',
            opacity: isSold ? 1 : 0,
          }}
        >
          <div className='add-art-margin-right-small'>
            <RegularInput
              width='140px'
              label='Vendu à'
              labelStyle={{ ...labelStyle, whiteSpace: 'nowrap' }}
              value={''}
              changeValue={setCustomer}
              isEditing={true}
              isAnError={errorFields.includes('customer') && !customer}
            />
          </div>
          <div className='add-art-margin-right-small'>
            <CurrencyInput
              width='60px'
              label='pour'
              labelStyle={{ ...labelStyle, whiteSpace: 'nowrap' }}
              value=''
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
