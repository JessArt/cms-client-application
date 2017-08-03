import React from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Editor from '../../elements/medium-editor';
import CountrySelect from './countrySelect';
import FixedControls from '../../ui/fixedControls';
import { actions, selectors } from '../../../store';
import styles from './style.sass';

const mapStateToProps = ((state, { article }) => {
  const { isPending } = selectors.api.saveArticle(state, { id: article && article.id });
  return {
    isPending,
  };
});

const mapDispatchToProps = {
  saveArticle: actions.api.saveArticleWithNotification,
};

const ArticleForm = ({ article, saveArticle, isPending }) => {
  const {
    id,
    title,
    subtitle,
    meta_title: metaTitle,
    meta_description: metaDescription,
    keywords,
    text,
    cover,
    country,
    city,
  } = article || {};
  const submitFn = form => saveArticle({ form, id });
  return (
    <Form onSubmit={submitFn}>
      {id &&
        <div className={styles.externalContainer}>
          <a
            className={styles.externalLink}
            href={`https://jess.gallery/travel/${article.id}`}
            target={'_blank'}
          >
            {'This article in the jess.gallery website'}
          </a>
        </div>
      }
      {id &&
        <Input name={'id'} type={'hidden'} defaultValue={id} />
      }
      <Input label={'Title'} name={'title'} type={'text'} defaultValue={title} />
      <Input label={'Subtitle'} name={'subtitle'} type={'text'} defaultValue={subtitle} />
      <Input
        label={'Meta Title'}
        hint={'For SEO. Should be at maximum 55 symbols, will appear as the first line when share; the main search comparison in google. The most important words should come first'}
        name={'meta_title'}
        type={'text'}
        defaultValue={metaTitle}
      />
      <CountrySelect value={country} />
      <Input
        label={'Meta Description'}
        name={'meta_description'}
        type={'text'}
        hint={'For SEO. Should be an engaging sentence, with at maximum 150 symbols (more important words first). Will appear as the second line when share.'}
        defaultValue={metaDescription}
      />
      <Input
        label={'Keywords'}
        name={'keywords'}
        type={'text'}
        hint={'For SEO. Should be words (or 2–3 words, but better smaller), separated by commas, up to 8. For instance: jess zaikova, travel, jess zaikova blog, serbia, novi sad, fortress'}
        defaultValue={keywords}
      />
      <Input
        label={'Cover'}
        name={'cover'}
        type={'text'}
        hint={'please, paste link to the 1200px version from the website'}
        defaultValue={cover}
      />
      <Input
        label={'City'}
        name={'city'}
        type={'text'}
        defaultValue={city}
      />
      <Editor
        name={'text'}
        label={'Text of the article'}
        hint={'This is a medium-style editor. You can add styles to the selected text by double-clicking on it, add links and also convert links to the images to the actual images.'}
        html={text}
      />
      <FixedControls>
        <Button loading={isPending} type={'submit'}>
          {'Save article'}
        </Button>
      </FixedControls>
    </Form>
  );
};

ArticleForm.propTypes = {
  article: RPT.object,
  saveArticle: RPT.func,
  isPending: RPT.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
