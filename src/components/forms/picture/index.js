import React from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Select from '../../elements/select';
import Option from '../../elements/option';
import Editor from '../../elements/medium-editor';
import FixedControls from '../../ui/fixedControls';
import { actions, selectors } from '../../../store';

const mapStateToProps = (state, props) => {
  const { isPending, error } = selectors.api.savePicture(state, props.picture);
  return {
    isPending, error,
  };
};

const mapDispatchToProps = {
  save: actions.api.savePicture,
};

const PictureForm = ({ picture, small, save, isPending }) => {
  const submitButton = (
    <Button loading={isPending} type={'submit'}>
      {'Save picture'}
    </Button>
  );

  const submitMarkup = small ? submitButton : (
    <FixedControls>
      {submitButton}
    </FixedControls>
  );

  const submitFn = form => save(form, picture);

  return (
    <Form onSubmit={submitFn}>
      {small &&
        <img src={picture.url} />
      }
      <Input label={'Title'} type={'text'} name={'title'} defaultValue={picture.title} />
      <Select name={'type'}>
        <Option id={'photo'}>
          Photo
        </Option>
        <Option id={'art'}>
          Art
        </Option>
        <Option id={'craft'}>
          Craft
        </Option>
        <Option id={'postcard'}>
          postcards
        </Option>
        <Option id={'other'}>
          Other (will not appear anywhere)
        </Option>
      </Select>
      <Editor name={'description'} label={'Description'} html={picture.description} />
      <Input
        label={'Meta description'}
        hint={'For SEO. Should be an engaging sentence, with at maximum 150 symbols (more important words first). Will appear as the second line when share.'}
        type={'text'}
        defaultValue={picture.meta_description}
      />
      <Input
        label={'Keywords'}
        hint={'For SEO. Should be words (or 2–3 words, but better smaller), separated by commas, up to 8. For instance: jess zaikova, art, acryl, dog, painted dog, acryl dog paint'}
        type={'text'}
        defaultValue={picture.keywords}
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

