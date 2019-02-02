import React from "react";
import RPT from "prop-types";
import { connect } from "react-redux";
import Button from "../../elements/button";
import Form from "../../elements/form";
import Input from "../../elements/input";
import ImageSelector from "../../elements/imageSelector";
import Editor from "../../elements/medium-editor";
import CountrySelect from "./countrySelect";
import FixedControls from "../../ui/fixedControls";
import ConfirmationModal from "../../ui/confirmationModal";
import { actions, selectors } from "../../../store";
import styles from "./style.sass";

const mapStateToProps = (state, { article }) => {
  const { isPending } = selectors.api.saveArticle(state, {
    id: article && article.id
  });
  return {
    isPending
  };
};

const mapDispatchToProps = {
  saveArticle: actions.api.saveArticleWithNotification
};

class ArticleForm extends React.Component {
  static propTypes = {
    article: RPT.object,
    saveArticle: RPT.func,
    isPending: RPT.bool,

    refresh: RPT.func
  };

  renderWebsiteLink(id) {
    if (!id) {
      return null;
    }

    return (
      <div className={styles.externalContainer}>
        <a
          className={styles.externalLink}
          href={`https://jess.gallery/travel/${id}`}
          target={"_blank"}
        >
          {"This article in the jess.gallery website"}
        </a>
      </div>
    );
  }

  publishArticle = async ({ close }) => {
    const { article, saveArticle, refresh } = this.props;
    const form = new FormData(this.form);
    form.append("published_on", new Date().toISOString());

    await saveArticle({ form, id: article && article.id });

    close();
    refresh && refresh();
  };

  unpublishArticle = async ({ close }) => {
    const { article, saveArticle, refresh } = this.props;
    const form = new FormData(this.form);
    form.append("published_on", null);

    await saveArticle({ form, id: article && article.id });

    close();
    refresh && refresh();
  };

  renderButtons() {
    const { isPending, article } = this.props;

    const { published_on: publishedOn, id } = article || {};

    const status = publishedOn ? "published" : "draft";

    const publishArticle = id && !publishedOn && (
      <ConfirmationModal
        onConfirm={this.publishArticle}
        text={
          "You are about to publish the article, it will make it appear on jess.gallery"
        }
      >
        {({ open }) => (
          <Button style={"danger"} onClick={open}>
            {"Publish article"}
          </Button>
        )}
      </ConfirmationModal>
    );

    const unpublishArticle = publishedOn && (
      <ConfirmationModal
        onConfirm={this.unpublishArticle}
        text={
          "You are about to unpublish the article, it will make it disappear from jess.gallery"
        }
      >
        {({ open }) => (
          <Button style={"danger"} onClick={open}>
            {"Unpublish article"}
          </Button>
        )}
      </ConfirmationModal>
    );

    return (
      <FixedControls>
        <div className={styles.buttons}>
          {`Status:${status}`}
          <Button
            className={styles.saveButton}
            loading={isPending}
            type={"submit"}
          >
            {"Save article"}
          </Button>
          {publishArticle}
          {unpublishArticle}
        </div>
      </FixedControls>
    );
  }

  render() {
    const { article, saveArticle } = this.props;

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
      published_on,
      city
    } = article || {};
    const submitFn = form => {
      form.append("published_on", published_on);
      saveArticle({ form, id });
    };

    const titleInput = (
      <Input
        label={"Title"}
        name={"title"}
        type={"text"}
        defaultValue={title}
      />
    );
    const subtitleInput = (
      <Input
        label={"Subtitle"}
        name={"subtitle"}
        type={"text"}
        defaultValue={subtitle}
      />
    );
    const metaTitleInput = (
      <Input
        label={"Meta Title"}
        hint={
          "For SEO. Should be at maximum 55 symbols, will appear as the first line when share; the main search comparison in google. The most important words should come first"
        }
        name={"meta_title"}
        type={"text"}
        defaultValue={metaTitle}
      />
    );

    const metaDescriptionInput = (
      <Input
        label={"Meta Description"}
        name={"meta_description"}
        type={"text"}
        hint={
          "For SEO. Should be an engaging sentence, with at maximum 150 symbols (more important words first). Will appear as the second line when share."
        }
        defaultValue={metaDescription}
      />
    );

    const keywordsInput = (
      <Input
        label={"Keywords"}
        name={"keywords"}
        type={"text"}
        hint={
          "For SEO. Should be words (or 2–3 words, but better smaller), separated by commas, up to 8. For instance: jess zaikova, travel, jess zaikova blog, serbia, novi sad, fortress"
        }
        defaultValue={keywords}
      />
    );

    return (
      <Form refFn={node => (this.form = node)} onSubmit={submitFn}>
        {this.renderWebsiteLink(id)}
        {id && <Input name={"id"} type={"hidden"} defaultValue={id} />}
        {titleInput}
        {subtitleInput}
        {metaTitleInput}
        <CountrySelect value={country} />
        {metaDescriptionInput}
        {keywordsInput}
        <ImageSelector label={"Cover"} name={"cover"} defaultValue={cover} />
        <Input label={"City"} name={"city"} type={"text"} defaultValue={city} />
        <Editor
          name={"text"}
          label={"Text of the article"}
          hint={
            "This is a medium-style editor. You can add styles to the selected text by double-clicking on it, add links and also convert links to the images to the actual images."
          }
          html={text}
        />
        {this.renderButtons()}
      </Form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleForm);
