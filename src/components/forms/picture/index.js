import React from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Select from '../../elements/select';
import ComplexSelect from '../../elements/complexSelect';
import Option from '../../elements/option';
// import Editor from '../../elements/medium-editor';
import FixedControls from '../../ui/fixedControls';
import { actions, selectors } from '../../../store';
import styles from './style.sass';
import { preparePictureForm } from '../../../utils/forms';

const mapStateToProps = (state, props) => {
  const id = props.picture.id;
  const { isPending, error } = selectors.api.savePicture(state, props.picture);
  const { data: tags } = selectors.api.tags(state);
  const imageTags = id && selectors.api.imageTags(state, { id }).data;
  return {
    isPending,
    error,
    tags,
    imageTags,
  };
};

const mapDispatchToProps = {
  save: actions.api.savePictureWithNotification,
};

const PictureForm = ({ picture, small, save, isPending, tags, imageTags }) => {
  const submitButton = (
    <Button loading={isPending} type={'submit'}>
      {'Save picture'}
    </Button>
  );

  const submitMarkup = small ? null : (
    <FixedControls>
      {submitButton}
    </FixedControls>
  );

  const submitFn = (form) => {
    const updatedForm = preparePictureForm({ form, picture });
    save({ ...picture, form: updatedForm });
  };

  const tagValue = [];
  const tagOptions = (tags || []).map((tag) => {
    if (imageTags && imageTags[tag.id]) {
      tagValue.push(tag.id);
    }

    return {
      value: tag.id,
      label: tag.name.toLowerCase(),
    };
  });

  return (
    <Form name={'pictureForm'} onSubmit={submitFn}>
      {picture.id &&
      <div className={styles.externalContainer}>
        <a
          className={styles.externalLink}
          href={`https://jess.gallery/media/${picture.id}?type=${picture.type}`}
          target={'_blank'}
        >
          {'This picture in the jess.gallery website'}
        </a>
      </div>
      }
      {picture.small_url &&
        <img className={styles.bigImage} src={picture.small_url} />
      }
      {small &&
        <img className={styles.image} src={picture.url} />
      }
      {picture.id &&
        <Input name={'id'} type={'hidden'} defaultValue={picture.id} />
      }
      {picture.fakeId &&
        <Input name={'fakeId'} type={'hidden'} defaultValue={picture.fakeId} />
      }
      <Input label={'Title'} type={'text'} name={'title'} defaultValue={picture.title} />
      <Select name={'type'}>
        <Option id={'photo'} selected={picture.type === 'photo'}>
          Photo
        </Option>
        <Option id={'art'} selected={picture.type === 'art'}>
          Art
        </Option>
        <Option id={'craft'} selected={picture.type === 'craft'}>
          Craft
        </Option>
        <Option id={'postcard'} selected={picture.type === 'postcard'}>
          postcards
        </Option>
        <Option id={'other'} selected={picture.type === 'other'}>
          Other (will not appear anywhere)
        </Option>
      </Select>
      <ComplexSelect multiple name={'tags'} options={tagOptions} value={tagValue} />
      <Input name={'description'} label={'Description'} defaultValue={picture.description} />
      {!small &&
        <Input
          name={'metaTitle'}
          label={'Meta Title'}
          hint={'For SEO. Should be at maximum 55 symbols, will appear as the first line when share; the main search comparison in google. The most important words should come first'}
          type={'text'}
          defaultValue={picture.meta_title}
        />
      }
      {!small &&
        <Input
          name={'metaDescription'}
          label={'Meta Description'}
          hint={'For SEO. Should be an engaging sentence, with at maximum 150 symbols (more important words first). Will appear as the second line when share.'}
          type={'text'}
          defaultValue={picture.meta_description}
        />
      }
      <Input
        name={'keywords'}
        label={'Keywords'}
        hint={'For SEO. Should be words (or 2–3 words, but better smaller), separated by commas, up to 8. For instance: jess zaikova, art, acryl, dog, painted dog, acryl dog paint'}
        type={'text'}
        defaultValue={picture.keywords}
      />
      <Input
        name={'date'}
        label={'Date'}
        placeholder={'YYYY | YYYY-MM | YYYY-MM-DD'}
        type={'text'}
        defaultValue={picture.date}
      />
      <Input
        name={'location'}
        label={'Location'}
        placeholder={'In plain english'}
        type={'location'}
        defaultValue={picture.location}
      />
      {submitMarkup}
    </Form>
  );
};

PictureForm.propTypes = {
  picture: RPT.object,
  small: RPT.bool,
  save: RPT.func,
  isPending: RPT.bool,
  error: RPT.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureForm);

